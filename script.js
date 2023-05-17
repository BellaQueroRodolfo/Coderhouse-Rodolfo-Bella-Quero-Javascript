
const optionsQuality = [
  { name: "Excellent", code: "E" },
  { name: "Good", code: "G" },
  { name: "Average", code: "A" },
  { name: "Fair", code: "F" },
  { name: "Poor", code: "P" },
  { name: "Very Poor", code: "VP" }
];
const isPoorQuality = optionsQuality.some(option => option.name === "Poor");

function promptQuality(options, day) {
  let message = `Enter the code for sleep quality on day ${day}:`;
  options.forEach(option => {
    message += ` ${option.name} (${option.code})`;
  });
  return prompt(message);
}

function getSleepHours(day) {
  return parseFloat(prompt(`Enter the number of sleep hours on day ${day}:`));
}
function calculateSleepQualitySummary(options, daysOfMonth) {
  const qualitySummary = [];
  let totalSleep = 0;
  let totalQuality = 0;

  options.forEach(option => {
    qualitySummary.push({ name: option.name, count: 0 });
  });

  for (let day = 1; day <= daysOfMonth; day++) {
    const qualityCode = promptQuality(options, day);
    const sleepHours = getSleepHours(day);
    totalSleep += sleepHours;

    options.forEach((option, index) => {
      if (qualityCode.toUpperCase() === option.code) {
        qualitySummary[index].count++;
        totalQuality += index + 1;
      }
    });
  }
  const averageSleep = totalSleep / daysOfMonth;
  const averageQuality = options[Math.round(totalQuality / daysOfMonth)].name;
  const worstQuality = qualitySummary.slice().sort((a, b) => b.count - a.count).slice(-5);
  const recommendations = [];

  if (worstQuality.some(item => item.name === "Poor")) {
    recommendations.push("Try to establish a regular sleep routine and go to bed and wake up at the same time every day.");
  }
  if (worstQuality.some(item => item.name === "Fair")) {
    recommendations.push("Avoid consuming caffeine and alcohol before bedtime, as they can affect sleep quality.");
  }
  if (worstQuality.some(item => item.name === "Very Poor")) {
    recommendations.push("Try to exercise regularly to help improve sleep quality.");
  }
  const summary = {
    qualitySummary: qualitySummary,
    averageSleep: averageSleep.toFixed(2),
    averageQuality: averageQuality,
    recommendations: recommendations
  };
  return summary;
}
function createSummaryElement(summary) {
  const container = document.getElementById("summary-container");
  const h2 = document.createElement("h2");
  h2.textContent = "Sleep Quality Summary for the Month:";
  container.appendChild(h2);
  
  const p1 = document.createElement("p");
  p1.textContent = Number of days evaluated: ${summary.daysOfMonth};
  container.appendChild(p1);
  
  const p2 = document.createElement("p");
  p2.textContent = Average sleep hours: ${summary.averageSleep};
  container.appendChild(p2);
  
  const p3 = document.createElement("p");
  p3.textContent = Average sleep quality: ${summary.averageQuality};
  container.appendChild(p3);
  
  const ul = document.createElement("ul");
  summary.qualitySummary.forEach(item => {
  const li = document.createElement("li");
  li.textContent = ${item.name}: ${item.count};
  ul.appendChild(li);
  });
  container.appendChild(ul);
  
  const h3 = document.createElement("h3");
  h3.textContent = "Recommendations to Improve Sleep Quality:";
  container.appendChild(h3);
  
  const ul2 = document.createElement("ul");
  summary.recommendations.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  ul2.appendChild(li);
  });
  container.appendChild(ul2);
  }
  
  function fetchData() {
  return fetch("https://api.example.com/data")
  .then(response => {
  if (!response.ok) {
  throw new Error("Unable to fetch data from the API.");
  }
  return response.json();
  })
  .then(data => {
  return data;
  })
  .catch(error => {
  console.log("Error:", error.message);
  return null;
  });
  }
  
  function loadData() {
  fetchData()
  .then(data => {
  if (data) {
  const summary = calculateSleepQualitySummary(optionsQuality, data.daysOfMonth);
  createSummaryElement(summary);
  }
  });
  }
loadData();
