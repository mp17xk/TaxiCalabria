(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;
  var dict = window.I18N;
  var root = document.documentElement;
  root.classList.add("js");

  var primary = cfg.phones.filter(function (p) { return p.primary; })[0] || cfg.phones[0];
  var primaryWa = cfg.phones.filter(function (p) { return p.whatsapp && p.primary; })[0] ||
                  cfg.phones.filter(function (p) { return p.whatsapp; })[0];

  function t(lang, key, vars) {
    var s = (dict[lang] && dict[lang][key]) || dict.it[key] || "";
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }

  function waUrl(lang, number) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(t(lang, "wa.message"));
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Rendering (dipende dalla lingua) ---------- */

  function renderServices(lang) {
    var box = document.getElementById("services-list");
    box.innerHTML = "";
    cfg.services.filter(function (s) { return s.active; }).forEach(function (s) {
      var card = el("article", { "class": "card reveal in" },
        '<span class="card-ic">' + icon(s.icon) + "</span>" +
        "<div><h3>" + esc(t(lang, "service." + s.id + ".title")) + "</h3>" +
        "<p>" + esc(t(lang, "service." + s.id + ".text")) + "</p></div>");
      box.appendChild(card);
    });
  }

  function renderVehicle(lang) {
    var v = cfg.vehicle, dl = document.getElementById("vehicle-data");
    var tbc = '<span class="tbc">' + esc(t(lang, "about.tbc")) + "</span>";
    if (!v.model && !v.seats) { dl.outerHTML = '<div id="vehicle-data">' + tbc + "</div>"; return; }
    dl.innerHTML =
      "<dt>" + esc(t(lang, "about.model")) + "</dt><dd>" + (v.model ? esc(v.model) : tbc) + "</dd>" +
      "<dt>" + esc(t(lang, "about.seats")) + "</dt><dd>" + (v.seats ? esc(v.seats) : tbc) + "</dd>";
  }

  function renderPhones(lang) {
    var ul = document.getElementById("phone-list");
    ul.innerHTML = "";
    cfg.phones.forEach(function (p) {
      var li = el("li", { "class": "phone-item" });
      li.innerHTML =
        '<a class="phone-link" href="tel:+' + p.number + '" aria-label="' + esc(t(lang, "aria.callNumber", { n: p.display })) + '">' +
          icon("phone") + esc(p.display) + "</a>" +
        (p.primary ? '<span class="tag">' + esc(t(lang, "contact.primary")) + "</span>" : "") +
        (p.whatsapp ? '<a class="wa-mini" target="_blank" rel="noopener" href="' + waUrl(lang, p.number) +
          '" aria-label="' + esc(t(lang, "aria.waNumber", { n: p.display })) + '">' + icon("wa") + esc(t(lang, "contact.wa")) + "</a>" : "");
      ul.appendChild(li);
    });
  }

  function renderHours(lang) {
    var h = document.getElementById("hours-text");
    if (cfg.hours) { h.removeAttribute("data-i18n"); h.textContent = cfg.hours[lang] || cfg.hours.it; }
  }

  /* ---------- Rendering statico (una volta) ---------- */

  function renderStatic() {
    var s = cfg.social, links = document.getElementById("social-links");
    if (s.instagram) links.appendChild(el("a", { href: s.instagram, target: "_blank", rel: "noopener", "aria-label": "Instagram" }, icon("ig")));
    if (s.facebook) links.appendChild(el("a", { href: s.facebook, target: "_blank", rel: "noopener", "aria-label": "Facebook" }, icon("fb")));
    if (!links.children.length) links.parentNode.hidden = true;

    if (cfg.driverPhoto) setPhoto("driver-photo", cfg.driverPhoto, "Michele Galati");
    if (cfg.vehicle.photo) setPhoto("car-photo", cfg.vehicle.photo, cfg.vehicle.model || "");

    document.getElementById("year").textContent = new Date().getFullYear();

    document.querySelectorAll(".js-tel").forEach(function (a) { a.href = "tel:+" + primary.number; });
    if (!primaryWa) document.querySelectorAll(".js-wa").forEach(function (a) { a.hidden = true; });
  }

  function setPhoto(id, src, alt) {
    var fig = document.getElementById(id);
    fig.innerHTML = "";
    fig.appendChild(el("img", { src: src, alt: alt, loading: "lazy", decoding: "async" }));
  }

  /* ---------- Lingua ---------- */

  function setLang(lang) {
    if (!dict[lang]) lang = "it";
    root.lang = lang;
    document.title = t(lang, "meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t(lang, "meta.description"));

    var area = cfg.area[lang] || cfg.area.it;
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(lang, n.getAttribute("data-i18n"), { area: area });
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (n) {
      n.setAttribute("aria-label", t(lang, n.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (n) {
      n.setAttribute("alt", t(lang, n.getAttribute("data-i18n-alt")));
    });
    document.querySelectorAll("[data-area-text]").forEach(function (n) { n.textContent = area; });

    if (primaryWa) {
      var url = waUrl(lang, primaryWa.number);
      document.querySelectorAll(".js-wa").forEach(function (a) { a.href = url; });
    }

    renderServices(lang);
    renderVehicle(lang);
    renderPhones(lang);
    renderHours(lang);
    if (cfg.vatNumber) document.getElementById("vat").textContent = t(lang, "footer.vat") + " " + cfg.vatNumber;

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function initialLang() {
    try { var s = localStorage.getItem("lang"); if (s && dict[s]) return s; } catch (e) {}
    var nav = (navigator.language || "it").slice(0, 2).toLowerCase();
    return nav === "it" ? "it" : "en"; // visitatori stranieri: inglese
  }

  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ---------- Header e animazioni ---------- */

  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function initReveal() {
    var items = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach(function (i) { io.observe(i); });
  }

  renderStatic();
  setLang(initialLang());
  initReveal();
})();
