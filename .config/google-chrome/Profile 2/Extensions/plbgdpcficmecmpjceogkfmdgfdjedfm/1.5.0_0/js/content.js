var env = 'production';

function mergemailDebug(message, data) {
  if (false) {
    console.log('MergeMail: ' + message);
    if (data) {
      console.dir(data);
    }
  }
};

mergemailDebug('Loading...');

MergeMail = {
  config: {
    env: env,
    envs_app_urls: {
      local: 'https://localhost:3005',
      local_production: 'https://www.mergemail.co',
      production: 'https://www.mergemail.co'
    }
  }
};
MergeMail.config.app_url = MergeMail.config.envs_app_urls[env];

// We'll make AJAX requests in the background script, as described here:
// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
MergeMail.Ajax = {
  performAjaxSimple: function(action, ajaxData, onSuccess) {
    MergeMail.Ajax.performAjax({
      action: action,
      ajaxData: ajaxData,
      success: onSuccess
    });
  },
  performAjax: function(options){
    var message = {
      message: 'performAjax',
      action: options.action,
      params: options.params,
      ajaxData: options.ajaxData
    };
    chrome.runtime.sendMessage(message, function(response) {
      if (response.success) {
        if (options.success) {
          options.success(response.responseData);
        }
      } else {
        if (options.error) {
          options.error(response.responseData);
        }
      }
    });
  }
};

