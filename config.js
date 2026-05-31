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
    conversaInicial: `"Depois do medo, vem o mundo"`,
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
    `Meu consultório existe para ser um lugar em que as pessoas possam se refugiar de seu cotidiano acelerado e focado em demandas externas, para que elas possam se dedicar às demandas do seu próprio Eu.
O que me fez estar nessa situação? O que será que, no fundo, eu estou procurando? O que significa pra mim levar a vida da forma que levo? O que eu faço com o que fizeram de mim?
São perguntas muito comuns e que raramente temos tempo ou as ferramentas necessárias para respondê-las sozinhos. Tentamos encontrar as coordenadas dessas respostas sem vez alguma olhar verdadeiramente para o mapa. Falar de si é uma travessia, uma navegação e, porque não, uma aventura pelos mares e rochas que estruturam seu ser. Essas terras tão familiares e, ao mesmo tempo, tão estrangeiras, são as que podem clarear a fonte de seus sofrimentos e potências mais genuínas.
Uma grande empatia e vívida curiosidade, me fizeram ser profundamente interessada na singularidade das histórias humanas, suas belezas, rachaduras e entrelinhas. Dentro do consultório eu escuto, o outro fala e, como fruto disso, algo acontece. Acredito que cada um merece ser ouvido, acolhido, compreendido e respeitado, que tenha um espaço em que possa direcionar suas angústias e pensamentos mais íntimos. Quando tais necessidades não são supridas, o terreno é fértil para o aparecimento da maior epidemia do nosso século: a solidão, e os adoecimentos que a acompanham.
Quando um sujeito se cala, ele abdica do seu maior poder e instrumento de transformação. A fala detém uma força comumente subestimada, mas quando devidamente direcionada é capaz de nos devolver a agência sobre nossas próprias vidas. 
O que mais desejo é que meus pacientes se enxerguem não apenas como personagens da própria história, mas também como autores. E que essa seja uma narrativa, acima de tudo, viva, interessante e profundamente humana.
`,

    comoAssimTexto:
     `A psicanálise é uma abordagem da psicologia, ou seja, é uma teoria sobre a mente humana com sua singular maneira de explicar porque somos como somos. O método se baseia na ideia de que tem algo dentro de cada um de nós do qual não temos muito controle ou conhecimento sobre, e é justamente essa parte que pode ser responsável por certas peças da sua história que parecem nunca se encaixar. Esse é o Inconsciente, e a minha aposta é que, ao ser ouvido com delicadeza, ele poderá explicar as motivações por trás dos comportamentos, relações, falas, desejos, traumas, medos e sonhos das pessoas. Como psicanalista, meu papel é ser uma companheira desta travessia. Estou interessada no que você tem a dizer, mas não apenas isso, me interesso pela forma como você diz e também naquilo que não percebe que diz.
Além disso, a psicanálise é uma abordagem que não acredita em “consertar” os sujeitos, ou torná-los adaptados para um determinado papel social que não tem compromisso com sua saúde íntegra. Ela defende a subjetividade que, resumidamente, significa ser quem se é de forma genuína, reconhecendo seus limites, desejos e singularidades.
`,

    terapiaParaMimTexto:
      "Iniciar um processo terapêutico é uma decisão que exige reflexão e coragem, você ter chegado até aqui já é o primeiro passo. Um percurso de análise pode ter tantos objetivos e ganhos quanto sujeitos que o procuram, já que cada indivíduo chega ao consultório com uma ideia do que é terapia e uma expectativa única sobre o processo. Não é preciso ter um motivo definido para começar. Se você já conversou com alguém sobre uma experiência de vida ou se você tem uma coisa ou duas para falar sobre si, já tem tudo o que precisa para começar. A terapia é sim indicada para todos aqueles que percebem sua curiosidade capturada por ela.",

    sobreSessoesTexto:
      "Trabalho com sessões de aproximadamente 50 minutos, na frequência semanal. Existe a possibilidade de ser feito na modalidade online pela plataforma do google meet, ou presencialmente no meu consultório em Belo Horizonte. Tudo que for dito em sessão estará resguardado sobre sigilo, como previsto no código de ética da profissão. A primeira consulta é uma conversa aberta na qual você irá falar sobre o motivo que te trouxe até o consultório, e ao final serão esclarecidas quaisquer dúvidas sobre a psicoterapia e orientações gerais. Agende já pelo link!",

    conversaInicialTexto:
      `- Clarice Lispector`,

    /* Texto introdutório da seção de dúvidas. */
    duvidasIntro:
      "",

    /* Perguntas frequentes — cada item abre/fecha ao clicar.
       Para adicionar uma pergunta, copie um bloco { ... } e ajuste. */
    duvidas: [
      {
        pergunta: "Quanto tempo dura o tratamento?",
        resposta:
          "Não é possível estipular o número de sessões necessárias para todos os casos. A entrada e saída da psicoterapia pode ser feita a qualquer momento, mas essa decisão deve ser tomada junto com a profissional após uma análise ética e cuidadosa.",
      },
      {
        pergunta: "Qual o valor da sessão?",
        resposta:
          "O valor será combinado comigo na primeira sessão. Ele levará em conta uma média condizente com os custos e com o mercado atual, bem como as possibilidades de cada caso.",
      },
      {
        pergunta: "Atende qual faixa etária?",
        resposta:
          "Atualmente meu público alvo é composto por adolescentes, adultos e idosos.",
      },
      {
        pergunta: "Atende por convênio?",
        resposta:
          "No momento não atendo por nenhum convênio, apenas consultas particulares, mas forneço recibos que podem ser reembolsados em alguns casos. Consulte seu plano de saúde.",
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
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.617612197697!2d-43.93854152593525!3d-19.940512438633625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699cd41f21ef1%3A0xf74ec517fc4bcee5!2sPsic%C3%B3loga%20Cl%C3%ADnica%20-%20Beatriz%20Diniz%20Rodrigues!5e0!3m2!1spt-BR!2sbr!4v1780255967984!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
       ,
  },
};
