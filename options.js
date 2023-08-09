function saveOptions() {
  // Use chrome.permissions API to request bookmarks permission before storing the folder ID
  chrome.permissions.request({ permissions: ['bookmarks'] }, (granted) => {
    if (granted) {
      const targetFolderId = document.getElementById('targetFolderIdInput').value;
      chrome.storage.sync.set({ targetFolderId: targetFolderId }, () => {
        console.log('Options saved:', targetFolderId);
      });
    } else {
      console.warn('Permission denied for accessing bookmarks.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['targetFolderId'], (result) => {
    if (result.targetFolderId) {
      document.getElementById('targetFolderIdInput').value = result.targetFolderId;
    }
  });

  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions);
});
