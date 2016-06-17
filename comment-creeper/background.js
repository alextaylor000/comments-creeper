chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS({
    file: 'creeper.css'
  });
  chrome.tabs.executeScript({
    file: 'vendor/jquery-3.0.0.min.js'
  })
  chrome.tabs.executeScript({
    file: 'creeper.js',
    runAt: 'document_idle'
  });

  // we don't want it to run twice and create duplicate comments
  chrome.browserAction.disable(tab.id)
});
