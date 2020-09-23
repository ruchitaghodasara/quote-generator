const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank add 'Unkwown'
        if (data.authorText === '') {
            authorText.innerText('Unknown');
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce fontsize for long quoteW
        if (data.quoteText.length > 10) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        // Loader
        complete();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

// Eventlistener to tweet quote

newQuotebtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();