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

MergeMail.Popup = function() {
  var self = this;

  self.init = function() {
    self.isContentScriptPresent = null;

    self.initEvents();
    self.verifyContentScriptPresence();
  }

  self.initEvents = function() {
    $('#load_spreadsheet_button').on('click', self.loadSpreadsheet);
  };

  self.loadSpreadsheet = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      if (url && url.match(/\/\/mail\.google\.com/)) {
        chrome.tabs.sendMessage(tab.id, { type: 'chromeButtonClicked' });
      } else {
        chrome.tabs.create({
          url: 'https://mail.google.com/',
          active: true
        });
      }
      window.close();
    });
  };

  self.showContentScriptBlankErrorIfNecessary = function() {
    if (self.isContentScriptPresent) {
      return;
    }
    $('#content_script_blank_error').show();
  };

  self.verifyContentScriptPresence = function() {
    chrome.runtime.onMessage.addListener(function(request, sender, callbackFunction) {
      if (request.type === 'content_script_verified') {
        self.isContentScriptPresent = true;
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'popup_content_check' });
    });
    setTimeout(self.showContentScriptBlankErrorIfNecessary, 300);
  };

  self.init();
};

$(document).ready(function() {
  new MergeMail.Popup();
});
