
function validateForm() {
    var response = grecaptcha.getResponse();
    if (response.length === 0) {
        alert("Please verify you are not a robot.");
        return false;
    }
    return true;
}

// Function to hide form and show thank you message
function showThankYouMessage() {
    document.getElementById('waitlist-form').style.display = 'none';
    document.querySelector('.thank-you-message').style.display = 'block';
}

// Google Sheets URL for counting rows (Waitlist count)
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjr2rg-ICA6BgGbgIAFTEXTwHSnYgfKJKBPmkhfJaQFVzsu1iz42Gipt_n0xBLvD2DM-xEyfhuabv_/pub?gid=525880820&single=true&output=csv';

// Fetch the number of submissions (rows)
function updateWaitlistCount() {
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").length - 1; // Subtract header row
            document.getElementById('count').innerText = rows;
        })
        .catch(error => {
            console.error('Error fetching waitlist count:', error);
            document.getElementById('count').innerText = 'Error';
        });
}

// Update the waitlist count on page load
window.onload = updateWaitlistCount;

// Handle form submission
document.getElementById('waitlist-form').addEventListener('submit', function (event) {
    setTimeout(function () {
        // Show thank you message and reload the count after submission
        showThankYouMessage();
        updateWaitlistCount();
    }, 2000); // Wait 2 seconds for the form to submit
});
