// =============================================
// VILA VIX VIAGENS - APP.JS
// =============================================

// ---- DATA ----
const SITE_DATA = {
  pacotes: [
    {
      id: 1,
      nome: "Tour Sierra Nevada",
      destino: "Califórnia, EUA",
      duracao: "5D / 4N",
      preco: 8990,
      rating: 4.7,
      categoria: "aventura",
      descricao: "Explore as majestosas montanhas da Serra Nevada com trilhas deslumbrantes, paisagens de tirar o fôlego e hospedagem em cabanas de charme.",
      imagem: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      incluso: ["Voos ida e volta", "4 noites hospedagem", "Guia especializado", "Refeições inclusas", "Seguro viagem", "Transfers"],
      destaque: true
    },
    {
      id: 2,
      nome: "Jantar Romântico em Paris",
      destino: "Paris, França",
      duracao: "5D / 4N",
      preco: 12500,
      rating: 4.9,
      categoria: "romance",
      descricao: "Viva o romance eterno de Paris com jantar exclusivo na Torre Eiffel, passeios ao longo do Sena e hotéis boutique de luxo.",
      imagem: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
      incluso: ["Voos ida e volta", "4 noites hotel 5★", "Jantar Torre Eiffel", "Passeio de barco", "Seguro viagem", "Transfers"],
      destaque: true
    },
    {
      id: 3,
      nome: "Cultura e Tradição Japonesa",
      destino: "Tóquio e Kyoto, Japão",
      duracao: "8D / 7N",
      preco: 18900,
      rating: 4.8,
      categoria: "internacional",
      descricao: "Mergulhe na fascinante cultura japonesa, dos templos milenares de Kyoto às luzes futuristas de Tóquio, com cerimônias do chá e culinária autêntica.",
      imagem: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      incluso: ["Voos ida e volta", "7 noites hospedagem", "JR Pass 7 dias", "Guia bilíngue", "Cerimônia do chá", "Seguro viagem"],
      destaque: true
    },
    {
      id: 4,
      nome: "Concert Tour Europa",
      destino: "Praga, República Tcheca",
      duracao: "5D / 4N",
      preco: 9800,
      rating: 4.7,
      categoria: "internacional",
      descricao: "Uma experiência cultural única em Praga, com concertos clássicos em salões históricos e tours pelos castelos e arquitetura medieval.",
      imagem: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
      incluso: ["Voos ida e volta", "4 noites hotel", "Ingresso concerto", "City tour", "Seguro viagem", "Transfers"],
      destaque: false
    },
    {
      id: 5,
      nome: "Trilhas e Natureza",
      destino: "Patagônia, Chile/Argentina",
      duracao: "7D / 6N",
      preco: 14500,
      rating: 4.8,
      categoria: "aventura",
      descricao: "Aventure-se pelas paisagens mais selvagens do mundo na Patagônia, com trekkings, glaciares e a beleza única do fim do mundo.",
      imagem: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      incluso: ["Voos ida e volta", "6 noites lodges", "Equipamentos de trilha", "Guia especializado", "Seguro viagem", "Refeições"],
      destaque: false
    },
    {
      id: 6,
      nome: "Paraíso em Bali",
      destino: "Bali, Indonésia",
      duracao: "8D / 7N",
      preco: 11200,
      rating: 4.9,
      categoria: "romance",
      descricao: "Descubra o paraíso tropical de Bali com praias de areia branca, templos místicos, campos de arroz em terraços e spas de luxo.",
      imagem: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      incluso: ["Voos ida e volta", "7 noites resort", "Spa day exclusivo", "Tour templos", "Seguro viagem", "Transfers"],
      destaque: true
    },
    {
      id: 7,
      nome: "Aurora Boreal na Islândia",
      destino: "Reykjavik, Islândia",
      duracao: "6D / 5N",
      preco: 16800,
      rating: 4.9,
      categoria: "aventura",
      descricao: "Testemunhe o fenômeno mais mágico da natureza — a aurora boreal — em expedição noturna com guias especializados na deslumbrante Islândia.",
      imagem: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80",
      incluso: ["Voos ida e volta", "5 noites hotel", "Excursão aurora boreal", "Lagoa Azul", "Geisers", "Seguro viagem"],
      destaque: true
    },
    {
      id: 8,
      nome: "Lua de Mel em Santorini",
      destino: "Santorini, Grécia",
      duracao: "7D / 6N",
      preco: 22000,
      rating: 5.0,
      categoria: "luxo",
      descricao: "O roteiro dos sonhos para casais em Santorini, com vila de luxo com vista para o pôr do sol, jantar à beira do vulcão e cruzeiro privativo.",
      imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      incluso: ["Voos business class", "6 noites villa luxo", "Cruzeiro privativo", "Jantares românticos", "Spa exclusivo", "Seguro viagem"],
      destaque: true
    },
    {
      id: 9,
      nome: "Safari na África do Sul",
      destino: "Kruger Park, África do Sul",
      duracao: "8D / 7N",
      preco: 19500,
      rating: 4.8,
      categoria: "aventura",
      descricao: "Uma experiência única de safari com os Big 5 no Parque Kruger, com hospedagem em lodges de luxo e guias ranger especializados.",
      imagem: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      incluso: ["Voos ida e volta", "7 noites lodge luxo", "Safaris 2x/dia", "Guia ranger", "Refeições inclusas", "Seguro viagem"],
      destaque: false
    }
  ],
  depoimentos: [
    {
      texto: "A Vila Vix transformou completamente nossa lua de mel! Cada detalhe foi cuidado com tanto carinho e profissionalismo. Santorini foi literalmente o sonho que sempre imaginei. Já estamos planejando a próxima viagem com eles!",
      nome: "Ana e Carlos Mendes",
      cargo: "Clientes — Lua de Mel em Santorini",
      avatar: "https://i.pravatar.cc/100?img=47",
      estrelas: 5
    },
    {
      texto: "Serviço impecável do início ao fim. A equipe da Vila Vix foi extremamente atenciosa, respondeu todas as minhas dúvidas e organizou um roteiro personalizado perfeito para o Japão. Uma experiência inesquecível!",
      nome: "Rodrigo Almeida",
      cargo: "Cliente — Japan Culture Tour",
      avatar: "https://i.pravatar.cc/100?img=11",
      estrelas: 5
    },
    {
      texto: "Já viajei com outras agências mas nenhuma teve o nível de atenção e cuidado da Vila Vix. O pacote para Bali foi extraordinário — praias, cultura, gastronomia. Tudo além das expectativas!",
      nome: "Fernanda Costa",
      cargo: "Cliente — Paraíso em Bali",
      avatar: "https://i.pravatar.cc/100?img=45",
      estrelas: 5
    },
    {
      texto: "A aurora boreal na Islândia foi uma das experiências mais marcantes da minha vida. A Vila Vix cuidou de absolutamente tudo, desde o voo até as excursões noturnas. Recomendo de olhos fechados!",
      nome: "Marcos Ferreira",
      cargo: "Cliente — Aurora Boreal na Islândia",
      avatar: "https://i.pravatar.cc/100?img=33",
      estrelas: 5
    },
    {
      texto: "Viagem corporativa organizada com perfeição. Todos os executivos ficaram satisfeitos com o hotel, transfers e reuniões. A Vila Vix é nossa parceira oficial de viagens corporativas!",
      nome: "Patricia Souza",
      cargo: "Diretora de RH — Empresa Cliente",
      avatar: "https://i.pravatar.cc/100?img=48",
      estrelas: 5
    }
  ]
};

