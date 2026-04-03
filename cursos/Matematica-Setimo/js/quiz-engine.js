// quiz-engine.js

let quizData = null;

async function loadQuizzes() {
  quizData = await fetchJSON("data/quizzes.json");
}

function renderQuiz(moduleId) {
  if (!quizData || !quizData[moduleId]) {
    $("#topicContent").innerHTML = `<h3 style="color:var(--orange);">No hay examen disponible para este módulo.</h3>`;
    return;
  }

  const questions = quizData[moduleId];

  let html = `
    <h2>📝 Examen del ${moduleId.replace("modulo", "Módulo ")}</h2>
    <p style="color:var(--text-muted); font-weight:800;">
      Responde todas las preguntas. Al final presiona <strong>Calificar examen</strong>.
    </p>
    <hr/>
    <form id="quizForm">
  `;

  questions.forEach((q, i) => {
    html += `<div style="margin-bottom:1.5rem;">`;
    html += `<p style="font-weight:900;">${i + 1}. ${q.question}</p>`;

    if (q.type === "mcq") {
      q.options.forEach(opt => {
        html += `
          <label style="display:block; margin:0.4rem 0; font-weight:800;">
            <input type="radio" name="q${i}" value="${opt}" required/>
            ${opt}
          </label>
        `;
      });
    }

    if (q.type === "numeric") {
      html += `
        <input type="number" step="any" name="q${i}" required
          style="padding:0.7rem 1rem; border-radius:12px; border:2px solid rgba(11,170,184,0.2); width:220px; font-weight:800; margin-top:0.5rem;">
      `;
    }

    html += `</div><hr/>`;
  });

  html += `
      <button type="submit" class="btn btn-teal" style="width:100%; font-size:1rem;">
        Calificar examen ✔
      </button>
    </form>

    <div id="quizResult" style="margin-top:2rem;"></div>
  `;

  $("#topicContent").innerHTML = html;
  $("#topicActions").style.display = "none";

  $("#quizForm").addEventListener("submit", (e) => {
    e.preventDefault();
    gradeQuiz(moduleId);
  });

  scrollToTop();
}

function gradeQuiz(moduleId) {
  const questions = quizData[moduleId];
  const form = $("#quizForm");
  const formData = new FormData(form);

  let score = 0;

  questions.forEach((q, i) => {
    const userAnswer = formData.get("q" + i);

    if (q.type === "mcq") {
      if (userAnswer === q.answer) score++;
    }

    if (q.type === "numeric") {
      const userNum = parseFloat(userAnswer);
      if (userNum === q.answer) score++;
    }
  });

  saveExamResult(moduleId, score, questions.length);

  const percent = Math.round((score / questions.length) * 100);

  let msg = "";
  if (percent >= 80) msg = "🎉 Excelente trabajo.";
  else if (percent >= 60) msg = "🙂 Buen esfuerzo, puedes mejorar.";
  else msg = "⚠ Debes repasar los temas antes de continuar.";

  $("#quizResult").innerHTML = `
    <div style="padding:1.5rem; border-radius:18px; background:rgba(11,170,184,0.08); border:1.5px solid rgba(11,170,184,0.2);">
      <h3 style="margin-bottom:0.6rem;">Resultado del examen</h3>
      <p style="font-weight:900;">Puntaje: ${score} / ${questions.length}</p>
      <p style="font-weight:900;">Porcentaje: ${percent}%</p>
      <p style="margin-top:0.7rem; font-weight:800; color:var(--text-muted);">${msg}</p>
    </div>
  `;

  scrollToTop();
}