MergeMail.ComposeComponent = function(extension, composeView) {
  var self = this;

  self.init = function(extension, composeView) {
    self.extension = extension;
    self.composeView = composeView;
    self.composeViewEl = $(self.composeView.getElement());
    self.campaign = null;
    self.draftId = null;
    self.isValidating = false;

    self.initDraftIdUpdater();
    self.lookupCampaign();
    // self.loadTemplates();
    self.initEvents();
    self.initSendEvents();
    if (self.extension.loadSpreadsheetOnNextComposeComponent === true) {
      self.extension.loadSpreadsheetOnNextComposeComponent = false;
      // self.isSending = false;
      self.loadSpreadsheet();
    }
  };

  self.hasCampaign = function() {
    return self.campaign && self.campaign.id;
  }

  self.initEvents = function() {
    self.composeView.on('recipientsChanged', function(event) {
      if (!self.hasCampaign()) {
        return true;
      }
      var toRecipients = self.composeView.getToRecipients();
      if (!toRecipients) {
        return;
      }
      // Check again after 2 seconds, so that if it's only blank briefly, we don't alert the user_email unnecessarily
      setTimeout(function(){
        var toRecipients = self.composeView.getToRecipients();
        if (!toRecipients) {
          return;
        }
        if (toRecipients.length === 0) {
          alert('MergeMail cannot send your email if you remove the MergeMail recipient in the "To" field');
        }
      }, 2000);
    });
  };

  self.getPrepareData = function () {
    return {
      id: self.campaign ? self.campaign.id : null,
      thread_id: self.composeView.getThreadID(),
      draft_id: self.composeView.getCurrentDraftID(),
      html_part: self.composeView.getHTMLContent(),
      text_part: self.composeView.getTextContent(),
      subject: self.composeView.getSubject(),
      to_recipients: self.composeView.getToRecipients(),
      cc_recipients: self.composeView.getCcRecipients(),
      bcc_recipients: self.composeView.getBccRecipients(),
      from_contact: self.composeView.getFromContact(),
    };
  };

  self.showErrorModal = function(message) {
    message = message.replace(/(?:\r\n|\r|\n)/g, '<br />');
    var modalContent = '' +
      '<p style="margin-top: -10px;">' + message + '</p>' +
      '<div></div>' +
      '';
    self.extension.sdk.Widgets.showModalView({
      title: 'MergeMail: Error',
      el: modalContent
    });
  };

  self.initSendEvents = function() {
    self.composeView.on('presending', function(event) {
      if (!self.campaign || self.isValidating) {
        return true;
      }

      self.isValidating = true;
      event.cancel();

      var messageKey = 'preparingCampaign';
      self.extension.sdk.ButterBar.showMessage({
        messageKey: messageKey,
        text: 'Preparing emails with MergeMail...',
        html: 'Preparing emails with MergeMail...',
        priority: 8
      });

      var data = self.getPrepareData();
      data.state = 'presending';

      MergeMail.Ajax.performAjax({
        action: 'post__campaigns_prepare',
        ajaxData: JSON.stringify(data),
        success: function(data) {
            self.extension.sdk.ButterBar.hideMessage(messageKey);

            if (data.success === false) {
              self.isValidating = false;
              self.showErrorModal(data.message);
              return;
            }

            self.campaign = data.campaign;
            self.campaignMessageTitle = data.message_title;
            self.campaignMessageContent = data.message_content;

            self.composeView.send();

            var retries = 20;
            var hideInterval = setInterval(function() {
              self.extension.sdk.ButterBar.hideGmailMessage();
              retries--;
              if (retries <= 0) {
                clearInterval(hideInterval);
              }
            }, 50);

            var campaignUrl = MergeMail.config.app_url + '/campaigns/' + data.campaign.id;

            // This needs to follow the .send() call
            setTimeout(function() {
              self.isValidating = false;
            }, 1000);
        },
        error: function(error) {
          self.isValidating = false;

          self.extension.sdk.ButterBar.showMessage({
            text: 'There was an error with this request',
            html: 'There was an error with this request',
            priority: 10
          });
        }
      });
    });

    self.composeView.on('sent', function(event) {
      if (!self.hasCampaign()) {
        return true;
      }
      var campaignUrl = MergeMail.config.app_url + '/campaigns/' + self.campaign.id;
      var defaultModalTitle = 'Your emails are being sent!';
      var defaultModalContent = '' +
        '<p style="margin-top: -10px;">MergeMail is now sending your email campaign.</p>' +
        '<p style="margin-top: 30px;"><a href="' + campaignUrl + '" target="_blank" class="mm-button">View your campaign</a></p>' +
        '<div></div>' +
        '';
      self.extension.sdk.Widgets.showModalView({
        title: self.campaignMessageTitle || defaultModalTitle,
        el: self.campaignMessageContent || defaultModalContent
      });
      MergeMail.Ajax.performAjax({
        action: 'patch__campaigns_update_gmail_state',
        ajaxData: JSON.stringify({ gmail_state: 'sent' }),
        params: { campaignId: self.campaign.id }
      });
    });
  };

  self.initDraftIdUpdater = function() {
    self.composeView.getDraftID().then(function(draftId) {
      if (!draftId) {
        return;
      }
      self.draftId = draftId;
      if (!self.campaign) {
        self.lookupCampaign(true);
        return
      }
      if (self.campaign && self.campaign.id) {
        self.campaign.draft_id = self.draftId;
        var data = {
          campaign: {
            draft_id: self.campaign.draft_id
          }
        };
        self.updateCampaign({ draft_id: self.campaign.draft_id });
      }
    });
  };

  self.updateCampaign = function(attributes) {
    if (!self.campaign || !self.campaign.id) {
      return;
    }
    MergeMail.Ajax.performAjax({
      action: 'patch__campaigns_show',
      ajaxData: JSON.stringify({ campaign: attributes }),
      params: { campaignId: self.campaign.id }
    });
  };

  self.previewCampaign = function() {
    var data = self.getPrepareData();
    data.state = 'preview';
    var messageKey = 'previewCampaignLoading';

    self.extension.sdk.ButterBar.showMessage({
      messageKey: messageKey,
      text: 'Preparing your MergeMail preview...',
      html: 'Preparing your MergeMail preview...',
      priority: 8
    });

    MergeMail.Ajax.performAjax({
      action: 'post__campaigns_prepare',
      ajaxData: JSON.stringify(data),
      success: function(data) {
        self.extension.sdk.ButterBar.hideMessage(messageKey);
        if (data.success === false) {
          self.showErrorModal(data.message);
          return;
        }

        var properties = 'toolbar=no,location=no,menubar=no,width=800,height=800';
        window.open(MergeMail.config.app_url + '/campaigns/'  + self.campaign.id + '/preview', 'mergemail_preview', properties);
      },
      error: function(error) {
        self.extension.sdk.ButterBar.showMessage({
          text: 'There was an error with this request',
          html: 'There was an error with this request',
          priority: 10
        });
      }
    });
  };

  self.sendTestEmail = function() {
    var data = self.getPrepareData();
    data.state = 'send_test_email';
    var messageKey = 'sendTestEmailLoading';

    self.extension.sdk.ButterBar.showMessage({
      messageKey: messageKey,
      text: 'Sending a test email to you...',
      html: 'Sending a test email to you...',
      priority: 8
    });

    MergeMail.Ajax.performAjax({
      action: 'post__campaigns_prepare',
      ajaxData: JSON.stringify(data),
      success: function(data) {
        self.extension.sdk.ButterBar.hideMessage(messageKey);
        if (data.success === false) {
          self.showErrorModal(data.message);
          return;
        }
        var messageTitle = data.message_title;
        var messageContent = data.message_content;
        var modalContent = '' +
          '<p style="margin-top: -10px;">' + messageContent + '</p>' +
          '<div></div>' +
          '';
        self.extension.sdk.Widgets.showModalView({
          title: messageTitle,
          el: modalContent
        });
      },
      error: function(error) {
        self.extension.sdk.ButterBar.showMessage({
          text: 'There was an error with this request',
          html: 'There was an error with this request',
          priority: 10
        });
      }
    });
  };

  self.lookupCampaign = function(loadDrawer) {
    loadDrawer = loadDrawer || false;

    self.composeView.getCurrentDraftID().then(function(draftId) {
      var data = {
        thread_id: self.composeView.getThreadID(),
        draft_id: draftId
      };
      if (!data.thread_id && !data.draft_id) {
        return;
      }
      MergeMail.Ajax.performAjaxSimple('get__campaigns_lookup', data, function(data) {
        if (data.campaign) {
          self.campaign = data.campaign;
          if (loadDrawer && !self.drawerView) {
            var iframeUrl = MergeMail.config.app_url + '/campaigns/' + self.campaign.id + '/finish';
            var params = {
              iframe_url: iframeUrl
            }
            self.drawerView = self.extension.sdk.Widgets.showDrawerView({
              el: self.extension.generateIframeEl(params),
              title: 'MergeMail',
              composeView: self.composeView,
              closeWithCompose: true
            });
          }
        }
      });
    })
  };

  self.loadTemplate = function(template) {
    var templateId = template.id;
    MergeMail.Ajax.performAjax({
      action: 'get__templates_show',
      params: { templateId: templateId },
      success: function(data) {
        var template = data.template;
        self.composeView.setCcRecipients(template.cc_recipients);
        self.composeView.setBccRecipients(template.bcc_recipients);
        if (template.from_email) {
          self.composeView.setFromEmail(template.from_email);
        }
        self.composeView.setSubject(template.subject);
        self.composeView.setBodyHTML(template.body_html);
        self.updateCampaign({ template_id: templateId });
      }
    });
  };

  self.validateSubjectAndBody = function(suffix='before sending') {
    var subject = self.composeView.getSubject();
    var bodyHtml = self.composeView.getHTMLContent();
    var bodyText = self.composeView.getTextContent();
    if (!subject) {
      alert('Please set an email subject ' + suffix);
      return false;
    }
    if (!bodyHtml || !bodyText) {
      alert('Please write your email ' + suffix);
      return false;
    }
    return true;
  }

  self.sendCampaign = function() {
    if (!self.validateSubjectAndBody()) {
      return;
    }
    self.composeView.send();
  };

  self.saveTemplate = function(template) {
    var name = template.name;
    var fromContact = self.composeView.getFromContact();
    var data = {
      template: {
        name: name,
        cc_recipients: self.composeView.getCcRecipients().map(function(recipient) { return recipient['emailAddress']; }),
        bcc_recipients: self.composeView.getBccRecipients().map(function(recipient) { return recipient['emailAddress']; }),
        from_email: fromContact ? fromContact.email : null,
        subject: self.composeView.getSubject(),
        body_html: self.composeView.getHTMLContent()
        // These are intentionally not included, as they're part of the campaign form:
        // include_utm_codes: foo,
        // track_clicks: foo,
        // track_opens: foo
      }
    };
    MergeMail.Ajax.performAjax({
      action: 'post__templates_index',
      ajaxData: JSON.stringify(data),
      success: function(data) {
        self.updateCampaign({ template_id: data.template.id });
      },
      error: function(error) {
        // TODO: Send message back to Rails app; it's unclear how to do this.
        // https://developer.chrome.com/extensions/messaging#external-webpage
      }
    });
  };

  self.loadSpreadsheet = function() {
    $('.inboxsdk__composeButton_active').click();
    self.composeView.getCurrentDraftID().then(function(draftId) {
      var threadId = self.composeView.getThreadID();
      var params = {
        thread_id: threadId,
        draft_id: draftId
      };
      mergemailDebug('loadSpreadsheet params:', params);
      if (draftId) {
        if (!window.MergeMail.draftIdsComposeComponents) { window.MergeMail.draftIdsComposeComponents = {}; }
        window.MergeMail.draftIdsComposeComponents[draftId] = self;
      }
      if (threadId) {
        if (!window.MergeMail.threadIdsComposeComponents) { window.MergeMail.threadIdsComposeComponents = {}; }
        window.MergeMail.threadIdsComposeComponents[threadId] = self;
      }
      // This is used to send the Chrome extension version
      MergeMail.Ajax.performAjaxSimple('get__templates_index');
      self.drawerView = self.extension.sdk.Widgets.showDrawerView({
        el: self.extension.generateIframeEl(params),
        title: 'MergeMail',
        composeView: self.composeView,
        closeWithCompose: true
      });
    });
    return false;
  };

  self.updateWithCampaign = function(campaign) {
    self.campaign = campaign;
    self.composeView.setToRecipients(campaign.to_recipients);
    if (self.drawerView) {
      self.drawerView.close();
    }
  };

  self.quoteAttr = function(s, preserveCR) {
    preserveCR = preserveCR ? '&#13;' : '\n';
    return ('' + s) /* Forces the conversion to string. */
        .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
        .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        /*
        You may add other replacements here for HTML only
        (but it's not necessary).
        Or for XML, only if the named entities are defined in its DTD.
        */
        .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
        .replace(/[\r\n]/g, preserveCR);
        ;
  };

  self.init(extension, composeView);

  return self;
};

