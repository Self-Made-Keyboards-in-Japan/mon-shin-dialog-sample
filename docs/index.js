function radioDeselection(domId) {
  for (const element of document.getElementById(domId)) {
    element.checked = false;
  }
}