'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({text: 'test'});
chrome.browserAction.setBadgeBackgroundColor({color: '#777'});

browser.commands.getAll().then(console.log);

browser.commands.onCommand.addListener((command) => {
  if (command != 'show tab') {
    throw new Error('unknown command: ' + command);
  }
});

function openTab() {
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
}
