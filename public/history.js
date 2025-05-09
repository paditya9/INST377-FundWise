// Bar
// search 
// funds searched 
// charts 

let allFunds = [];
let selectedFunds = [];
let chartedFunds = [];
let chartInstance = null;

function loadAPI() {
  return fetch("https://api.mfapi.in/mf")
  .then((res) => res.json());
}

async function loadSearchBar() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultsList = document.getElementById("search-results");
  resultsList.innerHTML = "";

  if (!query) {
    return alert("Fund name missing. Please enter fund name to proceed!");
  }

  await fetch('/api/recent-searches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const matches = allFunds
    .filter(x => x.schemeName.toLowerCase().includes(query))
    .slice(0, 15);

  if (matches.length === 0) {
    resultsList.innerHTML = "<p>Sorry! The fund your searching for does not exist</p>";
    return;
  }

  matches.forEach(fund => {
    const li = document.createElement("li");
    li.textContent = fund.schemeName;
    li.addEventListener("click", () => selectFund(fund.schemeCode, fund.schemeName));
    resultsList.appendChild(li);
  });
  loadRecentSearches(); 
}

async function selectFund(schemeCode, schemeName) {
  if (selectedFunds.length >= 4) {
    alert("Oops! You can select a maximum of 4 funds to compare at the same time.");
    return;
  }

  if (selectedFunds.find(f => f.schemeCode === schemeCode)) {
    alert("Fund already added.");
    return;
  }

  console.log(`Trying to fetch ${schemeName}`);
  const res = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
  const data = await res.json();

  selectedFunds.push({ schemeCode, schemeName, data });
  loadSelectFunds();
}

function loadSelectFunds() {
  const container = document.getElementById("selected-funds");
  container.innerHTML = "";

  selectedFunds.forEach((fund, index) => {
    const yields = fund.data.yields || {};
    const div = document.createElement("div");
    div.className = "fund-box";
    div.innerHTML = `
      <h3>${fund.schemeName}</h3>
      <p><strong>Fund House:</strong> ${fund.data.meta.fund_house}</p>
      <p><strong>Category:</strong> ${fund.data.meta.scheme_category}</p>
      <p><strong>Type:</strong> ${fund.data.meta.scheme_type}</p>
      <button onclick="loadChart(${index})">Toggle Chart</button>
      <button onclick="removeFund(${index})">Remove</button>
    `;
    container.appendChild(div);
  });
}

async function loadRecentSearches() {
  const res = await fetch('/api/recent-searches');
  const data = await res.json();
  const recentList = document.getElementById("recent-search-list");
  recentList.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.query;
    li.addEventListener("click", () => {
      document.getElementById("search-input").value = item.query;
      loadSearchBar();
    });
    recentList.appendChild(li);
  });
}

function loadChart(index) {
  const fund = selectedFunds[index];
  if (chartedFunds.includes(fund)) {
    chartedFunds = chartedFunds.filter(f => f !== fund);
  } else {
    if (chartedFunds.length >= 2) {
      return alert("Oops! You can select a maximum of 2 fund to visualize at the same time.");
    }
    chartedFunds.push(fund);
  }
  updateChart();
}

function removeFund(index) {
  const fundToRemove = selectedFunds[index];
  const newSelectedFunds = [];

  for (let i = 0; i < selectedFunds.length; i++) {
    if (i !== index) {
      newSelectedFunds.push(selectedFunds[i]);
    }
  }
  selectedFunds = newSelectedFunds;

  const newChartedFunds = [];
  for (let i = 0; i < chartedFunds.length; i++) {
    if (chartedFunds[i].schemeCode !== fundToRemove.schemeCode) {
      newChartedFunds.push(chartedFunds[i]);
    }
  }
  chartedFunds = newChartedFunds;

  loadSelectFunds();
  updateChart();
}

function updateChart() {
  const datasets = [];
  let labels = [];

  chartedFunds.forEach(fund => {
    const navData = fund.data.data.slice(0, 30).reverse();
    const navs = navData.map(entry => parseFloat(entry.nav));
    const dates = navData.map(entry => entry.date);

    datasets.push({
      label: fund.schemeName,
      data: navs,
      borderWidth: 2,
      fill: false
    });

    if (labels.length === 0) labels = dates;
  });

  const ctx = document.getElementById("nav-chart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' }},
        y: { title: { display: true, text: 'NAV' }}
      }
    }
  });
}

if (annyang) {
  let commands = {
    'hi echo how are you': () => alert('Hi! I am doing well, how about you?!'),
    'echo change the color to *color': (color) => document.body.style.backgroundColor = color,
    'echo navigate to *page': (page) => window.location.href = page + '.html',
    'echo search *fundname': (fundname) => {
      const input = document.getElementById("search-input");
      input.value = fundname;
      loadSearchBar(); 
    }
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

document.addEventListener("DOMContentLoaded", async () => {
  allFunds = await loadAPI();
  document.getElementById("search-button").addEventListener("click", loadSearchBar);
  loadRecentSearches();
});