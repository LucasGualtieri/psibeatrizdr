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

/* Ícones dos cards de Atendimento (desenhos extraídos do layout da designer). */
const ATENDIMENTO_ICONES = {
  modalidade: "images/icones/atendimento-modalidade.png",
  disponibilidade: "images/icones/atendimento-disponibilidade.png",
  publico: "images/icones/atendimento-publico.png",
};

/* Transforma "@perfil" em link para o Instagram. Recebe texto já escapado. */
function linkarPerfis(html) {
  return html.replace(
    /@([A-Za-z0-9._]+[A-Za-z0-9_])/g,
    (m, user) =>
      `<a href="https://www.instagram.com/${user}/" target="_blank" rel="noopener noreferrer">${m}</a>`
  );
}

/* Item da lista "Sobre mim": o trecho depois do último " | " (CRP, @perfil...)
   aparece menor, como no layout. */
function topicoHtml(item) {
  const texto = String(item);
  const corte = texto.lastIndexOf(" | ");
  if (corte === -1) return escapeHtml(corrigirAcentoLaila(texto));
  const principal = texto.slice(0, corte);
  const detalhe = texto.slice(corte + 3);
  const detalheHtml = linkarPerfis(escapeHtml(corrigirAcentoLaila(detalhe)));
  /* Perfis (@...) ficam na mesma linha, depois da barra; o resto (ex.: CRP)
     vai para a linha de baixo. */
  if (detalhe.trim().startsWith("@")) {
    return `${escapeHtml(corrigirAcentoLaila(principal))} | <small>${detalheHtml}</small>`;
  }
  return `${escapeHtml(corrigirAcentoLaila(principal))}<small class="topico__linha">${detalheHtml}</small>`;
}

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
          `<li class="topico"><img class="topico__bullet" src="images/icones/topico.svg" alt="" aria-hidden="true" /><span>${topicoHtml(item)}</span></li>`
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
        const icone = ATENDIMENTO_ICONES[card.icone];
        const iconeHtml = icone ? `<img src="${icone}" alt="" />` : "";
        return `
        <article class="card-atendimento">
          <h3 class="card-atendimento__label">${escapeHtml(corrigirAcentoLaila(card.label))}</h3>
          <span class="card-atendimento__icone card-atendimento__icone--${escapeHtml(card.icone)}" aria-hidden="true">${iconeHtml}</span>
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
  setHref("cta-hero", links.whatsapp);
  setHref("cta-contato", links.whatsapp);

  /* ---- Instagram ---- */
  const instagramUrl =
    links.instagram ||
    (links.instagramUsuario
      ? `https://www.instagram.com/${links.instagramUsuario.replace(/^@/, "")}/`
      : "");
  const instagramUsuario =
    links.instagramUsuario ||
    `@${instagramUrl.replace(/\/+$/, "").split("/").pop()}`;
  if (instagramUrl) {
    document.querySelectorAll(".js-instagram-link").forEach((el) => {
      el.href = instagramUrl;
      if (el.getAttribute("aria-label") === "Instagram") {
        el.setAttribute("aria-label", `Instagram ${instagramUsuario}`);
      }
    });
    document.querySelectorAll(".js-instagram-usuario").forEach((el) => {
      el.textContent = instagramUsuario;
    });
    setText("instagram-helper", corrigirAcentoLaila(textos.instagramHelper || "Acompanhe no Instagram"));
    setText("cta-instagram", corrigirAcentoLaila(textos.instagramBotao || "Siga no Instagram"));
    setImage("instagram-avatar", imagens.avatarInstagram || imagens.fotoSobreMim, "");
  } else {
    document.querySelectorAll("#instagram, .icone-instagram, .footer-instagram, .menu__instagram").forEach((el) => {
      el.hidden = true;
    });
  }

  /* ---- Mapa ---- */
  const mapaEl = document.getElementById("mapa-iframe");
  if (mapaEl && mapa && mapa.iframeSrc) mapaEl.src = mapa.iframeSrc;

  /* ---- Ano atual ---- */
  setText("ano-atual", String(new Date().getFullYear()));

  /* ---- Menu suspenso ---- */
  const menu = document.getElementById("menu");
  const menuBotao = menu && menu.querySelector(".menu__botao");
  const abrirMenu = (aberto) => {
    if (!menu) return;
    menu.classList.toggle("is-aberto", aberto);
    menuBotao.setAttribute("aria-expanded", String(aberto));
  };
  if (menuBotao) {
    /* Os itens do menu estão no HTML e usam a Laila: passam pela correção de acento. */
    menu.querySelectorAll(".menu__lista a").forEach((link) => {
      link.textContent = corrigirAcentoLaila(link.textContent);
    });
    menuBotao.addEventListener("click", (event) => {
      event.stopPropagation();
      abrirMenu(!menu.classList.contains("is-aberto"));
    });
    menu.querySelectorAll(".menu__lista a").forEach((link) =>
      link.addEventListener("click", () => abrirMenu(false))
    );
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) abrirMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-aberto")) {
        abrirMenu(false);
        menuBotao.focus();
      }
    });
  }

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
