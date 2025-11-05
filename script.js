// Smart Student Report System

// Core function as requested
// Accepts: studentName (string), score (number-like), subject (string)
// Returns a formatted multi-line report using template literals
function generateReport(studentName, score, subject) {
  const sName = String(studentName ?? "").trim();
  const subj = String(subject ?? "").trim();
  const numericScore = Number(score);

  let grade = "F";
  let status = "Needs Improvement";

  if (Number.isFinite(numericScore)) {
    if (numericScore > 90) {
      grade = "A";
      status = "Excellent"; // 🔥
    } else if (numericScore >= 75 && numericScore < 90) {
      grade = "B";
      status = "Very Good"; // 😀
    } else if (numericScore >= 60 && numericScore < 75) {
      grade = "C";
      status = "Good"; // 🙂
    }
  }

  return `▣ Student Report\nName: ${sName}\nSubject: ${subj}\nScore: ${
    Number.isFinite(numericScore) ? numericScore : "-"
  }\nGrade: ${grade}\nStatus: ${status}`;
}

// Expose for console testing
window.generateReport = generateReport;

// UI wiring
const form = document.getElementById("reportForm");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  feedback.textContent = "";

  const studentName = document.getElementById("studentName").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const scoreInput = document.getElementById("score").value.trim();
  const score = Number(scoreInput);

  // Basic validation
  if (!studentName || !subject || !scoreInput) {
    feedback.textContent = "Please fill all fields.";
    feedback.classList.add("error");
    return;
  }

  if (!Number.isFinite(score) || score < 0 || score > 100) {
    feedback.textContent = "Score must be a number between 0 and 100.";
    feedback.classList.add("error");
    return;
  }

  feedback.classList.remove("error");

  const report = generateReport(studentName, score, subject);
  output.textContent = report;
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.textContent || "");
    feedback.textContent = "Report copied to clipboard.";
    feedback.classList.remove("error");
  } catch (err) {
    feedback.textContent = "Copy failed. Select and copy manually.";
    feedback.classList.add("error");
  }
});

// Prefill demo values for convenience
document.getElementById("studentName").value = "Ahmed";
document.getElementById("subject").value = "Math";
document.getElementById("score").value = "92";
