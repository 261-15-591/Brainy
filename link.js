/* link.js — page navigation for the Brainy app
   Edit the routes below to change where each page goes. */

window.brainyLinkLoaded = true;

const ROUTES = {
  splash:  { next: '2nd_page.html', delay: 3200 },  // index.html -> 2nd_page.html after 3.2s
  welcome: { next: null }                            // 2nd_page.html "Get Started" -> set e.g. '3rd_page.html'
};

function goTo(url) {
  document.body.classList.add('page-leaving');
  setTimeout(function () { window.location.href = url; }, 450);
}

document.addEventListener('DOMContentLoaded', function () {
  var page = document.body.dataset.page;
  var route = ROUTES[page];
  if (!route || !route.next) return;

  // Splash screen: auto-redirect after a delay
  if (route.delay) {
    setTimeout(function () { goTo(route.next); }, route.delay);
  }

  // Welcome page: redirect when "Get Started" is clicked
  var btn = document.getElementById('getStartedBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      setTimeout(function () { goTo(route.next); }, 140);
    });
  }
});
