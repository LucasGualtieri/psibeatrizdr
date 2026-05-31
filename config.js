/* =========================================================================
   CONFIGURAÇÕES DO SITE — Beatriz Diniz Rodrigues
   -------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar textos e imagens.
   Basta alterar o que está entre as "aspas" e salvar o arquivo.

   • Para trocar uma imagem: coloque o arquivo novo dentro da pasta "images"
     e atualize o caminho aqui (ex.: "images/fotos/hero.jpg").
   • Para trocar um texto: edite o conteúdo entre aspas.
   • Não apague vírgulas, aspas, colchetes [ ] ou chaves { }.
   ========================================================================= */

const SITE_CONFIG = {
  /* ---- Identidade ---- */
  branding: {
    nome: "Beatriz Diniz Rodrigues",
    titulo: "Psicóloga e Psicanalista",
    crp: "CRP 04/84800",
  },

  /* ---- Contato / WhatsApp ----
     "whatsapp" é o link completo. Para mudar o número, troque os dígitos
     depois de "wa.me/". O texto depois de "text=" é a mensagem automática. */
  links: {
    whatsapp:
      "https://wa.me/5531999860727?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.",
    whatsappRotulo: "(31) 99986-0727",
  },

  /* ---- Imagens ----
     Caminhos dos arquivos dentro da pasta "images". */
  imagens: {
    logoCabecalho: "images/marca/logo-cabecalho.png",
    logoRodape: "images/marca/logo-rodape-branco.svg",
    fotoHero: "images/fotos/hero.jpg",
    fotoSobreMim: "images/fotos/sobre-mim.jpg",
    fotoComoAssim: "images/fotos/como-assim.jpg",
    fotoSessoes: "images/fotos/sessoes.jpg",
  },

  /* ---- Títulos das seções ----
     São os nomes que aparecem em destaque em cada seção. */
  titulos: {
    sobreMim: "Sobre mim",
    meuProposito: "Meu propósito",
    comoAssim: "Como assim psicanálise?",
    terapiaParaMim: "Será que fazer terapia é para mim?",
    sobreSessoes: "Sobre as sessões",
    conversaInicial: "Conversa Inicial",
    duvidas: "Dúvidas comuns",
    atendimentos: "Atendimentos",
  },

  /* ---- Textos ---- */
  textos: {
    /* Frase de efeito que aparece sobre a foto principal (topo do site). */
    fraseDeEfeito:
      "A maneira como você narra sua história é a maneira como você escreve o resto dela. Se dê a chance de ouvi-la.",

    /* Lista da seção "Sobre mim" (cada item vira um tópico com marcador). */
    quemSouEuItems: [
      "Psicóloga formada pela PUC Minas | CRP 04/84800",
      "Pós-graduanda em Clínica Psicanalítica na Contemporaneidade pela PUC Minas",
      "Membro do Travessias — Percursos em Psicanálise | @travessias.psicanalise",
      "Diretora de ensino da Liga Acadêmica de Transmissão da Psicanálise Avesso | @avessopsicanalise",
      "Voluntária do Centro de Valorização da Vida | CVV — 188",
    ],

    /* Parágrafos das seções (troque o "Lorem ipsum" pelo texto real depois). */
    meuPropositoTexto:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.",

    comoAssimTexto:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",

    terapiaParaMimTexto:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",

    sobreSessoesTexto:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.",

    conversaInicialTexto:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",

    /* Texto introdutório da seção de dúvidas. */
    duvidasIntro:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",

    /* Perguntas frequentes — cada item abre/fecha ao clicar.
       Para adicionar uma pergunta, copie um bloco { ... } e ajuste. */
    duvidas: [
      {
        pergunta: "bom dia pra vc",
        resposta:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      },
      {
        pergunta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        resposta:
          "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum.",
      },
      {
        pergunta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        resposta:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl.",
      },
      {
        pergunta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        resposta:
          "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.",
      },
      {
        pergunta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        resposta:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      },
    ],

    /* Cards da seção "Atendimentos".
       "icone" aceita: "modalidade", "disponibilidade" ou "publico". */
    atendimentos: [
      {
        icone: "modalidade",
        label: "Modalidade",
        descricao: "Atendimento clínico online e presencial",
      },
      {
        icone: "disponibilidade",
        label: "Disponibilidade",
        descricao: "De segunda à sexta, com horários agendados",
      },
      {
        icone: "publico",
        label: "Público alvo",
        descricao: "Adolescentes, adultos e idosos",
      },
    ],

    /* Bloco de contato e endereço (parte de baixo da seção Atendimentos). */
    contatoHelper: "Agendamento via WhatsApp",
    contatoBotao: "Clique e agende a sua consulta",
    enderecoRotulo: "Endereço",
    endereco:
      "Avenida do Contorno, 6283 — Savassi<br>Belo Horizonte — Minas Gerais",
  },

  /* ---- Mapa (Google Maps) ----
     Para trocar, gere um link "incorporar" no Google Maps e cole aqui. */
  mapa: {
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.621192483923!2d-43.93857132459925!3d-19.940361681450426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699a8f3e8e4fd%3A0xdc0d986323b8d401!2sEdif%C3%ADcio%20Trade%20Center!5e0!3m2!1sen!2sbr!4v1774052574733!5m2!1sen!2sbr",
  },
};
