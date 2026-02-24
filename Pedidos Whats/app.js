// =============================================
// LAVVE — APP.JS
// =============================================

// ---- DADOS INICIAIS ----
const LAVVE_DATA_DEFAULT = {
  produtos: [
    {
      id: 1,
      nome: "Amaciante Bebê",
      categoria: "Amaciante",
      descricao: "Amaciante concentrado com fragrância suave para roupas de bebê. Hipoalergênico, suave na pele e com longa duração.",
      preco: 75.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      ativo: true,
      ordem: 1
    },
    {
      id: 2,
      nome: "Lava Louça Concentrado",
      categoria: "Detergente",
      descricao: "Lava louça ultra-concentrado com poder desgordurante superior. Remove gordura difícil com menos produto.",
      preco: 40.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
      ativo: true,
      ordem: 2
    },
    {
      id: 3,
      nome: "Detergente Multiuso",
      categoria: "Detergente",
      descricao: "Detergente multiuso para superfícies diversas. Ideal para cozinhas, banheiros e áreas de serviço.",
      preco: 55.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      ativo: true,
      ordem: 3
    },
    {
      id: 4,
      nome: "Água Sanitária Premium",
      categoria: "Sanitizante",
      descricao: "Água sanitária de alta concentração para desinfecção profissional. Elimina 99,9% das bactérias e vírus.",
      preco: 35.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1607013407627-6352b4f8c4f4?w=400&q=80",
      ativo: true,
      ordem: 4
    },
    {
      id: 5,
      nome: "Desinfetante Lavanda",
      categoria: "Desinfetante",
      descricao: "Desinfetante com fragrância lavanda para pisos e superfícies. Limpeza profunda com aroma agradável.",
      preco: 48.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      ativo: true,
      ordem: 5
    },
    {
      id: 6,
      nome: "Sabão em Pó Premium",
      categoria: "Sabão",
      descricao: "Sabão em pó de alta performance para lavagem de roupas. Formula enzimática para remover manchas difíceis.",
      preco: 62.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
      ativo: true,
      ordem: 6
    },
    {
      id: 7,
      nome: "Amaciante Concentrado",
      categoria: "Amaciante",
      descricao: "Amaciante concentrado 4x com fragrância floral duradoura. Tecidos macios e perfumados por dias.",
      preco: 68.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      ativo: true,
      ordem: 7
    },
    {
      id: 8,
      nome: "Limpa Vidros",
      categoria: "Limpeza Geral",
      descricao: "Limpa vidros de secagem rápida, sem manchas ou resíduos. Ideal para vidros, espelhos e superfícies lisas.",
      preco: 32.00,
      unidade: "Caixa",
      imagem: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
      ativo: true,
      ordem: 8
    }
  ],
  midias: [],
  usuarios: [
    { id: 1, nome: "Administrador", usuario: "admin", senha: "lavve2024", email: "admin@lavve.com.br", role: "admin", ativo: true }
  ],
  config: {
    whatsapp: "27998376157",
    nome_empresa: "Lavve Produtos de Limpeza",
    email_empresa: "contato@lavve.com.br",
    telefone: "(27) 99837-6157",
    endereco: "Espírito Santo, Brasil",
    instagram: "",
    facebook: "",
    msg_pedido: "Olá! Gostaria de fazer um pedido:"
  }
};

// ---- STORAGE ----
function initData() {
  if (!localStorage.getItem('lavve_data')) {
    localStorage.setItem('lavve_data', JSON.stringify(LAVVE_DATA_DEFAULT));
  }
}

function getData() {
  try {
    const d = localStorage.getItem('lavve_data');
    return d ? JSON.parse(d) : LAVVE_DATA_DEFAULT;
  } catch {
    return LAVVE_DATA_DEFAULT;
  }
}

