// router.js

let currentModuleId = null;
let currentTopicId = null;

async function loadTopic(moduleId, topicId, topicTitle, filePath) {
  currentModuleId = moduleId;
  currentTopicId = topicId;

  $("#topicTitle").textContent = topicTitle;
  $("#topicDesc").textContent = "Tema del " + moduleId.replace("modulo", "Módulo ") + ".";

  try {
    const html = await fetchText(filePath);
    $("#topicContent").innerHTML = html;

    if (window.MathJax) {
      MathJax.typesetPromise();
    }

    $("#topicActions").style.display = "flex";
    scrollToTop();
    updateMenuStatus();
  } catch (err) {
    $("#topicContent").innerHTML = `
      <h3 style="color:var(--orange);">⚠ Error al cargar el tema</h3>
      <p>No se pudo cargar el archivo: <strong>${filePath}</strong></p>
      <p style="color:var(--text-muted); font-weight:700;">Revisa que el archivo exista en la carpeta modules.</p>
    `;
  }
}

function setWelcomeScreen() {
  $("#topicTitle").textContent = "Bienvenido al curso";
  $("#topicDesc").textContent = "Selecciona un tema del menú para comenzar.";
  $("#topicActions").style.display = "none";
}

function updateMenuStatus() {
  const courseMenu = $("#courseMenu");
  if (!courseMenu) return;

  const topics = courseMenu.querySelectorAll(".menu-topic");

  topics.forEach(t => {
    const moduleId = t.dataset.module;
    const topicId = t.dataset.topic;

    const statusEl = t.querySelector(".topic-status");
    if (!statusEl) return;

    if (isTopicCompleted(moduleId, topicId)) {
      statusEl.textContent = "✅";
    } else {
      statusEl.textContent = "⬜";
    }
  });
}
