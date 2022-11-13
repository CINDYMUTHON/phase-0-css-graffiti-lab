var iframeSrcBases = {
  local: 'https://localhost:3005/extension',
  local_production: 'https://www.mergemail.co/extension',
  production: 'https://www.mergemail.co/extension'
}

function getParameterByName(name, url) {
    if (!url) { url = '?' + window.location.hash.slice(1) };
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function splitWithTail(str, delim, count){
  var parts = str.split(delim);
  var tail = parts.slice(count).join(delim);
  var result = parts.slice(0,count);
  result.push(tail);
  return result;
}

function setIframeSrc() {
  var env = getParameterByName('env');
  var iframeUrl = getParameterByName('iframe_url');
  var iframe = $('iframe[name=main_iframe]');
  var iframeSrcBase = iframeSrcBases[env];
  var hash = window.location.hash.slice(1);
  var paramsQueryString = splitWithTail(hash, '&', 1)[1];
  if (!iframeUrl) {
    iframeUrl = iframeSrcBase + '?' + paramsQueryString;
  }
  debug('setIframeSrc: ' + iframeUrl);
  iframe.attr('src', iframeUrl);
};

function debug(message) {
  if (false) {
    console.log(message);
  }
}

$(document).ready(function() {
  debug('ready');
  $(window).on('hashchange', function() {
    debug('hashchange');
    setIframeSrc();
  });

  setIframeSrc();
});
