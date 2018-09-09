'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({text: 'test'});
chrome.browserAction.setBadgeBackgroundColor({color: '#777'});

chrome.browserAction.onClicked.addListener(function(tab) {
  const URL = 'https://github.com/pretorh';
  chrome.tabs.query({'url': URL}, (tabs) => {
    if (tabs.length === 0) {
      chrome.tabs.create({
        'url': URL,
        'active': true
      });
    } else {
      chrome.tabs.update(tabs[0].id, {'active': true});
    }
  });
});
