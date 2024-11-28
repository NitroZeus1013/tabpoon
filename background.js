chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      let currentTab = tabs[0];
      let currentIndex = currentTab.index;
      
      if (command === 'switch-tab-left') {
        let prevTabIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
          chrome.tabs.update(tabs[prevTabIndex].id, { active: true });
        });
      }
      
      if (command === 'switch-tab-right') {
        let nextTabIndex = currentIndex === tabs.length - 1 ? currentIndex : currentIndex + 1;
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
          chrome.tabs.update(tabs[nextTabIndex].id, { active: true });
        });
      }

       // Jump to the last tab
     if (command === 'jump-to-last-tab') {
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
          let n = tabs.length;
          tabs.sort((a,b)=>a.lastAccessed-b.lastAccessed);
          if(n > 1){
              chrome.tabs.update(tabs[n-2].id, { active: true });
          }
        });
      }
    });
  });
  