// main.js

let courseData = null;

document.addEventListener("DOMContentLoaded", async () => {
  courseData = await fetchJSON("data/course.json");

  await loadQuizzes();
  buildCourseMenu(courseData);
  updateGeneralProgress(courseData);

  $("#btnResetProgress").addEventListener("click", () => {
    if (confirm("¿Seguro que deseas borrar todo tu progreso y exámenes?")) {
      resetProgress();
      updateMenuStatus();
      updateGeneralProgress(courseData);
      alert("Progreso restablecido.");
    }
  });

  $("#btnMarkComplete").addEventListener("click", () => {
    if (!currentModuleId || !currentTopicId) return;

    markTopicCompleted(currentModuleId, currentTopicId);
    updateMenuStatus();
    updateGeneralProgress(courseData);

    alert("Tema marcado como completado ✅");
  });

  $("#btnGoExam").addEventListener("click", () => {
    if (!currentModuleId) {
      alert("Primero selecciona un tema de un módulo.");
      return;
    }
    renderQuiz(currentModuleId);
  });

  $("#btnStartCourse").addEventListener("click", () => {
    const firstModule = courseData.modules[0];
    const firstTopic = firstModule.topics[0];
    loadTopic(firstModule.id, firstTopic.id, firstTopic.title, firstTopic.file);
  });

  initAccessibilityTools();
});

function buildCourseMenu(courseData) {
  const menu = $("#courseMenu");
  menu.innerHTML = "";

  courseData.modules.forEach(mod => {
    const moduleBox = document.createElement("div");
    moduleBox.className = "menu-module";

    moduleBox.innerHTML = `<h3>${mod.title}</h3>`;

    mod.topics.forEach(topic => {
      const topicDiv = document.createElement("div");
      topicDiv.className = "menu-topic";
      topicDiv.dataset.module = mod.id;
      topicDiv.dataset.topic = topic.id;

      topicDiv.innerHTML = `
        <span>${topic.title}</span>
        <span class="topic-status">⬜</span>
      `;

      topicDiv.addEventListener("click", () => {
        loadTopic(mod.id, topic.id, topic.title, topic.file);
      });

      moduleBox.appendChild(topicDiv);
    });

    // Botón examen del módulo
    const examBtn = document.createElement("button");
    examBtn.className = "btn btn-outline";
    examBtn.style.width = "100%";
    examBtn.style.marginTop = "0.8rem";
    examBtn.textContent = "📝 Examen del módulo";

    examBtn.addEventListener("click", () => {
      currentModuleId = mod.id;
      renderQuiz(mod.id);
    });

    moduleBox.appendChild(examBtn);

    // Mostrar nota anterior si existe
    const examResult = getExamResult(mod.id);
    if (examResult) {
      const note = document.createElement("p");
      note.style.marginTop = "0.8rem";
      note.style.fontWeight = "900";
      note.style.color = "var(--text-muted)";
      note.style.fontSize = "0.85rem";
      note.textContent = `📌 Última nota: ${examResult.percent}%`;
      moduleBox.appendChild(note);
    }

    menu.appendChild(moduleBox);
  });

  updateMenuStatus();
}

function updateGeneralProgress(courseData) {
  const p = getGeneralProgress(courseData);
  $("#progressText").textContent = p.percent + "%";
  $("#progressFill").style.width = p.percent + "%";
}

function initAccessibilityTools() {
  let fontSize = 1;

  $("#btnFontPlus").addEventListener("click", () => {
    fontSize += 0.1;
    document.body.style.fontSize = fontSize + "rem";
  });

  $("#btnFontMinus").addEventListener("click", () => {
    fontSize -= 0.1;
    if (fontSize < 0.8) fontSize = 0.8;
    document.body.style.fontSize = fontSize + "rem";
  });

  $("#btnReadingMode").addEventListener("click", () => {
    document.body.classList.toggle("reading-mode");
  });
}