function saveData(data) {
  localStorage.setItem('lavve_data', JSON.stringify(data));
}

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---- HOME: PRODUTOS DESTAQUE ----
function initProdutosHome() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;

  const data = getData();
  const ativos = data.produtos.filter(p => p.ativo).slice(0, 8);

  grid.innerHTML = ativos.map(p => `
    <div class="produto-card reveal" onclick="window.location='pedidos.html'">
      <div class="produto-img">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x180?text=Produto'" />
        <span class="produto-cat">${p.categoria}</span>
      </div>
      <div class="produto-body">
        <h3>${p.nome}</h3>
        <p>${p.descricao.substring(0, 80)}...</p>
        <div class="produto-footer">
          <div class="produto-preco">
            R$ ${p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
            <span>por ${p.unidade}</span>
          </div>
          <button class="btn-add-mini" title="Adicionar ao carrinho" onclick="event.stopPropagation(); window.location='pedidos.html'">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  observeReveal();
}

// ---- CONTACT FORM ----
function initContactForm() {
  const form = document.getElementById('contatoForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      form.reset();
    }, 3000);
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

// ---- REVEAL ANIMATION ----
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function markReveal() {
  document.querySelectorAll('.diff-card, .feat, .sobre-text, .sobre-imgs').forEach(el => {
    el.classList.add('reveal');
  });
}

// ====================================================
// PEDIDOS PAGE
// ====================================================

let carrinho = [];

function initPedidosPage() {
  const lista = document.getElementById('produtosLista');
  if (!lista) return;

  initData();
  loadCarrinho();
  renderCategorias();
  renderProdutos();
  initSearch();
}

function renderCategorias() {
  const data = getData();
  const cats = [...new Set(data.produtos.filter(p => p.ativo).map(p => p.categoria))];
  const filter = document.getElementById('categoriaFilter');
  if (!filter) return;

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.dataset.cat = cat;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProdutos(cat);
    });
    filter.appendChild(btn);
  });

  filter.querySelector('.cat-btn')?.addEventListener('click', e => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderProdutos('todos');
  });
}

function renderProdutos(filtro = 'todos', busca = '') {
  const data = getData();
  const lista = document.getElementById('produtosLista');
  if (!lista) return;

  let produtos = data.produtos.filter(p => p.ativo);
  if (filtro !== 'todos') produtos = produtos.filter(p => p.categoria === filtro);
  if (busca) produtos = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  if (produtos.length === 0) {
    lista.innerHTML = `<div style="text-align:center;padding:48px;color:#94a3b8;">
      <i class="fas fa-search" style="font-size:40px;display:block;margin-bottom:12px;opacity:0.3;"></i>
      <p style="font-size:15px;font-weight:600;">Nenhum produto encontrado</p>
    </div>`;
    return;
  }

  lista.innerHTML = produtos.map(p => {
    const itemCarrinho = carrinho.find(c => c.id === p.id);
    const qty = itemCarrinho ? itemCarrinho.qty : 0;
    return `
    <div class="produto-item" data-id="${p.id}">
      <div class="produto-item-img">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/80x80?text=IMG'" />
      </div>
      <div class="produto-item-info">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="produto-item-price">
          R$ ${p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          <span>por ${p.unidade}</span>
        </div>
      </div>
      <div class="produto-item-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
          <span class="qty-num" id="qty-${p.id}">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
        </div>
        <button class="btn-add-carrinho ${qty > 0 ? '' : 'no-carrinho'}" onclick="addCarrinho(${p.id})" id="btn-${p.id}">
          <i class="fas fa-cart-plus"></i> ${qty > 0 ? 'No Carrinho' : 'Adicionar'}
        </button>
      </div>
    </div>`;
  }).join('');
}

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const filtro = document.querySelector('.cat-btn.active')?.dataset.cat || 'todos';
    renderProdutos(filtro, input.value);
  });
}

function changeQty(id, delta) {
  const qtyEl = document.getElementById(`qty-${id}`);
  if (!qtyEl) return;
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 0) qty = 0;
  qtyEl.textContent = qty;

  if (qty > 0) {
    addCarrinhoWithQty(id, qty);
  } else {
    removeCarrinho(id);
  }
}

function addCarrinho(id) {
  const qtyEl = document.getElementById(`qty-${id}`);
  const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
  const finalQty = qty > 0 ? qty : 1;
  if (qtyEl) qtyEl.textContent = finalQty;
  addCarrinhoWithQty(id, finalQty);
}

function addCarrinhoWithQty(id, qty) {
  const data = getData();
  const produto = data.produtos.find(p => p.id === id);
  if (!produto) return;

  const idx = carrinho.findIndex(c => c.id === id);
  if (idx >= 0) {
    if (qty === 0) {
      carrinho.splice(idx, 1);
    } else {
      carrinho[idx].qty = qty;
    }
  } else if (qty > 0) {
    carrinho.push({ id, nome: produto.nome, preco: produto.preco, unidade: produto.unidade, qty });
  }

  const btn = document.getElementById(`btn-${id}`);
  if (btn) {
    if (qty > 0) {
      btn.className = 'btn-add-carrinho';
      btn.innerHTML = '<i class="fas fa-check"></i> No Carrinho';
    } else {
      btn.className = 'btn-add-carrinho no-carrinho';
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar';
    }
  }

  saveCarrinho();
  renderCarrinho();
}

function removeCarrinho(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) qtyEl.textContent = '0';
  const btn = document.getElementById(`btn-${id}`);
  if (btn) { btn.className = 'btn-add-carrinho no-carrinho'; btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar'; }
  saveCarrinho();
  renderCarrinho();
}

function renderCarrinho() {
  const empty = document.getElementById('carrinhoEmpty');
  const itens = document.getElementById('carrinhoItens');
  const footer = document.getElementById('carrinhoFooter');
  const count = document.getElementById('carrinhoCount');
  const mobileCount = document.getElementById('mobileCarrinhoCount');
  const totalEl = document.getElementById('carrinhoTotal');

  const total = carrinho.reduce((sum, c) => sum + c.preco * c.qty, 0);
  const qtdTotal = carrinho.reduce((sum, c) => sum + c.qty, 0);

  if (count) count.textContent = qtdTotal;
  if (mobileCount) mobileCount.textContent = qtdTotal;
  if (totalEl) totalEl.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

  if (carrinho.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (itens) itens.style.display = 'none';
    if (footer) footer.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (itens) itens.style.display = 'flex';
  if (footer) footer.style.display = 'block';

  if (itens) {
    itens.innerHTML = carrinho.map(c => `
      <div class="carrinho-item">
        <div>
          <div class="ci-name">${c.nome}</div>
          <div class="ci-details">
            <span class="ci-qty">${c.qty}x ${c.unidade}</span>
            <span class="ci-price">R$ ${(c.preco * c.qty).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
        </div>
        <button class="ci-remove" onclick="removeCarrinho(${c.id})" title="Remover">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }
}

function limparCarrinho() {
  carrinho = [];
  saveCarrinho();
  renderCarrinho();
  renderProdutos(document.querySelector('.cat-btn.active')?.dataset.cat || 'todos');
}

function saveCarrinho() {
  sessionStorage.setItem('lavve_carrinho', JSON.stringify(carrinho));
}

function loadCarrinho() {
  const saved = sessionStorage.getItem('lavve_carrinho');
  if (saved) {
    try { carrinho = JSON.parse(saved); } catch { carrinho = []; }
  }
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Adicione pelo menos um produto ao carrinho!');
    return;
  }

  const nome = document.getElementById('clienteNome')?.value?.trim();
  const tel = document.getElementById('clienteTel')?.value?.trim();

  const data = getData();
  const whatsapp = data.config.whatsapp || '27998376157';
  const msgBase = data.config.msg_pedido || 'Olá! Gostaria de fazer um pedido:';

  let msg = `${msgBase}\n\n`;
  msg += `*Itens do Pedido:*\n`;

  let total = 0;
  carrinho.forEach(c => {
    const subtotal = c.preco * c.qty;
    total += subtotal;
    msg += `• ${c.qty}x ${c.nome} (${c.unidade}) = R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}\n`;
  });

  msg += `\n*Total do Pedido: R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}*\n`;

  if (nome || tel) {
    msg += `\n*Dados do Cliente:*\n`;
    if (nome) msg += `Nome: ${nome}\n`;
    if (tel) msg += `Telefone: ${tel}\n`;
  }

  const url = `https://wa.me/55${whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function toggleCarrinhoMobile() {
  const panel = document.getElementById('carrinhoPanel');
  if (panel) panel.classList.toggle('open');
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initNavbar();
  initSmoothScroll();

  // Home page
  if (document.getElementById('produtosGrid')) {
    markReveal();
    observeReveal();
    initProdutosHome();
    initContactForm();
  }

  // Pedidos page
  if (document.getElementById('produtosLista')) {
    initPedidosPage();
    renderCarrinho();
  }
});
