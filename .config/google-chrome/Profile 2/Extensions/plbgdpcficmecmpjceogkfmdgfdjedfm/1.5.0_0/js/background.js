var env = 'production';

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

function mergemailDebug(message) {
  if (false) {
    console.log('MergeMail: ' + message);
  }
}

mergemailDebug('Loading background.js');

chrome.extension.onMessage.addListener(
  function(message, sender) {
    mergemailDebug('onMessage: ' + message.type);

    if (typeof sender.tab === 'undefined') {
      return true;
    }

    if (['startCompose', 'updateCampaign'].includes(message.type) && sender.tab.id) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      });
    }
    return true;
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === 'performAjax') {
      // Only specific URLs are allowed, as described here:
      // https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
      var actionsConfigs = {
        get__campaigns_lookup: function(params) {
          return {
            type: 'GET',
            dataType: 'json',
            url: MergeMail.config.app_url + '/campaigns/lookup?'
          }
        },
        get__templates_index: function(params) {
          return {
            type: 'GET',
            dataType: 'json',
            url: MergeMail.config.app_url + '/templates.json'
          }
        },
        get__templates_show: function(params) {
          return {
            type: 'GET',
            dataType: 'json',
            url: MergeMail.config.app_url + '/templates/' + params.templateId + '.json'
          }
        },
        patch__campaigns_show: function(params) {
          return {
            type: 'PATCH',
            url: MergeMail.config.app_url + '/campaigns/' + params.campaignId
          }
        },
        patch__campaigns_update_gmail_state: function(params) {
          return {
            type: 'PATCH',
            url: MergeMail.config.app_url + '/campaigns/' + params.campaignId + '/update_gmail_state'
          }
        },
        post__campaigns_prepare: function(params) {
          return {
            type: 'POST',
            url: MergeMail.config.app_url + '/campaigns/prepare'
          }
        },
        post__templates_index: function(params) {
          return {
            type: 'POST',
            url: MergeMail.config.app_url + '/templates.json'
          }
        }
      };

      var configFunc = actionsConfigs[request.action];
      if (!configFunc) {
        mergemailDebug('Invalid action: ' + request.action);
        return;
      }
      var config = configFunc(request.params);
      config.contentType = 'application/json; charset=utf-8';
      config.data = request.ajaxData;
      config.success = function(responseData) {
        sendResponse({ success: true, responseData: responseData });
      };
      config.error = function(responseData) {
        sendResponse({ success: false, responseData: responseData });
      };
      $.ajax(config);
      return true;
    }
    return true;
  }
);

chrome.runtime.onInstalled.addListener(function(details){
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'https://www.mergemail.co/onboarding/after_install_extension',
      active: true
    });
  }
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request && request.message && request.message == 'verify_chrome_extension_exists') {
      sendResponse({ verify_chrome_extension_exists: true });
    }
    return true;
  }
);

var version = chrome.runtime.getManifest().version;
$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-MergeMail-Chrome-Extension-Version', version);
  }
});

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://forms.gle/PsNkPhdZPureM6AB6');
}
