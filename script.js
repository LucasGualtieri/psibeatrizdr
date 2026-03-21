function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

const STORAGE_HERO_Y_MOBILE = "psibeatriz-hero-img-y-mobile";
const STORAGE_HERO_Y_DESKTOP = "psibeatriz-hero-img-y-desktop";
/** @deprecated valor único antigo — migrado para mobile/desktop */
const STORAGE_HERO_Y_LEGACY = "psibeatriz-hero-img-y";
const STORAGE_ABOUT_Y = "psibeatriz-about-img-y";

function clampPercent(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return 50;
  return Math.min(100, Math.max(0, x));
}

/** Eixo vertical do hero: CSS permite object-position > 100% (ex.: 120%) para “empurrar” o recorte. */
function getHeroYLimits(cfg) {
  const c = cfg || {};
  const min = c.heroVerticalMin != null ? Number(c.heroVerticalMin) : 0;
  const max = c.heroVerticalMax != null ? Number(c.heroVerticalMax) : 150;
  return {
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) && max > min ? max : 150,
  };
}

function clampHeroY(n, cfg) {
  const { min, max } = getHeroYLimits(cfg);
  const x = Number(n);
  if (Number.isNaN(x)) return Math.min(max, Math.max(min, 50));
  return Math.min(max, Math.max(min, x));
}

/** Aplica object-position vertical a partir do config + localStorage. */
function applyFotoPositions(ajusteFromConfig) {
  const cfg = ajusteFromConfig || {};
  const legacyHero = clampHeroY(cfg.heroVerticalPercent ?? 50, cfg);
  const mobileDefault =
    cfg.heroVerticalPercentMobile != null
      ? clampHeroY(cfg.heroVerticalPercentMobile, cfg)
      : legacyHero;
  const desktopDefault =
    cfg.heroVerticalPercentDesktop != null
      ? clampHeroY(cfg.heroVerticalPercentDesktop, cfg)
      : legacyHero;
  const aboutDefault = clampPercent(cfg.sobreVerticalPercent ?? 50);

  let mobileStored = localStorage.getItem(STORAGE_HERO_Y_MOBILE);
  let desktopStored = localStorage.getItem(STORAGE_HERO_Y_DESKTOP);

  if (mobileStored === null && desktopStored === null) {
    const old = localStorage.getItem(STORAGE_HERO_Y_LEGACY);
    if (old !== null) {
      const v = clampHeroY(Number(old), cfg);
      mobileStored = String(v);
      desktopStored = String(v);
      localStorage.setItem(STORAGE_HERO_Y_MOBILE, String(v));
      localStorage.setItem(STORAGE_HERO_Y_DESKTOP, String(v));
    }
  }

  const heroMobile =
    mobileStored !== null ? clampHeroY(Number(mobileStored), cfg) : mobileDefault;
  const heroDesktop =
    desktopStored !== null ? clampHeroY(Number(desktopStored), cfg) : desktopDefault;

  const aboutStored = localStorage.getItem(STORAGE_ABOUT_Y);
  const aboutY = aboutStored !== null ? clampPercent(Number(aboutStored)) : aboutDefault;

  document.documentElement.style.setProperty("--hero-img-y-mobile", `${heroMobile}%`);
  document.documentElement.style.setProperty("--hero-img-y-desktop", `${heroDesktop}%`);
  document.documentElement.style.setProperty("--about-img-y", `${aboutY}%`);
}

function setupPhotoAdjustUI(ajusteFromConfig) {
  const panel = document.getElementById("photo-adjust-panel");
  const heroMobileSlider = document.getElementById("adjust-hero-y-mobile");
  const heroDesktopSlider = document.getElementById("adjust-hero-y-desktop");
  const aboutSlider = document.getElementById("adjust-about-y");
  if (!panel || !heroMobileSlider || !heroDesktopSlider || !aboutSlider) return;

  const cfg = ajusteFromConfig || {};
  const { min: hMin, max: hMax } = getHeroYLimits(cfg);
  heroMobileSlider.min = String(hMin);
  heroMobileSlider.max = String(hMax);
  heroDesktopSlider.min = String(hMin);
  heroDesktopSlider.max = String(hMax);

  const legacyHero = clampHeroY(cfg.heroVerticalPercent ?? 50, cfg);
  const mobileDefault =
    cfg.heroVerticalPercentMobile != null
      ? clampHeroY(cfg.heroVerticalPercentMobile, cfg)
      : legacyHero;
  const desktopDefault =
    cfg.heroVerticalPercentDesktop != null
      ? clampHeroY(cfg.heroVerticalPercentDesktop, cfg)
      : legacyHero;
  const aboutDefault = clampPercent(cfg.sobreVerticalPercent ?? 50);

  let mStored = localStorage.getItem(STORAGE_HERO_Y_MOBILE);
  let dStored = localStorage.getItem(STORAGE_HERO_Y_DESKTOP);
  if (mStored === null && dStored === null) {
    const old = localStorage.getItem(STORAGE_HERO_Y_LEGACY);
    if (old !== null) {
      const v = clampHeroY(Number(old), cfg);
      mStored = String(v);
      dStored = String(v);
    }
  }

  const aboutStored = localStorage.getItem(STORAGE_ABOUT_Y);

  heroMobileSlider.value = String(
    mStored !== null ? clampHeroY(Number(mStored), cfg) : mobileDefault
  );
  heroDesktopSlider.value = String(
    dStored !== null ? clampHeroY(Number(dStored), cfg) : desktopDefault
  );
  aboutSlider.value = String(
    aboutStored !== null ? clampPercent(Number(aboutStored)) : aboutDefault
  );

  const params = new URLSearchParams(window.location.search);
  if (params.get("ajuste") === "1") {
    panel.hidden = false;
  }

  const persistAndApply = () => {
    const hm = clampHeroY(Number(heroMobileSlider.value), cfg);
    const hd = clampHeroY(Number(heroDesktopSlider.value), cfg);
    const a = clampPercent(Number(aboutSlider.value));
    localStorage.setItem(STORAGE_HERO_Y_MOBILE, String(hm));
    localStorage.setItem(STORAGE_HERO_Y_DESKTOP, String(hd));
    localStorage.setItem(STORAGE_ABOUT_Y, String(a));
    document.documentElement.style.setProperty("--hero-img-y-mobile", `${hm}%`);
    document.documentElement.style.setProperty("--hero-img-y-desktop", `${hd}%`);
    document.documentElement.style.setProperty("--about-img-y", `${a}%`);
  };

  heroMobileSlider.addEventListener("input", persistAndApply);
  heroDesktopSlider.addEventListener("input", persistAndApply);
  aboutSlider.addEventListener("input", persistAndApply);
}

