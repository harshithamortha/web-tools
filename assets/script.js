// Detect which tool page is open by URL path
const path = window.location.pathname;

if (path.includes('age-calculator.html')) {
  // Attach Age Calculator function to global scope
  window.calculateAge = function() {
    const dobInput = document.getElementById('dob').value;
    const resultEl = document.getElementById('result');

    if (!dobInput) {
      resultEl.textContent = 'Please enter your date of birth.';
      return;
    }

    const dob = new Date(dobInput);
    const now = new Date();

    if (dob > now) {
      resultEl.textContent = 'Date of birth cannot be in the future.';
      return;
    }

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    resultEl.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
  };
}
