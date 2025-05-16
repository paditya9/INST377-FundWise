// Get Ideas on how can do this instead of hard-coding
const sampleCodes = [118550, 112277, 101206, 103504, 100277];

async function loadInvestingQuote() {
  try {
    const response = await fetch('/api/quote');
    console.log("Received Quotes API");

    const data = await response.json();
    const quote = data[0];
    
    document.getElementById('quote-text').textContent = `"${quote.quote}"`;
    document.getElementById('quote-author').textContent = `– ${quote.author}`;
  } catch (error) {
    console.error("Error!!!", error);
    document.getElementById('quote-text').textContent = "Sorry! We are unable to load the quote at this time. Please try again";
  }
}

async function loadNews() {
  try {
    const response = await fetch('/api/news');
    console.log("Received Quotes API");

    const data = await response.json();
    const articles = data.articles;
    const randonNews = articles[Math.floor(Math.random() * articles.length)];
    const container = document.getElementById('news');

    container.innerHTML = `
      <a href="${randonNews.url}" target="_blank">
        <h3>${randonNews.title}</h3>
      </a>
      <p>${randonNews.description}</p>
    `;
  } catch (error) {
    console.error("Error!!!");
    document.getElementById('news').textContent = "Sorry! We are unable to load the news at this time. Please try again";
  }
}


async function loadFundOfTheDay() {
  const randomCode = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
  try {
    const res = await fetch(`https://api.mfapi.in/mf/${randomCode}`);
    const data = await res.json();
    const container = document.getElementById('fund-of-the-day-content');

    container.innerHTML = `
      <h3>${data.meta.scheme_name}</h3>
      <p>Fund House: ${data.meta.fund_house}</p>
      <p>Category: ${data.meta.scheme_category}</p>
      <button onclick="viewFund(${data.meta.scheme_code})">View Fund</button>
    `;
  } catch (error) {
    console.error("Error!!!");
    document.getElementById('fund-of-the-day-content').textContent = "Sorry! We are unable to load the fund at this time. Please try again";
  }
}

function viewFund(code) {
  // need to copy the fund name? Try to autocopy and paste in search 
  window.location.href = `history.html?schemeCode=${code}`;
}

async function loadFeedback() {
  const feedback = document.getElementById('feedback-input').value.trim();

  await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedback })
  });

  document.getElementById('feedback-input').value = '';
  alert('Thanks for your feedback!');
}

if (annyang) {
  const pages = {   
    "home": "home.html",
    "about": "about.html",
    "stocks": "stocks.html",
  };

  let commands = {
    // 'hi echo how are you': () => document.getElementById('stock-bar').click(),
    'hi echo how are you': () => alert('Hi! I am doing well, how about you?!'),
    'echo change the color to *color': (color) => document.body.style.backgroundColor = color,
    'echo navigate to *page': (page) => {
      const pageName = page.toLowerCase().trim();
      const targetPage = pages[pageName];
      window.location.href = targetPage;
    },
  };

  annyang.addCommands(commands);
  
  function toggleListening(turnOn) {
    if (turnOn) {
      if (!annyang.isListening()) {
        annyang.start();
        alert('Audio listening turned on.');
      }
    } else {
      if (annyang.isListening()) {
        annyang.abort();
        alert('Audio listening turned off.');
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadNews();
  loadInvestingQuote();
  loadFundOfTheDay();
});