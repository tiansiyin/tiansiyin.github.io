/* ===== 渔城青耘 · 汇乡智造 网站脚本 ===== */
(function () {
  'use strict';

  /* 移动端导航 */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  /* 导航滚动阴影 */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (header) header.style.boxShadow = window.scrollY > 8 ? '0 4px 16px rgba(20,60,35,.08)' : 'none';
  }, { passive: true });

  /* 滚动显现 */
  var revealEls = document.querySelectorAll('.card, .step, .phase, .market-card, .feature, .service-card, .team-card, .stat-mini .mini, .note-card, .table-wrap');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'reveal');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 数字滚动动画 */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('#statCounters [data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* 咨询表单示例提示 */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var old = btn.textContent;
      btn.textContent = '已收到（示例）';
      btn.style.background = '#2f8a52';
      setTimeout(function () { btn.textContent = old; btn.style.background = ''; }, 2600);
    });
  }
})();
