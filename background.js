chrome.runtime.onInstalled.addListener(() => {
    // Set the default title for the action button
    chrome.action.setTitle({ title: 'Open Hacker News' });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    const hackerNewsURL = 'https://news.ycombinator.com/';
  
    chrome.tabs.create({ url: hackerNewsURL });
  });