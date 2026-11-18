/* link.js - connects the Brainy pages and shared behaviour
   splash -> welcome -> login/signup -> target -> home -> practice screens */
window.brainyLinkLoaded = true;

window.BRAINY_ROUTES = {
  splash:  { next: '2nd_page.html', delay: 3200 },
  welcome: { next: '3rd_page.html' },
  login:   { back: '2nd_page.html', afterLogin: 'target.html' }
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
  /* Bottom tab bar on pages that ask for it */
  if (document.body.hasAttribute('data-tabs')) {
    var t = [['⌂','home.html','Home'],['☰','studyplan.html','Plan'],['+','listening.html','Practice'],['★','reading.html','Saved'],['☺','result.html','Results']];
    var n = document.createElement('nav'); n.className = 'tabbar';
    n.innerHTML = t.map(function (x, i) {
      var on = location.pathname.split('/').pop() === x[1];
      return '<a href="' + x[1] + '" aria-label="' + x[2] + '" class="' + (i === 2 ? 'plus ' : '') + (on ? 'on' : '') + '">' + x[0] + '</a>';
    }).join('');
    document.body.appendChild(n);
  }

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
