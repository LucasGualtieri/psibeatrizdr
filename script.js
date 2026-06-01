/* =========================================================================
   Lógica do site — lê o config.js e preenche a página.
   Beatriz: você NÃO precisa mexer aqui. Edite apenas o config.js.
   ========================================================================= */

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

/* -------------------------------------------------------------------------
   CONTORNO DE BUG DA FONTE "Laila": o arquivo da Laila troca os acentos
   AGUDO e GRAVE (ela desenha "á" como "à" e vice-versa). O texto no config.js
   está CORRETO — aqui invertemos só na hora de exibir, e SOMENTE no texto que
   usa a Laila (corpo). Os títulos/cards usam a fonte PF Marlet, que renderiza
   certo, então NÃO passam por aqui.
   Se um dia a fonte Laila for corrigida, basta apagar esta função e as chamadas
   "corrigirAcentoLaila(...)".
   ------------------------------------------------------------------------- */
const TROCA_ACENTO_LAILA = {
  á: "à", à: "á", é: "è", è: "é", í: "ì", ì: "í", ó: "ò", ò: "ó", ú: "ù", ù: "ú",
  Á: "À", À: "Á", É: "È", È: "É", Í: "Ì", Ì: "Í", Ó: "Ò", Ò: "Ó", Ú: "Ù", Ù: "Ú",
};
function corrigirAcentoLaila(valor) {
  if (valor == null) return valor;
  if (Array.isArray(valor)) return valor.map(corrigirAcentoLaila);
  return String(valor).replace(/[áàéèíìóòúùÁÀÉÈÍÌÓÒÚÙ]/g, (c) => TROCA_ACENTO_LAILA[c] || c);
}

/* Ícones (SVG) dos cards de Atendimento — desenhados na cor do texto do card. */
const ATENDIMENTO_ICONES = {
  modalidade: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="8" y="14" width="34" height="24" rx="2" />
      <path d="M4 46 h42" />
      <circle cx="25" cy="24" r="3.5" fill="currentColor" stroke="none" />
      <path d="M19 33 c0 -4 12 -4 12 0" fill="currentColor" stroke="none" />
      <path d="M48 26 a8 8 0 1 1 -6 13 l-5 2 1.5 -5 A8 8 0 0 1 48 26 Z" />
    </svg>`,
  disponibilidade: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="10" y="14" width="36" height="34" rx="3" />
      <path d="M10 24 h36" />
      <path d="M20 10 v8 M36 10 v8" />
      <circle cx="46" cy="44" r="11" fill="#304861" />
      <circle cx="46" cy="44" r="11" />
      <path d="M46 38 v6 l4 3" />
    </svg>`,
  publico: `
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <circle cx="15" cy="25" r="5.5" />
      <path d="M5 44 c0 -7 20 -7 20 0 v2 H5 z" />
      <circle cx="49" cy="25" r="5.5" />
      <path d="M39 44 c0 -7 20 -7 20 0 v2 H39 z" />
      <circle cx="32" cy="21" r="7.5" />
      <path d="M19 47 c0 -8.5 26 -8.5 26 0 v2 H19 z" />
    </svg>`,
};

/**
 * Extrai só o número de um link wa.me (ignora ?text=...) e formata para BR.
 * Ex.: https://wa.me/5531999860727?text=... → (31) 99986-0727
 */
function rotuloWhatsAppDeUrl(url) {
  if (!url || typeof url !== "string") return "WhatsApp";
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, "") !== "wa.me") return "WhatsApp";
    let n = u.pathname.replace(/\D/g, "");
    if (!n) return "WhatsApp";
    if (n.startsWith("55") && n.length >= 12) n = n.slice(2);
    if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
    if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
    return `+${u.pathname.replace(/\D/g, "")}`;
  } catch {
    return "WhatsApp";
  }
}

