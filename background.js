'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({text: 'test'});
chrome.browserAction.setBadgeBackgroundColor({color: '#777'});

chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.create({
    'url': 'https://github.com/pretorh',
    'active': true
  });
});
