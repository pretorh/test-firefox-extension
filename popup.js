function addListeners() {
  var backgroundPage = browser.extension.getBackgroundPage();
  backgroundPage.loadTime = backgroundPage.loadTime || Date.now();
  document.getElementById('load').innerHTML = `popup loaded at ${Date.now()}, first @ ${backgroundPage.loadTime}`;

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
    backgroundPage.openTab();
  });

  document.getElementById('ping').addEventListener('click', function() {
    function show(message) {
      document.getElementById('echo').innerHTML = message;
    }

    function sendMessage() {
      const data = {
        r: 'ping',
        d: Date.now(),
      };
      var sending = browser.runtime.sendNativeMessage("test_firefox_native", data);
      sending
        .then((data) => {
          data.round = Date.now() - data.sent;
          show(JSON.stringify(data));
        })
        .catch((err) => show(`failed, ${JSON.stringify(error)}`));
    }

    sendMessage();
  });
}

function reportExecuteScriptError(err) {
  document.getElementById('error').innerHTML = err.message;
  console.error(err);
}

browser.tabs.executeScript({file: 'injected.js'})
  .then(addListeners)
  .catch(reportExecuteScriptError);
