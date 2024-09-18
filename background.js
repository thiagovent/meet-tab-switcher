chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const meetTabs = tabs.filter(tab => tab.url.includes("meet.google.com"));

    if (meetTabs.length === 1) {
      chrome.tabs.update(meetTabs[0].id, { active: true });
      chrome.windows.update(meetTabs[0].windowId, { focused: true });
    } else {
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 300,
        height: 200
      });
    }
  });
});
