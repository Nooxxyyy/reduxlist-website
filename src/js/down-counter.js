document.addEventListener('DOMContentLoaded', () => {
    function formatNumber(number) {
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
        }
        if (number >= 1_000) {
            return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return number.toString();
    }

    function getDownloadCount(modId) {
        const storedCount = localStorage.getItem(`downloads_${modId}`);
        return storedCount ? parseInt(storedCount) : 0;
    }

    function incrementDownloadCount(modId) {
        let currentCount = getDownloadCount(modId);
        
        currentCount++;
        
        localStorage.setItem(`downloads_${modId}`, currentCount.toString());
        
        return currentCount;
    }

    function updateDownloadCountDisplay(modId) {
        const countElement = document.getElementById(`${modId}-downloads`);
        if (countElement) {
            const downloadCount = getDownloadCount(modId);
            countElement.textContent = `${formatNumber(downloadCount)}`;
        }
    }

    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        const modId = button.dataset.mod;

        updateDownloadCountDisplay(modId);

        button.addEventListener('click', (e) => {
            const newCount = incrementDownloadCount(modId);
            
            updateDownloadCountDisplay(modId);
        });
    });
});