/**
 * Extrai só o número de um link wa.me (ignora ?text=...) e formata para exibição BR.
 * Ex.: https://wa.me/5531999860727?text=... → (31) 99986-0727
 */
function rotuloWhatsAppDeUrl(url) {
  if (!url || typeof url !== "string") return "WhatsApp";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host !== "wa.me") return "WhatsApp";
    const digits = u.pathname.replace(/\D/g, "");
    if (!digits) return "WhatsApp";
    let n = digits;
    if (n.startsWith("55") && n.length >= 12) n = n.slice(2);
    if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
    if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
    return `+${digits}`;
  } catch {
    return "WhatsApp";
  }
}

function setupLandingPage() {
  if (typeof SITE_CONFIG === "undefined") return;

  const { branding, links, imagens, textos, mapa } = SITE_CONFIG;

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.textContent = value;
  };

  const setImage = (selector, src, fallbackAlt) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.src = src || "https://via.placeholder.com/1200x800?text=Imagem";
    if (fallbackAlt) el.alt = fallbackAlt;
  };

  /** Só href — nunca use textContent no <a> se ele tiver ícones/filhos dentro. */
  const setHref = (selector, href) => {
    const el = document.querySelector(selector);
    if (el && href) el.href = href;
  };

  setText(".brand-name", branding.nome);
  setText(".brand-subtitle", branding.titulo);
  setText("#brand-crp", branding.crp);
  setText("#hero-quote", textos.fraseDeEfeito);
  const heroIntroEl = document.querySelector("#hero-intro");
  if (heroIntroEl && textos.heroIntro) heroIntroEl.innerHTML = textos.heroIntro;

  const aboutBullets = document.getElementById("about-bullets");
  if (aboutBullets && Array.isArray(textos.quemSouEuItems)) {
    aboutBullets.innerHTML = textos.quemSouEuItems
      .map(
        (text) =>
          `<div class="about-row"><span class="contact-primary-icon about-bullet-icon" aria-hidden="true">✦</span><strong class="about-bullet-text">${escapeHtml(text)}</strong></div>`
      )
      .join("");
  }

  setText("#address-text", textos.endereco);
  setText("#contact-whatsapp-helper", textos.contatoHelper);
  setText("#contact-modalidade", textos.contatoModalidade);
  setText("#contact-disponibilidade", textos.contatoDisponibilidade);
  setText("#contact-observacao", textos.contatoObservacao);

  document.querySelectorAll('img[data-photo="hero"]').forEach((img) => {
    img.src = imagens.dirFotoPerfil || "https://via.placeholder.com/1200x800?text=Imagem";
    img.alt = img.hasAttribute("data-mobile") ? "" : `Foto de ${branding.nome}`;
  });
  setImage("#about-image", imagens.dirFotoSobre, `Foto profissional de ${branding.nome}`);

  applyFotoPositions(imagens.ajusteFotos);
  setupPhotoAdjustUI(imagens.ajusteFotos);

  // Logo (flor / identidade visual) — vem de imagens.dirLogoOpcional no config.js
  if (imagens.dirLogoOpcional) {
    document.querySelectorAll("img.brand-mark").forEach((img) => {
      img.src = imagens.dirLogoOpcional;
      img.alt = `${branding.nome} logotipo`;
    });
  }

  setHref("#cta-agendar", links.whatsapp);

  setHref("#contact-whatsapp", links.whatsapp);
  setText(
    "#contact-whatsapp-label",
    links.whatsappRotulo || rotuloWhatsAppDeUrl(links.whatsapp)
  );

  const map = document.querySelector("#map-iframe");
  if (map && mapa.iframeSrc) {
    map.src = mapa.iframeSrc;
  }

  const currentYear = document.querySelector("#current-year");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  // Smooth-scroll fallback for older browsers.
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", setupLandingPage);
