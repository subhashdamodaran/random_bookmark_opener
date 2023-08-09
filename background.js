chrome.runtime.onStartup.addListener(() => {
  // Use chrome.permissions API to request bookmarks permission
  chrome.permissions.request({ permissions: ['bookmarks'] }, (granted) => {
    if (granted) {
      chrome.storage.sync.get(['targetFolderId'], (result) => {
        const targetFolderId = result.targetFolderId;
        if (targetFolderId) {
          chrome.bookmarks.getChildren(targetFolderId, (bookmarkNodes) => {
            if (chrome.runtime.lastError) {
              console.error('Error loading bookmarks:', chrome.runtime.lastError.message);
              return;
            }
  
            const bookmarkUrls = bookmarkNodes
              .filter((node) => node.url)
              .map((node) => node.url);
  
            if (bookmarkUrls.length > 0) {
              const randomIndex = Math.floor(Math.random() * bookmarkUrls.length);
              const randomBookmark = bookmarkUrls[randomIndex];
              chrome.tabs.create({ url: randomBookmark });
            } else {
              console.warn('No bookmarks found in the specified folder.');
            }
          });
        } else {
          console.warn('No target folder ID set in options.');
        }
      });
    } else {
      console.warn('Permission denied for accessing bookmarks.');
    }
  });
});
