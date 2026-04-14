export function getInput(id) {
  return document.getElementById(id).value;
}

export function setText(id, value) {
  document.getElementById(id).innerText = value;
}

export function setHTML(id, html) {
  document.getElementById(id).innerHTML = html;
}

export function showElement(id) {
  document.getElementById(id).style.display = "block";
}

export function hideElement(id) {
  document.getElementById(id).style.display = "none";
}