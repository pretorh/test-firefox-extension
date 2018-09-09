function addListeners() {
  function sendCommand(command) {
    return function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command,
      });
    };;
  }

  document.getElementById('add').addEventListener('click', function() {
    browser.tabs.query({active: true, currentWindow: true})
      .then(sendCommand('add'))
      .catch(reportExecuteScriptError);
  });
  document.getElementById('remove').addEventListener('click', function() {
    browser.tabs.query({active: true, currentWindow: true})
      .then(sendCommand('remove'))
      .catch(reportExecuteScriptError);
  });
  document.getElementById('open').addEventListener('click', function() {
    var backgroundPage = browser.extension.getBackgroundPage();
    backgroundPage.openTab();
  });
}

function reportExecuteScriptError(err) {
  document.getElementById('error').innerHTML = err.message;
  console.error(err);
}

browser.tabs.executeScript({file: 'injected.js'})
  .then(addListeners)
  .catch(reportExecuteScriptError);
