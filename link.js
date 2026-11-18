/* link.js - connects the Brainy pages and shared behaviour
   splash -> welcome -> login/signup -> target -> home -> practice screens */
window.brainyLinkLoaded = true;

window.BRAINY_ROUTES = {
  splash:  { next: '2nd_page.html', delay: 3200 },
  welcome: { next: '3rd_page.html' },
  login:   { back: '2nd_page.html', afterLogin: null }
};

window.brainyGo = function (url) {
  document.body.classList.add('page-leaving');
  setTimeout(function () { window.location.href = url; }, 450);
};

document.addEventListener('DOMContentLoaded', function () {
  /* Any element with data-go="page.html" navigates there */
  document.querySelectorAll('[data-go]').forEach(function (el) {
    el.addEventListener('click', function () { brainyGo(el.dataset.go); });
  });
  /* Chips inside [data-select] act as single-choice groups */
  document.querySelectorAll('[data-select]').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      g.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });
      c.classList.add('on');
    });
  });
  /* Inline SVG icons: <i data-ic="name"></i> */
  var IC={"headphones": "<path d=\"M3 14v-2a9 9 0 0 1 18 0v2\"/><path d=\"M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z\"/>", "book": "<path d=\"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z\"/><path d=\"M9 7h6M9 11h6\"/>", "pen": "<path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z\"/>", "mic": "<rect x=\"9\" y=\"2\" width=\"6\" height=\"12\" rx=\"3\"/><path d=\"M5 11a7 7 0 0 0 14 0M12 18v4\"/>", "bell": "<path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21a2 2 0 0 0 4 0\"/>", "flame": "<path d=\"M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z\"/>", "home": "<path d=\"M3 11l9-8 9 8v10h-6v-6H9v6H3z\"/>", "list": "<path d=\"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "bookmark": "<path d=\"M6 3h12v18l-6-4-6 4z\"/>", "user": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/>", "back": "<path d=\"M15 5l-7 7 7 7\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>"};
  document.querySelectorAll('i[data-ic]').forEach(function (el) {
    var d = IC[el.dataset.ic]; if (!d) return;
    el.outerHTML = '<svg class="ic ' + el.className + '" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  });

  var page = document.body.dataset.page;
  var route = window.BRAINY_ROUTES[page];
  if (!route) return;

  if (page === 'splash') {
    var left = false;
    var leave = function () { if (!left) { left = true; brainyGo(route.next); } };
    setTimeout(leave, route.delay);
    document.body.addEventListener('click', leave);
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
