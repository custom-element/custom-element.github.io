var mainEl = document.querySelector('main');

route(window.location.hash || '#usage');
window.addEventListener('popstate', function(event) {
  route(window.location.hash || '#usage');
});

function route(url) {
  switch(true) {
    case url === '#installation':
    case url === '#usage':
    case url === '#faq':
      updateMain('pages/getting-started.html');
      break;
    case !!url.match(/^javascript:/): // js case
      break;
    default: // custom element case
      let elName = url.replace('#','');
      updateMain(`https://rawgit.com/allenhwkim/custom-element/master/elements/${elName}/index.html`);
      break;
  }
  window.scrollTo(0,0);
}

function updateMain(url) {
  fetch(url).then(function(response) {
    if (response.ok) {
      return response.text();
    }
  }).then(function(text) {
    if (text.match(/<html>/)) {
      text = text.match(/<body.*?>([\s\S]*?)<\/body>/)[1];
      mainEl.innerHTML = text;
      let scripts = text.match(/<script>([\s\S]*?)<\/script>/g);
      setTimeout(function() { // execute script because innerHTML does not run script
        scripts.forEach(function(script) {
          eval(script.match(/<script>([\s\S]*?)<\/script>/)[1]);
        });
      });
    } else {
      mainEl.innerHTML = text;
    }
  })
}