function setupLandingPage() {
  if (typeof SITE_CONFIG === "undefined") return;
  const { branding, links, imagens, titulos, textos, mapa } = SITE_CONFIG;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };
  const setHtml = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.innerHTML = value;
  };
  const setImage = (id, src, alt) => {
    const el = document.getElementById(id);
    if (!el || !src) return;
    el.src = src;
    if (alt) el.alt = alt;
  };
  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el && href) el.href = href;
  };
  /* Renderiza um texto em parágrafos. Aceita:
     - uma lista de parágrafos: ["parágrafo 1", "parágrafo 2", ...]
     - ou um texto único: cada quebra de linha (Enter) vira um novo parágrafo. */
  const setParagrafos = (id, valor) => {
    const el = document.getElementById(id);
    if (!el || valor == null) return;
    const paras = (Array.isArray(valor) ? valor : String(valor).split(/\n+/))
      .map((p) => String(p).trim())
      .filter(Boolean);
    el.innerHTML = paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  };

  /* ---- Imagens ---- */
  setImage("logo-cabecalho", imagens.logoCabecalho, `${branding.nome} — ${branding.titulo}`);
  setImage("logo-rodape", imagens.logoRodape, `${branding.nome} — ${branding.titulo}`);
  setImage("foto-hero", imagens.fotoHero, branding.nome);
  setImage("foto-sobre-mim", imagens.fotoSobreMim, `Foto de ${branding.nome}`);
  setImage("foto-como-assim", imagens.fotoComoAssim, `Foto de ${branding.nome}`);
  setImage("foto-sessoes", imagens.fotoSessoes, `Foto de ${branding.nome}`);

  /* ---- Títulos ---- */
  setText("titulo-sobre-mim", titulos.sobreMim);
  setText("titulo-meu-proposito", titulos.meuProposito);
  setText("titulo-como-assim", titulos.comoAssim);
  setText("titulo-terapia", titulos.terapiaParaMim);
  setText("titulo-sessoes", titulos.sobreSessoes);
  setText("titulo-conversa", titulos.conversaInicial);
  setText("titulo-duvidas", titulos.duvidas);
  setText("titulo-atendimentos", titulos.atendimentos);

  /* ---- Textos ---- */
  /* Hífen não-quebrável (‑) para palavras como "ouvi-la" não partirem em duas linhas. */
  const fraseEl = document.getElementById("frase-efeito");
  if (fraseEl && textos.fraseDeEfeito) {
    fraseEl.textContent = textos.fraseDeEfeito.replace(/(\w)-(\w)/g, "$1‑$2");
  }
  setParagrafos("texto-meu-proposito", corrigirAcentoLaila(textos.meuPropositoTexto));
  setParagrafos("texto-como-assim", corrigirAcentoLaila(textos.comoAssimTexto));
  setParagrafos("texto-terapia", corrigirAcentoLaila(textos.terapiaParaMimTexto));
  setParagrafos("texto-sessoes", corrigirAcentoLaila(textos.sobreSessoesTexto));
  setParagrafos("texto-conversa", corrigirAcentoLaila(textos.conversaInicialTexto));
  setParagrafos("texto-duvidas-intro", corrigirAcentoLaila(textos.duvidasIntro));

  /* ---- Lista "Sobre mim" ---- */
  const lista = document.getElementById("lista-sobre-mim");
  if (lista && Array.isArray(textos.quemSouEuItems)) {
    lista.innerHTML = textos.quemSouEuItems
      .map(
        (item) =>
          `<li class="topico"><img class="topico__bullet" src="images/icones/topico.svg" alt="" aria-hidden="true" /><span>${escapeHtml(corrigirAcentoLaila(item))}</span></li>`
      )
      .join("");
  }

  /* ---- Acordeão de dúvidas ---- */
  const duvidasEl = document.getElementById("lista-duvidas");
  if (duvidasEl && Array.isArray(textos.duvidas)) {
    duvidasEl.innerHTML = textos.duvidas
      .map(
        (d) => `
        <details class="accordion__item">
          <summary class="accordion__pergunta">
            <span>${escapeHtml(corrigirAcentoLaila(d.pergunta))}</span>
            <span class="accordion__seta" aria-hidden="true"></span>
          </summary>
          <div class="accordion__resposta"><p>${escapeHtml(corrigirAcentoLaila(d.resposta))}</p></div>
        </details>`
      )
      .join("");
  }

  /* ---- Cards de atendimento ---- */
  const cardsEl = document.getElementById("cards-atendimento");
  if (cardsEl && Array.isArray(textos.atendimentos)) {
    cardsEl.innerHTML = textos.atendimentos
      .map((card) => {
        const icone = ATENDIMENTO_ICONES[card.icone] || "";
        return `
        <article class="card-atendimento">
          <span class="card-atendimento__icone">${icone}</span>
          <h3 class="card-atendimento__label">${escapeHtml(card.label)}</h3>
          <p class="card-atendimento__desc">${escapeHtml(corrigirAcentoLaila(card.descricao))}</p>
        </article>`;
      })
      .join("");
  }

  /* ---- Contato / endereço ---- */
  setText("contato-helper", corrigirAcentoLaila(textos.contatoHelper));
  setText(
    "contato-numero",
    links.whatsappRotulo || rotuloWhatsAppDeUrl(links.whatsapp)
  );
  setText("cta-contato", corrigirAcentoLaila(textos.contatoBotao || "Agende sua consulta"));
  setText("endereco-rotulo", corrigirAcentoLaila(textos.enderecoRotulo || "Endereço"));
  setHtml("endereco-texto", corrigirAcentoLaila(textos.endereco));

  /* ---- Links de WhatsApp ---- */
  setHref("cta-topo", links.whatsapp);
  setHref("cta-contato", links.whatsapp);

  /* ---- Mapa ---- */
  const mapaEl = document.getElementById("mapa-iframe");
  if (mapaEl && mapa && mapa.iframeSrc) mapaEl.src = mapa.iframeSrc;

  /* ---- Ano atual ---- */
  setText("ano-atual", String(new Date().getFullYear()));

  /* ---- Rolagem suave para âncoras ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", setupLandingPage);
