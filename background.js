chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
  
    // Get the URL of the active tab
    chrome.tabs.get(tabId, (tab) => {
      if (tab.url && !tab.url.startsWith('chrome://')) {
        // Execute script on valid tab (not chrome:// URL)
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: resumeVideos
        });
      } else {
        console.log('Skipping chrome:// URL:', tab.url);
      }
    });
  });
  
  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId !== chrome.windows.WINDOW_ID_NONE) {
      // Handle window focus change (resume videos if necessary)
      chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.url && !tab.url.startsWith('chrome://')) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: resumeVideos
          });
        }
      });
    }
  });
  
  chrome.windows.onRemoved.addListener((windowId) => {
    // Handle window removal (pause videos when window is closed)
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: pauseVideos
        });
      });
    });
  });
  
  function pauseVideos() {
    let videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
  }
  
  function resumeVideos() {
    let videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (video.paused) {
        video.play();
      }
    });
  }
  