// to prevent FOUC
var elm=document.querySelector('html');
elm.style.display="none";
document.addEventListener("DOMContentLoaded",_ => elm.style.display="block");

function setDemo(src, dest) {
  setTimeout(function() {
    var html = document.querySelector(src).content.cloneNode(true).querySelector('*').outerHTML;
    document.querySelector(dest+' .demo').innerHTML = html;
    document.querySelector(dest+' .code').innerHTML = html_beautify(html, {indent_size: 2}).replace(/</g,'\&lt;');

  }, 100)
}

function setTheme(theme) {
  var themeEl = document.querySelector('#theme-css');
  themeEl.setAttribute('href', './themes/' + theme + '.css');
}

function toggle(el) {
  el.classList.toggle('expanded');
}

function showDrawer() {
  document.querySelector('a-nav-drawer').open();
}

function showMenu() {
  document.querySelector('#app-bar-menu').classList.toggle('visible');
}

function closeDialog(id) {
  document.getElementById(id).close();
}

function openDialog(id, data) {
  document.getElementById(id).open(data);
}

function showDemoMenu() {
  document.querySelector('#demo-menu').classList.add('visible');
}

function getImportUrl() {
  let elName = window.location.hash.replace('#','');
  return `https://rawgit.com/allenhwkim/custom-element/master/elements/${elName}/index.html`; 
}

function onHttpEnd(response) {
  return response.text()
    .then(function(text) {
      let bodyHTML = text;
      if (text.match(/<html>/)) {
        bodyHTML = text.match(/<body.*?>([\s\S]*?)<\/body>/)[1];
      }
      return bodyHTML;
    })
}