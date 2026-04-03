// utils.js

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo cargar: " + url);
  return await res.text();
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo cargar JSON: " + url);
  return await res.json();
}

function safeHTML(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.innerHTML;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showElement(el) {
  el.style.display = "block";
}

function hideElement(el) {
  el.style.display = "none";
}
