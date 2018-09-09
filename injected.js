(function() {
  if (window.alreadyInjected) {
    console.log('script loading into the page again');
    return;
  }
  window.alreadyInjected = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'add') {
      document.body.style.border = '7px solid red';
    } else if (message.command === 'remove') {
      document.body.style.border = '';
    }
  });
})();
