var navItems = document.querySelectorAll('a-nav-item[href]');
Array.from(navItems).forEach(function(navItem) {
  navItem.addEventListener('click', function() {
    return route(navItem.getAttribute('href'));
  });
});
var mainEl = document.querySelector('main');

route(window.location.hash || '#usage');

function route(url) {
  switch(true) {
    case url === '#installation':
    case url === '#usage':
    case url === '#href':
      updateMain('pages/getting-started.html');
      break;
    case !!url.match(/^javascript:/): // js case
      break;
    default: // component case
      let comp = url.replace('#','');
      updateMain(`https://rawgit.com/allenhwkim/custom-element/master/components/${comp}/index.html`);
      break;
  }
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
        })
      });
    } else {
      mainEl.innerHTML = text;
    }
  })
}