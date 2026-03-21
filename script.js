function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
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
  setText("#hero-intro", textos.heroIntro);

  const aboutBullets = document.getElementById("about-bullets");
  if (aboutBullets && Array.isArray(textos.quemSouEuItems)) {
    aboutBullets.innerHTML = textos.quemSouEuItems
      .map(
        (text) =>
          `<div class="contact-detail-card"><strong>${escapeHtml(text)}</strong></div>`
      )
      .join("");
  }

  setText("#address-text", textos.endereco);
  setText("#contact-intro", textos.contatoIntro);
  setText("#contact-whatsapp-helper", textos.contatoHelper);
  setText("#contact-modalidade", textos.contatoModalidade);
  setText("#contact-disponibilidade", textos.contatoDisponibilidade);
  setText("#contact-observacao", textos.contatoObservacao);

  setImage("#hero-image", imagens.dirFotoPerfil, `Foto de ${branding.nome}`);
  setImage("#about-image", imagens.dirFotoSobre, `Foto profissional de ${branding.nome}`);

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
