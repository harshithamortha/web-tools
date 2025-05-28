// ---------- Utility Functions ----------
function showWarning(id, message) {
const warning = document.getElementById(id);
if (warning) {
warning.textContent = message;
warning.classList.remove("hidden");
}
}

function hideWarning(id) {
const warning = document.getElementById(id);
if (warning) warning.classList.add("hidden");
}

function resetFields(inputIds, resultId, warningId) {
inputIds.forEach(id => {
const input = document.getElementById(id);
if (input) input.value = '';
});
const result = document.getElementById(resultId);
if (result) result.textContent = '';
hideWarning(warningId);
}

// ---------- Age Calculator ----------
function calculateAge() {
const dob = document.getElementById('dob').value;
const result = document.getElementById('age-result');
const warn = 'age-warning';

if (!dob) return showWarning(warn, 'Please enter your date of birth.'), result.textContent = '';

const birth = new Date(dob);
const today = new Date();
if (birth > today) return showWarning(warn, 'DOB cannot be in the future.'), result.textContent = '';

hideWarning(warn);

let y = today.getFullYear() - birth.getFullYear();
let m = today.getMonth() - birth.getMonth();
let d = today.getDate() - birth.getDate();

if (d < 0) {
m--;
d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
}
if (m < 0) {
y--;
m += 12;
}

result.textContent = `You are ${y} years, ${m} months, ${d} days old.`;
}

function resetAge() {
resetFields(['dob'], 'age-result', 'age-warning');
}

// ---------- BMI Calculator ----------
function calculateBMI() {
const h = parseFloat(document.getElementById("height").value);
const w = parseFloat(document.getElementById("weight").value);
const result = document.getElementById("bmi-result");
const warn = 'bmi-warning';

if (!h || !w) return showWarning(warn, "Enter both height and weight."), result.textContent = '';

if (h < 50 || h > 300 || w < 10 || w > 300)
return showWarning(warn, "Height (50–300 cm), Weight (10–300 kg) only."), result.textContent = '';

hideWarning(warn);

const bmi = w / ((h / 100) ** 2);
const rounded = bmi.toFixed(1);
let category = bmi < 18.5 ? "Underweight" :
              bmi < 24.9 ? "Normal weight" :
              bmi < 29.9 ? "Overweight" : "Obesity";

result.textContent = `Your BMI is ${rounded} (${category}).`;
}

function resetBMI() {
resetFields(['height', 'weight'], 'bmi-result', 'bmi-warning');
}


// ---------- Loan EMI Calculator ----------
function calculateEMI() {
const amount = parseFloat(document.getElementById("loan-amount").value);
const rate = parseFloat(document.getElementById("interest-rate").value);
const months = parseInt(document.getElementById("loan-tenure").value);
const result = document.getElementById("emi-result");
const warn = "emi-warning";

if (!amount || !rate || !months)
return showWarning(warn, "Fill all fields."), result.textContent = '';

if (amount < 1000 || amount > 10000000 || rate < 0.1 || rate > 30 || months < 1 || months > 360)
return showWarning(warn, "₹1000–₹10M, 0.1–30% rate, 1–360 months."), result.textContent = '';

hideWarning(warn);

const monthlyRate = rate / 12 / 100;
const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

if (!isFinite(emi)) return showWarning(warn, "Invalid calculation."), result.textContent = '';

result.textContent = `Monthly EMI: ₹${emi.toFixed(2)} | Total: ₹${(emi * months).toFixed(2)}`;
}

function resetLoan() {
resetFields(["loan-amount", "interest-rate", "loan-tenure"], "emi-result", "emi-warning");
}

// ---------- Percentage Calculator ----------
function calculatePercentage() {
const base = parseFloat(document.getElementById("base").value);
const value = parseFloat(document.getElementById("value").value);
const result = document.getElementById("percentage-result");
const warn = "percentage-warning";

if (!base || !value)
return showWarning(warn, "Enter both values."), result.textContent = '';

hideWarning(warn);

const percent = ((value / base) * 100).toFixed(2);
const part = ((base * value) / 100).toFixed(2);

result.textContent = `${value} is ${percent}% of ${base} | ${value}% of ${base} is ${part}`;
}

function resetPercentage() {
resetFields(["base", "value"], "percentage-result", "percentage-warning");
}

// Word Counter
function countWords() {
  const input = document.getElementById("input-text");
  const text = input.value.trim();
  const warn = "word-warning";
  const result = "word-result";

  if (!text) {
    showWarning(warn, "Please enter some text to count.");
    document.getElementById(result).textContent = "";
    return;
  }

  const allTokens = text.match(/\b[\w'-]+\b/g) || [];
   // Validate words:
  // - Must be only letters (a-z, A-Z)
  // - Can have internal apostrophes or hyphens (like "don't" or "mother-in-law")
  // - Ignore tokens with any digit
  // - Ignore single-letter tokens except "I" or "a"
  const validWords = allTokens.filter(word => {
    if (/\d/.test(word)) return false;
    if (!/^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/.test(word)) return false;
    if (word.length === 1 && !/^[Ia]$/i.test(word)) return false;
    return true;
  });

  if (validWords.length === 0) {
    showWarning(warn, "Please enter valid words");
    document.getElementById(result).textContent = "";
    return;
  }

  hideWarning(warn);
  document.getElementById(result).textContent = `Word count: ${validWords.length}`;
}

function resetWords() {
  resetFields(["input-text"], "word-result", "word-warning");
}



document.addEventListener("DOMContentLoaded", () => {
// Age Calculator
const ageBtn = document.getElementById("calculate-age");
const resetAgeBtn = document.getElementById("reset-age");
if (ageBtn) ageBtn.addEventListener("click", calculateAge);
if (resetAgeBtn) resetAgeBtn.addEventListener("click", resetAge);

// BMI Calculator
const bmiBtn = document.getElementById("calculate-bmi");
const resetBmiBtn = document.getElementById("reset-bmi");
if (bmiBtn) bmiBtn.addEventListener("click", calculateBMI);
if (resetBmiBtn) resetBmiBtn.addEventListener("click", resetBMI);

// Loan EMI Calculator
const emiBtn = document.getElementById("calculate-emi");
const resetEmiBtn = document.getElementById("reset-loan");
if (emiBtn) emiBtn.addEventListener("click", calculateEMI);
if (resetEmiBtn) resetEmiBtn.addEventListener("click", resetLoan);

// Percentage Calculator
const percentBtn = document.getElementById("calculate-percentage");
const resetPercentBtn = document.getElementById("reset-percentage");
if (percentBtn) percentBtn.addEventListener("click", calculatePercentage);
if (resetPercentBtn) resetPercentBtn.addEventListener("click", () => {
resetFields(['base', 'value'], 'percentage-result', 'percentage-warning');
});

//Word Counter
const countWordsBtn = document.getElementById("count-words");
const resetWordsBtn = document.getElementById("reset-words");
if (countWordsBtn) countWordsBtn.addEventListener("click", countWords);
if (resetWordsBtn) resetWordsBtn.addEventListener("click", resetWords);

});

