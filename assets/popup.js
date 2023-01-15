document
  .getElementById("close-duplicates-button")
  .addEventListener("click", closeDuplicateTabs);

function closeDuplicateTabs() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    let uniqueTabs = {};
    for (let tab of tabs) {
      if (uniqueTabs[tab.url]) {
        if (tab.active) {
          chrome.tabs.remove(uniqueTabs[tab.url]);
          uniqueTabs[tab.url] = tab.id;
        } else {
          chrome.tabs.remove(tab.id);
        }
      } else {
        uniqueTabs[tab.url] = tab.id;
      }
    }
  });
}
