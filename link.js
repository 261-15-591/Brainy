/* link.js - connects the Brainy pages
   splash (index.html) -> welcome (2nd_page.html) -> login (3rd_page.html)
   Edit the routes below to change where each page goes. */

window.brainyLinkLoaded = true;

window.BRAINY_ROUTES = {
  splash:  { next: '2nd_page.html', delay: 3200 },     // auto-continues after 3.2s (or tap to skip)
  welcome: { next: '3rd_page.html' },                   // "Get Started" button
  login:   { back: '2nd_page.html', afterLogin: null }  // back arrow / page to open after login (e.g. 'home.html')
};

window.brainyGo = function (url) {
  document.body.classList.add('page-leaving');
  setTimeout(function () { window.location.href = url; }, 450);
};

document.addEventListener('DOMContentLoaded', function () {
  var page = document.body.dataset.page;
  var route = window.BRAINY_ROUTES[page];
  if (!route) return;

  if (page === 'splash') {
    var left = false;
    var leave = function () { if (!left) { left = true; brainyGo(route.next); } };
    setTimeout(leave, route.delay);
    document.body.addEventListener('click', leave);   // tap anywhere to skip
  }

  if (page === 'welcome') {
    var start = document.getElementById('getStartedBtn');
    if (start) start.addEventListener('click', function () {
      setTimeout(function () { brainyGo(route.next); }, 140);
    });
  }

  if (page === 'login') {
    var back = document.getElementById('backBtn');
    if (back) back.addEventListener('click', function () { brainyGo(route.back); });
  }
});
