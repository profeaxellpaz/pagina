// =====================================
// MAIN LMS - Profe Axell Paz
// Archivo: js/main.js
// =====================================

// Aplicar modo oscuro si estaba activado en el sitio principal
if(localStorage.getItem("darkMode") === "enabled"){
  document.body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // BOTÓN INICIO CURSO
  // ==========================
  const btnStart = document.getElementById("btnStartCourse");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      if (window.CourseRouter) {
        window.CourseRouter.goFirstTopic();
      }
    });
  }

  // ==========================
  // AJUSTE TAMAÑO DE LETRA (DUA)
  // ==========================
  const btnPlus  = document.getElementById("btnFontPlus");
  const btnMinus = document.getElementById("btnFontMinus");

  let fontSize = parseInt(localStorage.getItem("lmsFontSize")) || 16;

  function applyFontSize() {
    document.documentElement.style.fontSize = fontSize + "px";
    localStorage.setItem("lmsFontSize", fontSize);
  }

  if (btnPlus) {
    btnPlus.addEventListener("click", () => {
      if (fontSize < 22) {
        fontSize += 1;
        applyFontSize();
      }
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener("click", () => {
      if (fontSize > 14) {
        fontSize -= 1;
        applyFontSize();
      }
    });
  }

  applyFontSize();

  // ==========================
  // MODO LECTURA (DUA)
  // ==========================
  const btnReading = document.getElementById("btnReadingMode");

  if (btnReading) {
    btnReading.addEventListener("click", () => {
      document.body.classList.toggle("reading-mode");

      if (document.body.classList.contains("reading-mode")) {
        btnReading.textContent = "Modo normal";
      } else {
        btnReading.textContent = "Modo lectura";
      }
    });
  }

  // ==========================
  // MODO OSCURO (SINCRONIZADO)
  // ==========================
  const btnDark = document.createElement("button");
  btnDark.className = "btn btn-outline";
  btnDark.id = "btnDarkMode";
  btnDark.textContent = "🌙";

  const topbarRight = document.querySelector(".topbar-right");
  if (topbarRight) {
    topbarRight.appendChild(btnDark);
  }

  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    btnDark.textContent = "☀️";
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    btnDark.textContent = "🌙";
  }

  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  }

  btnDark.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  const btnDarkMode = document.getElementById("btnDarkMode");

if(btnDarkMode){
  if(document.body.classList.contains("dark-mode")){
    btnDarkMode.textContent = "☀️";
  }

  btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
      localStorage.setItem("darkMode", "enabled");
      btnDarkMode.textContent = "☀️";
    } else {
      localStorage.setItem("darkMode", "disabled");
      btnDarkMode.textContent = "🌙";
    }
  });
}

});
