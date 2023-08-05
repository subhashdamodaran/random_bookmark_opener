function saveOptions() {
    const targetFolderId = document.getElementById('targetFolderIdInput').value;
    chrome.storage.sync.set({ targetFolderId: targetFolderId }, () => {
      console.log('Options saved:', targetFolderId);
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
  