mergemailDebug('define: MergeMail.Extension');
MergeMail.Extension = (function() {
  var self = this;

  self.init = function() {
    mergemailDebug('init');

    if (chrome.extension) {
      mergemailDebug('has chrome.extension');
      chrome.extension.sendMessage(
        { type: 'initialize' }
      );
    }

    InboxSDK.load(2, 'sdk_MergeMail_50d6417fd9').then(function(sdk){
      self.sdk = sdk;
      self.loadSpreadsheetOnNextComposeComponent = false;
      self.initSdk();
      self.initMessaging();
      self.startCampaignIfNecessary();
    });

    chrome.runtime.onMessage.addListener(function(request, sender, callbackFunction) {
      mergemailDebug('onMessage');
      if (request.type === 'chromeButtonClicked') {
        mergemailDebug('onMessage: chromeButtonClicked');
        self.startCampaign();
      } else if (request.type === 'popup_content_check') {
        chrome.runtime.sendMessage({
          type: 'content_script_verified'
        });
      }
    });
  };

  self.startCampaignIfNecessary = function() {
    var href = window.location.href;
    if (href.match(/mmsc\=1/)) {
      var newHref = location.href.replace(/mmsc=1&?/, '');
      history.pushState(null, '', newHref);
      self.startCampaign();
    }
    if (href.match(/mmsm\=1/)) {
      var newHref = location.href.replace(/mmsm=1&?/, '');
      history.pushState(null, '', newHref);
      var imageUrl = chrome.extension.getURL('img/gmail_button_screenshot_with_arrow.png');
      var modalContent = '' +
        '<p style="margin-top: -10px;">To send a mass email, click on the button at the top of the page:</p>' +
        '<img src="' + imageUrl + '" style="width: 500px; padding: 10px 15px;" />' +
        '<div></div>' +
        '';
      self.sdk.Widgets.showModalView({
        title: 'MergeMail',
        el: modalContent
      });
    }
  };

  self.startCampaign = function(e) {
    self.loadSpreadsheetOnNextComposeComponent = true;
    self.sdk.Compose.openNewComposeView();
  };

  self.initSdk = function() {
    self.sdk.Toolbars.addToolbarButtonForApp({
      iconUrl: MergeMail.config.app_url + '/icon_purple_128.png',
      onClick: self.startCampaign
    });
    self.sdk.Compose.registerComposeViewHandler(function(composeView) {
      self.lastComposeComponent = new MergeMail.ComposeComponent(self, composeView);
    });
    self.sdk.Conversations.registerThreadViewHandler(function(threadView) {
      threadView.getThreadIDAsync().then(function(threadId) {
        var data = {
          thread_id: threadId
        };
        MergeMail.Ajax.performAjaxSimple('get__campaigns_lookup', data, function(data) {
          if (data.campaign) {
            var messageView = threadView.getMessageViews()[0];
            var campaignUrl = MergeMail.config.app_url + '/campaigns/' + data.campaign.id;
            messageView.addToolbarButton({
              title: 'Open campaign',
              section: 'MORE',
              iconUrl: MergeMail.config.app_url + '/icon_purple_128.png',
              onClick: function() { window.open(campaignUrl); }
            });
          }
        });
      });
    });
  };

  self.initMessaging = function() {
    if (window.addEventListener) {
      window.addEventListener("message", self.onMessage, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmessage", self.onMessage, false);
    }
  };

  self.onMessage = function(event) {
    if (event.origin !== MergeMail.config.app_url) {
      return;
    }

    var data = event.data;
    mergemailDebug('onMessage:', data);

    switch (data.type) {
      case 'loadTemplate':
        self.lastComposeComponent.loadTemplate(data.template);
        break;
      case 'previewCampaign':
        self.lastComposeComponent.previewCampaign();
        break;
      case 'sendTestEmail':
        self.lastComposeComponent.sendTestEmail();
        break;
      case 'sendCampaign':
        self.lastComposeComponent.sendCampaign();
        break;
      case 'onUpdateCampaign':
        self.onUpdateCampaign(data);
        break;
      case 'saveTemplate':
        self.lastComposeComponent.saveTemplate(data.template);
        break;
      case 'startCompose':
        self.startCompose(data);
        break;
    }
  };

  self.startCompose = function(data) {
    var composeComponent;
    if (data.campaign.draft_id) {
      composeComponent = window.MergeMail.draftIdsComposeComponents[data.campaign.draft_id];
    } else {
      composeComponent = self.lastComposeComponent;
    }
    composeComponent.updateWithCampaign(data.campaign);
  };

  self.onUpdateCampaign = function(data) {
    self.lastComposeComponent.campaign = data.campaign;
    self.lastComposeComponent.composeView.setToRecipients([data.campaign.delivery_email_address]);
    self.lastComposeComponent.composeView.setCcRecipients([]);
    self.lastComposeComponent.composeView.setBccRecipients([]);
    // TODO: Determine how to blur the "To" field here
  };

  self.generateIframeEl = function(params={}) {
    params.user_email = self.sdk.User.getEmailAddress();
    var iframeSrc = chrome.extension.getURL('frame.html') + '#env=' + MergeMail.config.env + '&' + $.param(params);
    var iframeStyle = 'width: 100%; height: 100%; border: 0;'
    var iframeHtml = '<iframe src="' + iframeSrc + '" style="' + iframeStyle + '"></iframe>';
    var el = $(iframeHtml)[0];
    return el;
  };

  self.init();

  return self;
});

new MergeMail.Extension();
