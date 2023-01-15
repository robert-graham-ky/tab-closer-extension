document
  .getElementById("close-duplicates-button")
  .addEventListener("click", closeDuplicateTabs);

function closeDuplicateTabs() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    let uniqueTabs = {};
    for (let tab of tabs) {
        let tabURL = new URL(tab.url);
        let domain = tabURL.hostname;
      if (uniqueTabs[domain]) {
        if (tab.active) {
          chrome.tabs.remove(uniqueTabs[domain]);
          uniqueTabs[domain] = tab.id;
        } else {
          chrome.tabs.remove(tab.id);
        }
      } else {
        uniqueTabs[domain] = tab.id;
      }
    }
  });
}
