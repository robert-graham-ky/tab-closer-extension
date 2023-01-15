document.getElementById("close-duplicates-button").addEventListener("click", closeDuplicateTabs);

function closeDuplicateTabs() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        let uniqueTabs = {};
        for (let tab of tabs) {
            if(tab.active) continue;
            if (uniqueTabs[tab.url]) {
                chrome.tabs.remove(tab.id);
            } else {
                uniqueTabs[tab.url] = tab.id;
            }
        }
    });
}