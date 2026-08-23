/* =====================================================================
   Manual de Estruturação Organizacional | J. Simão Neto
   Motor de interações e animações, mesmo do site josesimaoneto.
   ===================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- ano do rodapé ---- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---- header com sombra ao rolar + barra de progresso ---- */
  var header = document.querySelector('.site-header');
  var barra = document.getElementById('progressBar');
  var agendado = false;

  function aoRolar() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 12);
    if (barra) {
      var altura = document.documentElement.scrollHeight - window.innerHeight;
      var pct = altura > 0 ? (y / altura) * 100 : 0;
      barra.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }
    agendado = false;
  }
  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();

  /* ---- menu mobile ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* =====================================================================
     MOTOR DE REVELAÇÃO AO ROLAR (estilo AOS, sem biblioteca externa)
     - [data-anim="fade-up|fade-down|fade-left|fade-right|zoom-in|zoom-out"]
     - [data-stagger] em um contêiner escalona os filhos [data-anim]
     - .reveal continua funcionando
     ===================================================================== */

  var animTargets = [].slice.call(document.querySelectorAll('[data-anim], .reveal'));

  if (reduce || !('IntersectionObserver' in window)) {
    animTargets.forEach(function (el) { el.classList.add('is-in', 'is-visible'); });
  } else {
    [].slice.call(document.querySelectorAll('[data-stagger]')).forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-stagger')) || 90;
      [].slice.call(group.querySelectorAll('[data-anim]')).forEach(function (child, i) {
        child.style.setProperty('--anim-delay', (i * step) + 'ms');
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in', 'is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    animTargets.forEach(function (el) { io.observe(el); });

    // rede de segurança: se o observador não disparar, o conteúdo aparece assim mesmo
    setTimeout(function () {
      animTargets.forEach(function (el) { el.classList.add('is-in', 'is-visible'); });
    }, 3500);
  }

  /* =====================================================================
     PARALLAX SUAVE  ·  [data-parallax="0.15"]
     ===================================================================== */

  var parallaxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduce && parallaxEls.length) {
    var ticking = false;
    var runParallax = function () {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var factor = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var offset = (r.top + r.height / 2 - vh / 2) * factor;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(runParallax); }
    }, { passive: true });
    window.addEventListener('resize', runParallax);
    runParallax();
  }

  /* =====================================================================
     TROCA DE IMAGENS (showcase) com cross-fade, legenda e pontos
     ===================================================================== */

  [].slice.call(document.querySelectorAll('[data-showcase]')).forEach(function (box) {
    var imgs = [].slice.call(box.querySelectorAll('.showcase__img'));
    if (imgs.length < 2) return;
    var caps = [].slice.call(box.querySelectorAll('[data-cap]'));
    var dotsWrap = box.querySelector('[data-dots]');
    var interval = parseInt(box.getAttribute('data-showcase'), 10) || 3600;
    var i = 0, timer = null;

    var dots = [];
    if (dotsWrap) {
      imgs.forEach(function (_, k) {
        var d = document.createElement('button');
        d.className = 'showcase__dot' + (k === 0 ? ' is-on' : '');
        d.setAttribute('aria-label', 'Imagem ' + (k + 1));
        d.addEventListener('click', function () { go(k); reset(); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    function go(n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('is-active', k === i); });
      caps.forEach(function (c, k) { c.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    }
    function tick() { go(i + 1); }
    function start() { if (!timer && !reduce) timer = setInterval(tick, interval); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function reset() { stop(); start(); }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.3 }).observe(box);
    } else { start(); }
  });

  /* =====================================================================
     CONTADOR ANIMADO  ·  [data-count="380"] [data-suffix="+"]
     ===================================================================== */

  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = (el.getAttribute('data-prefix') || '') + el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          countIO.unobserve(el);
          var target = parseFloat(el.getAttribute('data-count'));
          var prefix = el.getAttribute('data-prefix') || '';
          var suffix = el.getAttribute('data-suffix') || '';
          var dur = 1400, start = null;
          var step = function (ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { countIO.observe(el); });
    }
  }

  /* =====================================================================
     ABAS DA ETAPA 2
     ===================================================================== */

  var abas = [].slice.call(document.querySelectorAll('.tab'));
  abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
      abas.forEach(function (outra) {
        var ativa = outra === aba;
        outra.classList.toggle('is-active', ativa);
        outra.setAttribute('aria-selected', String(ativa));
        var painel = document.getElementById(outra.getAttribute('data-panel'));
        if (!painel) return;
        painel.hidden = !ativa;

        // painel escondido nunca é observado pelo IntersectionObserver,
        // então ao aparecer os itens já entram revelados
        if (ativa) {
          [].slice.call(painel.querySelectorAll('[data-anim]')).forEach(function (el) {
            el.classList.add('is-in', 'is-visible');
          });
        }
      });
    });
  });

  /* =====================================================================
     SANFONAS (Etapa 2 e dúvidas frequentes)
     ===================================================================== */

  function ligarSanfona(seletorItem, seletorBotao) {
    [].slice.call(document.querySelectorAll(seletorItem)).forEach(function (item) {
      var botao = item.querySelector(seletorBotao);
      if (!botao) return;

      botao.addEventListener('click', function () {
        var abrindo = !item.classList.contains('is-open');
        var grupo = item.parentElement;
        if (grupo) {
          [].slice.call(grupo.children).forEach(function (irmao) {
            if (irmao !== item && irmao.classList.contains(item.classList[0])) {
              irmao.classList.remove('is-open');
              var b = irmao.querySelector(seletorBotao);
              if (b) b.setAttribute('aria-expanded', 'false');
            }
          });
        }
        item.classList.toggle('is-open', abrindo);
        botao.setAttribute('aria-expanded', String(abrindo));
      });
    });
  }

  ligarSanfona('.deep-item', '.deep-item__head');
  ligarSanfona('.faq-item', '.faq-item__head');

  /* =====================================================================
     FORMULÁRIO: monta a mensagem e abre o WhatsApp já preenchido.
     ===================================================================== */

  var form = document.getElementById('contatoForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var texto =
        'Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20Manual.%0A%0A' +
        'Nome:%20' + encodeURIComponent(form.nome.value || '') + '%0A' +
        'Empresa:%20' + encodeURIComponent(form.empresa.value || '') + '%0A' +
        'Colaboradores:%20' + encodeURIComponent(form.porte.value || '') + '%0A' +
        'Situa%C3%A7%C3%A3o:%20' + encodeURIComponent(form.mensagem.value || '');
      window.open('https://wa.me/5515997555018?text=' + texto, '_blank', 'noopener');
    });
  }
})();