// Salvar dados no localStorage se não existir
function initData() {
  const stored = localStorage.getItem('vilavix_data');
  if (!stored) {
    localStorage.setItem('vilavix_data', JSON.stringify(SITE_DATA));
  }
}

function getData() {
  const stored = localStorage.getItem('vilavix_data');
  return stored ? JSON.parse(stored) : SITE_DATA;
}

// ---- HERO SLIDER ----
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.hero-slide').length;

function initHeroSlider() {
  const dots = document.getElementById('heroDots');
  if (!dots) return;

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  }

  document.querySelector('.hero-prev')?.addEventListener('click', () => changeSlide(-1));
  document.querySelector('.hero-next')?.addEventListener('click', () => changeSlide(1));

  // Auto play
  setInterval(() => changeSlide(1), 6000);
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ---- STATS COUNTER ----
function initStats() {
  const nums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current).toLocaleString('pt-BR');
  }, 25);
}

// ---- PACOTES ----
function initPacotes() {
  const grid = document.getElementById('pacotesGrid');
  if (!grid) return;

  const data = getData();
  renderPacotes(data.pacotes, 'all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderPacotes(data.pacotes, filter);
    });
  });
}

function renderPacotes(pacotes, filter) {
  const grid = document.getElementById('pacotesGrid');
  const filtered = filter === 'all' ? pacotes : pacotes.filter(p => p.categoria === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="pacote-card reveal" onclick="openModal(${p.id})">
      <div class="pacote-img">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy" />
        <span class="pacote-badge ${p.categoria}">${p.categoria}</span>
        <span class="pacote-rating">
          <i class="fas fa-star"></i> ${p.rating}
        </span>
      </div>
      <div class="pacote-info">
        <p class="pacote-location">
          <i class="fas fa-map-marker-alt"></i> ${p.destino}
        </p>
        <h3>${p.nome}</h3>
        <p>${p.descricao.substring(0, 110)}...</p>
        <div class="pacote-footer">
          <span class="pacote-duration">
            <i class="far fa-clock"></i> ${p.duracao}
          </span>
          <div class="pacote-price">
            <strong>R$ ${p.preco.toLocaleString('pt-BR')}</strong>
            <span>por pessoa</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe reveal elements
  observeReveal();
}

// ---- MODAL ----
function openModal(id) {
  const data = getData();
  const p = data.pacotes.find(x => x.id === id);
  if (!p) return;

  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-img">
      <img src="${p.imagem}" alt="${p.nome}" />
    </div>
    <div class="modal-body">
      <p class="pacote-badge ${p.categoria}" style="display:inline-flex;margin-bottom:12px;">${p.categoria}</p>
      <h2>${p.nome}</h2>
      <p class="modal-location"><i class="fas fa-map-marker-alt"></i> ${p.destino} &bull; <i class="far fa-clock"></i> ${p.duracao}</p>
      <p class="modal-desc">${p.descricao}</p>
      <div class="modal-includes">
        <h4><i class="fas fa-check-circle"></i> O que está incluso</h4>
        <ul>
          ${p.incluso.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-footer">
        <div class="modal-price">
          <strong>R$ ${p.preco.toLocaleString('pt-BR')}</strong>
          <span>por pessoa</span>
        </div>
        <a href="#contato" class="btn btn-primary" onclick="closeModal()">
          <i class="fas fa-paper-plane"></i> Solicitar Orçamento
        </a>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---- DEPOIMENTOS SLIDER ----
let depoIndex = 0;
let depoTotal = 0;

function initDepoimentos() {
  const track = document.getElementById('depoTrack');
  const dotsEl = document.getElementById('depoDots');
  if (!track) return;

  const data = getData();
  const depos = data.depoimentos;
  depoTotal = depos.length;

  track.innerHTML = depos.map(d => `
    <div class="depo-card">
      <div class="depo-stars">${'★'.repeat(d.estrelas)}</div>
      <p class="depo-text">"${d.texto}"</p>
      <div class="depo-author">
        <img class="depo-avatar" src="${d.avatar}" alt="${d.nome}" loading="lazy" />
        <div>
          <p class="depo-name">${d.nome}</p>
          <p class="depo-role">${d.cargo}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Dots
  dotsEl.innerHTML = depos.map((_, i) => `
    <button class="depo-dot ${i === 0 ? 'active' : ''}" onclick="goToDepo(${i})"></button>
  `).join('');

  document.querySelector('.depo-prev')?.addEventListener('click', () => changeDepo(-1));
  document.querySelector('.depo-next')?.addEventListener('click', () => changeDepo(1));

  // Auto
  setInterval(() => changeDepo(1), 5000);

  // Responsive: adjust visible cards
  updateDepoSlider();
  window.addEventListener('resize', updateDepoSlider);
}

function getDepoVisible() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateDepoSlider() {
  const visible = getDepoVisible();
  const track = document.getElementById('depoTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.depo-card');
  const cardWidth = (100 / visible);
  cards.forEach(c => {
    c.style.minWidth = `calc(${cardWidth}% - 16px)`;
  });
}

function changeDepo(dir) {
  const visible = getDepoVisible();
  const maxIndex = Math.max(0, depoTotal - visible);
  depoIndex = Math.min(Math.max(depoIndex + dir, 0), maxIndex);
  goToDepo(depoIndex);
}

function goToDepo(index) {
  const visible = getDepoVisible();
  const maxIndex = Math.max(0, depoTotal - visible);
  depoIndex = Math.min(Math.max(index, 0), maxIndex);

  const track = document.getElementById('depoTrack');
  if (!track) return;

  const cardWidth = (100 / visible) + (16 / visible);
  track.style.transform = `translateX(-${depoIndex * cardWidth}%)`;

  document.querySelectorAll('.depo-dot').forEach((d, i) => {
    d.classList.toggle('active', i === depoIndex);
  });
}

// ---- REVEAL ON SCROLL ----
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ---- CONTACT FORM ----
function initContactForm() {
  const form = document.getElementById('contatoForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ---- MARK REVEAL ELEMENTS ----
function markRevealElements() {
  const selectors = [
    '.valor-card', '.servico-card', '.sobre-text', '.sobre-images',
    '.contato-info', '.contato-form-wrap', '.destino-card'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });
}

// ---- SMOOTH SCROLL ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initNavbar();
  initHeroSlider();
  initStats();
  markRevealElements();
  observeReveal();
  initPacotes();
  initModal();
  initDepoimentos();
  initContactForm();
  initSmoothScroll();
});
