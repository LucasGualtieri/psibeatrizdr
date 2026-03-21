const SITE_CONFIG = {
  branding: {
    nome: "Beatriz Diniz Rodrigues",
    titulo: "Psicóloga clínica e psicanalista",
    crp: "CRP 04/84800",
  },
  links: {
    whatsapp: "https://wa.me/5531999860727?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.",
    whatsappRotulo: "(31) 99986-0727",
  },
  imagens: {
    dirFotoPerfil: "images/IMG_5566.jpg",
    dirFotoSobre: "images/IMG_5366.jpg",
    dirLogoOpcional: "images/flor.png",
    /**
     * Posição vertical do enquadramento (object-position: center Y%).
     * Valores podem passar de 100 (ex.: 120) — o CSS permite para ajustar o recorte.
     * Limites padrão: heroVerticalMin 0, heroVerticalMax 150 (altere se precisar de mais).
     */
    ajusteFotos: {
      heroVerticalPercentMobile: 40,
      heroVerticalPercentDesktop: 1000,
      heroVerticalMin: 0,
      heroVerticalMax: 1000,
      /** opcional: usado só se mobile/desktop não existirem (retrocompatível) */
      heroVerticalPercent: 50,
      sobreVerticalPercent: 48,
    },
  },
  textos: {
    fraseDeEfeito:
      "A maneira como você narra sua história é a maneira como você escreve o resto dela. Se dê a chance de ouvi-la.",
    heroIntro:
      "Olá! Que bom te ter aqui! Sou a Beatriz.<br>Sou psicóloga clínica e meus atendimentos são feitos à luz da teoria psicanalítica. As sessões são individuais, em ambiente seguro e sigiloso, com duração de aproximadamente 50 minutos e com frequência semanal. Para mais informações, entre em contato comigo agora mesmo através do botão abaixo!",
    quemSouEuItems: [
      "Psicóloga (CRP 04/84800) formada pela PUC Minas",
      "Pós-graduanda em Clínica Psicanalítica na Contemporaneidade pela PUC Minas",
      "Membro do Travessias — Percursos em Psicanálise (@travessias.psicanalise)",
      "Diretora de ensino da Liga Acadêmica de Transmissão da Psicanálise Avesso (@avessopsicanalise)",
      "Voluntária do Centro de Valorização da Vida (CVV – 188)",
    ],
    endereco:
      "Avenida do Contorno, 6283 — Savassi — Belo Horizonte/MG",
    contatoHelper:
      "Atendimento e agendamento pelo WhatsApp",
    contatoModalidade:
      "Atendimento clínico online e presencial",
    contatoDisponibilidade:
      "Segunda à sexta, com horários agendados",
    contatoObservacao:
      "Adolescentes, adultos e idosos",
  },
  mapa: {
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.621192483923!2d-43.93857132459925!3d-19.940361681450426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699a8f3e8e4fd%3A0xdc0d986323b8d401!2sEdif%C3%ADcio%20Trade%20Center!5e0!3m2!1sen!2sbr!4v1774052574733!5m2!1sen!2sbr",
  },
};