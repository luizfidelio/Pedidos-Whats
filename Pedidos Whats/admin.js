// =============================================
// LAVVE — ADMIN.JS
// =============================================

let currentUser = null;
let dragSrcIndex = null;

// ---- AUTH ----
function initLogin() {
  const form = document.getElementById('loginForm');
  const passToggle = document.getElementById('passToggle');
  const passInput = document.getElementById('loginPass');

  passToggle?.addEventListener('click', () => {
    const isText = passInput.type === 'text';
    passInput.type = isText ? 'password' : 'text';
    passToggle.querySelector('i').className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const error = document.getElementById('loginError');

    const data = getData();
    const found = data.usuarios.find(u => u.usuario === user && u.senha === pass && u.ativo);

    if (found) {
      currentUser = found;
      sessionStorage.setItem('lavve_admin_user', JSON.stringify(found));
      showPanel();
    } else {
      error.textContent = 'Usuário ou senha inválidos.';
      setTimeout(() => error.textContent = '', 3000);
    }
  });

  // Check existing session
  const saved = sessionStorage.getItem('lavve_admin_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      showPanel();
    } catch { /* ignore */ }
  }
}

function showPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'flex';
  updateUserUI();
  updateBadges();
  navigateTo('dashboard');
}

function updateUserUI() {
  if (!currentUser) return;
  const initial = currentUser.nome.charAt(0).toUpperCase();
  document.getElementById('sidebarAvatar').textContent = initial;
  document.getElementById('sidebarName').textContent = currentUser.nome;
  document.getElementById('sidebarRole').textContent = currentUser.role === 'admin' ? 'Administrador' : currentUser.role === 'gerente' ? 'Gerente' : 'Operador';
  document.getElementById('topbarAvatar').textContent = initial;
  document.getElementById('topbarName').textContent = currentUser.nome;
}

function initLogout() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('lavve_admin_user');
    currentUser = null;
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
  });
}

// ---- SIDEBAR NAVIGATION ----
function initSidebar() {
  // Nav items
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  // Collapse toggle
  document.getElementById('sidebarCollapse')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const panel = document.getElementById('adminPanel');
    sidebar.classList.toggle('collapsed');
    panel.classList.toggle('sidebar-collapsed');
  });

  // Mobile toggle
  document.getElementById('mobileToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('mobile-open');
  });
}

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  document.getElementById('breadcrumb').textContent = getBreadcrumb(page);

  const content = document.getElementById('pageContent');
  switch (page) {
    case 'dashboard': renderDashboard(content); break;
    case 'midias': renderMidias(content); break;
    case 'produtos': renderProdutos(content); break;
    case 'usuarios': renderUsuarios(content); break;
    case 'configuracoes': renderConfiguracoes(content); break;
  }
}

function getBreadcrumb(page) {
  const map = { dashboard: 'Dashboard', midias: 'Mídias', produtos: 'Produtos', usuarios: 'Usuários', configuracoes: 'Configurações' };
  return map[page] || page;
}

function updateBadges() {
  const data = getData();
  const badge = document.getElementById('badgeProdutos');
  if (badge) badge.textContent = data.produtos.filter(p => p.ativo).length;
}

// =============================================
// DASHBOARD
// =============================================
function renderDashboard(container) {
  const data = getData();
  const prodAtivos = data.produtos.filter(p => p.ativo).length;
  const totalProd = data.produtos.length;
  const totalUsers = data.usuarios.length;
  const totalMidias = (data.midias || []).length;

  container.innerHTML = `
    <div class="dash-kpis">
      <div class="kpi-card">
        <div class="kpi-icon blue"><i class="fas fa-box"></i></div>
        <div class="kpi-info">
          <div class="kpi-value">${totalProd}</div>
          <div class="kpi-label">Produtos Cadastrados</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon green"><i class="fas fa-check-circle"></i></div>
        <div class="kpi-info">
          <div class="kpi-value">${prodAtivos}</div>
          <div class="kpi-label">Produtos Ativos</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon amber"><i class="fas fa-images"></i></div>
        <div class="kpi-info">
          <div class="kpi-value">${totalMidias}</div>
          <div class="kpi-label">Mídias no Banco</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon purple"><i class="fas fa-users"></i></div>
        <div class="kpi-info">
          <div class="kpi-value">${totalUsers}</div>
          <div class="kpi-label">Usuários do Sistema</div>
        </div>
      </div>
    </div>

    <div class="dash-row">
      <div class="dash-card">
        <div class="dash-card-title"><i class="fas fa-box"></i> Produtos Recentes</div>
        ${data.produtos.slice(0, 5).map(p => `
          <div class="produto-row">
            <img class="pr-img" src="${p.imagem}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/42'" />
            <div class="pr-name">${p.nome}</div>
            <div class="pr-price">R$ ${p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
          </div>
        `).join('')}
      </div>
      <div class="dash-card">
        <div class="dash-card-title"><i class="fas fa-cog"></i> Configurações Rápidas</div>
        <div class="produto-row">
          <i class="fab fa-whatsapp" style="color:#25d366;font-size:20px;width:42px;text-align:center;"></i>
          <div class="pr-name">WhatsApp Pedidos</div>
          <div class="pr-price" style="font-size:12px;">${formatPhone(data.config.whatsapp)}</div>
        </div>
        <div class="produto-row">
          <i class="fas fa-building" style="color:var(--primary);font-size:18px;width:42px;text-align:center;"></i>
          <div class="pr-name">Empresa</div>
          <div class="pr-price" style="font-size:12px;">${data.config.nome_empresa}</div>
        </div>
        <div style="margin-top:20px;">
          <button class="btn-action primary" onclick="navigateTo('configuracoes')">
            <i class="fas fa-cog"></i> Ir para Configurações
          </button>
        </div>
      </div>
    </div>
  `;
}

function formatPhone(num) {
  if (!num) return '—';
  const n = num.replace(/\D/g, '');
  if (n.length === 11) return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
  if (n.length === 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6)}`;
  return num;
}

// =============================================
// MÍDIAS
// =============================================
function renderMidias(container) {
  const data = getData();
  const midias = data.midias || [];

  container.innerHTML = `
    <div class="page-actions">
      <h2>Banco de Mídias</h2>
      <div style="display:flex;gap:8px;">
        <button class="btn-action primary" onclick="openUploadMidia()">
          <i class="fas fa-plus"></i> Adicionar Mídia
        </button>
        <button class="btn-action secondary" onclick="openUrlMidia()">
          <i class="fas fa-link"></i> Adicionar URL
        </button>
      </div>
    </div>
    <div class="midias-grid" id="midiasGrid">
      <div class="midia-upload" onclick="openUploadMidia()">
        <i class="fas fa-cloud-upload-alt"></i>
        <span>Upload de Imagem</span>
      </div>
      ${midias.map((m, i) => `
        <div class="midia-card" data-idx="${i}">
          <img class="midia-img" src="${m.url}" alt="${m.nome}" onerror="this.src='https://via.placeholder.com/200x110?text=Erro'" loading="lazy" />
          <div class="midia-info">
            <div class="midia-name" title="${m.nome}">${m.nome}</div>
            <div style="display:flex;gap:6px;margin-top:6px;">
              <button class="act-btn edit" onclick="copiarUrlMidia('${m.url}')" title="Copiar URL" style="width:28px;height:28px;font-size:12px;">
                <i class="fas fa-copy"></i>
              </button>
              <button class="act-btn delete" onclick="deletarMidia(${i})" title="Remover" style="width:28px;height:28px;font-size:12px;">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openUploadMidia() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  input.onchange = e => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const data = getData();
        if (!data.midias) data.midias = [];
        data.midias.push({ url: ev.target.result, nome: file.name });
        saveData(data);
        renderMidias(document.getElementById('pageContent'));
        showToast('Mídia adicionada!', 'success');
      };
      reader.readAsDataURL(file);
    });
  };
  input.click();
}

function openUrlMidia() {
  openModal('Adicionar Imagem por URL', `
    <div class="mform-group">
      <label class="required">URL da Imagem</label>
      <input type="url" id="mUrlInput" placeholder="https://..." />
    </div>
    <div class="mform-group">
      <label>Nome / Descrição</label>
      <input type="text" id="mUrlNome" placeholder="Ex: Produto Amaciante" />
    </div>
    <img id="mUrlPreview" class="img-preview" />
  `, [
    { label: 'Cancelar', action: closeModal, secondary: true },
    { label: 'Adicionar', action: () => {
      const url = document.getElementById('mUrlInput').value.trim();
      const nome = document.getElementById('mUrlNome').value.trim() || 'Imagem';
      if (!url) { showToast('Informe a URL', 'error'); return; }
      const data = getData();
      if (!data.midias) data.midias = [];
      data.midias.push({ url, nome });
      saveData(data);
      closeModal();
      renderMidias(document.getElementById('pageContent'));
      showToast('Imagem adicionada!', 'success');
    }}
  ]);

  // Preview
  setTimeout(() => {
    document.getElementById('mUrlInput')?.addEventListener('input', e => {
      const prev = document.getElementById('mUrlPreview');
      if (prev) { prev.src = e.target.value; prev.classList.add('visible'); }
    });
  }, 100);
}

function copiarUrlMidia(url) {
  navigator.clipboard.writeText(url).then(() => showToast('URL copiada!', 'success'));
}

function deletarMidia(idx) {
  if (!confirm('Remover esta mídia?')) return;
  const data = getData();
  data.midias.splice(idx, 1);
  saveData(data);
  renderMidias(document.getElementById('pageContent'));
  showToast('Mídia removida', 'success');
}

// =============================================
// PRODUTOS
// =============================================
let produtoSort = 'manual';

function renderProdutos(container) {
  const data = getData();
  let produtos = [...data.produtos];

  if (produtoSort === 'alfa') produtos.sort((a, b) => a.nome.localeCompare(b.nome));
  else if (produtoSort === 'preco') produtos.sort((a, b) => a.preco - b.preco);
  else produtos.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

  container.innerHTML = `
    <div class="page-actions">
      <div class="produtos-admin-header">
        <h2>Produtos</h2>
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" id="prodSearch" placeholder="Buscar produto..." oninput="filterProdutosTable(this.value)" />
        </div>
      </div>
      <button class="btn-action primary" onclick="abrirModalProduto()">
        <i class="fas fa-plus"></i> Novo Produto
      </button>
    </div>
    <div class="sort-bar">
      <span>Ordenar:</span>
      <button class="sort-btn ${produtoSort === 'manual' ? 'active' : ''}" onclick="setProdSort('manual')"><i class="fas fa-grip-vertical"></i> Manual</button>
      <button class="sort-btn ${produtoSort === 'alfa' ? 'active' : ''}" onclick="setProdSort('alfa')"><i class="fas fa-sort-alpha-down"></i> A–Z</button>
      <button class="sort-btn ${produtoSort === 'preco' ? 'active' : ''}" onclick="setProdSort('preco')"><i class="fas fa-sort-amount-up"></i> Preço</button>
    </div>
    <div class="produtos-table">
      <div class="ptable-header">
        <div></div>
        <div>Produto</div>
        <div>Categoria</div>
        <div>Preço</div>
        <div>Status</div>
        <div>Ações</div>
      </div>
      <div id="ptableBody">
        ${produtos.map((p, i) => renderProdutoRow(p, i)).join('')}
      </div>
    </div>
  `;

  initDragDrop();
}

function renderProdutoRow(p, i) {
  return `
    <div class="ptable-row" data-id="${p.id}" draggable="true" ondragstart="onDragStart(event,${i})" ondragover="onDragOver(event)" ondrop="onDrop(event,${i})" ondragleave="onDragLeave(event)">
      <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
      <div style="display:flex;align-items:center;gap:12px;">
        <img class="ptrow-img" src="${p.imagem}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/48'" />
        <div class="ptrow-info">
          <h4>${p.nome}</h4>
          <p>${p.descricao.substring(0, 60)}...</p>
        </div>
      </div>
      <div><span class="ptrow-cat">${p.categoria}</span></div>
      <div class="ptrow-price">R$ ${p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br><small style="font-size:10px;color:#94a3b8;font-weight:400;">/${p.unidade}</small></div>
      <div class="ptrow-status">
        <span class="status-badge ${p.ativo ? 'ativo' : 'inativo'}">${p.ativo ? 'Ativo' : 'Inativo'}</span>
      </div>
      <div class="ptrow-actions">
        <button class="act-btn edit" onclick="abrirModalProduto(${p.id})" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="act-btn delete" onclick="toggleProdutoStatus(${p.id})" title="${p.ativo ? 'Desativar' : 'Ativar'}">
          <i class="fas fa-${p.ativo ? 'eye-slash' : 'eye'}"></i>
        </button>
        <button class="act-btn delete" onclick="deletarProduto(${p.id})" title="Excluir"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `;
}

function filterProdutosTable(busca) {
  const data = getData();
  const tbody = document.getElementById('ptableBody');
  if (!tbody) return;
  const b = busca.toLowerCase();
  const filtered = data.produtos.filter(p => p.nome.toLowerCase().includes(b) || p.categoria.toLowerCase().includes(b));
  tbody.innerHTML = filtered.map((p, i) => renderProdutoRow(p, i)).join('');
}

function setProdSort(sort) {
  produtoSort = sort;
  renderProdutos(document.getElementById('pageContent'));
}

// Drag & Drop
function initDragDrop() {}
function onDragStart(e, i) {
  dragSrcIndex = i;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}
function onDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function onDrop(e, targetIdx) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (dragSrcIndex === null || dragSrcIndex === targetIdx) return;
  const data = getData();
  const sorted = [...data.produtos].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  const [moved] = sorted.splice(dragSrcIndex, 1);
  sorted.splice(targetIdx, 0, moved);
  sorted.forEach((p, i) => { p.ordem = i + 1; });
  data.produtos = sorted;
  saveData(data);
  updateBadges();
  renderProdutos(document.getElementById('pageContent'));
  showToast('Ordem atualizada!', 'success');
  dragSrcIndex = null;
}

function abrirModalProduto(id = null) {
  const data = getData();
  const p = id ? data.produtos.find(x => x.id === id) : null;
  const midias = data.midias || [];

  const midiaOptions = midias.length > 0 ? midias.map(m =>
    `<option value="${m.url}" ${p && p.imagem === m.url ? 'selected' : ''}>${m.nome}</option>`
  ).join('') : '';

  openModal(p ? 'Editar Produto' : 'Novo Produto', `
    <div class="mform-row">
      <div class="mform-group">
        <label class="required">Nome do Produto</label>
        <input type="text" id="pNome" value="${p ? p.nome : ''}" placeholder="Ex: Amaciante Bebê" />
      </div>
      <div class="mform-group">
        <label class="required">Categoria</label>
        <input type="text" id="pCategoria" value="${p ? p.categoria : ''}" placeholder="Ex: Amaciante, Detergente..." list="catList" />
        <datalist id="catList">
          ${[...new Set(data.produtos.map(x => x.categoria))].map(c => `<option value="${c}">`).join('')}
        </datalist>
      </div>
    </div>
    <div class="mform-group">
      <label>Descrição do Produto</label>
      <textarea id="pDesc" rows="3" placeholder="Descreva o produto, sua utilidade e diferenciais...">${p ? p.desc || p.descricao || '' : ''}</textarea>
    </div>
    <div class="mform-row">
      <div class="mform-group">
        <label class="required">Preço de Venda (R$)</label>
        <input type="number" id="pPreco" value="${p ? p.preco : ''}" step="0.01" min="0" placeholder="0,00" />
      </div>
      <div class="mform-group">
        <label>Unidade</label>
        <select id="pUnidade">
          <option value="Caixa" ${p && p.unidade === 'Caixa' ? 'selected' : ''}>Caixa</option>
          <option value="Galão" ${p && p.unidade === 'Galão' ? 'selected' : ''}>Galão</option>
          <option value="Fardo" ${p && p.unidade === 'Fardo' ? 'selected' : ''}>Fardo</option>
          <option value="Litro" ${p && p.unidade === 'Litro' ? 'selected' : ''}>Litro</option>
          <option value="Kg" ${p && p.unidade === 'Kg' ? 'selected' : ''}>Kg</option>
          <option value="Unidade" ${p && p.unidade === 'Unidade' ? 'selected' : ''}>Unidade</option>
          <option value="Pacote" ${p && p.unidade === 'Pacote' ? 'selected' : ''}>Pacote</option>
        </select>
      </div>
    </div>
    <div class="mform-group">
      <label>Imagem do Produto</label>
      ${midias.length > 0 ? `
        <select id="pImgSelect" onchange="document.getElementById('pImgUrl').value=this.value;atualizarPreviewProd();">
          <option value="">— Selecionar do banco de mídias —</option>
          ${midiaOptions}
        </select>
        <div style="text-align:center;font-size:12px;color:#94a3b8;margin:6px 0;">ou</div>
      ` : ''}
      <input type="url" id="pImgUrl" value="${p ? p.imagem : ''}" placeholder="https://... (URL da imagem)" oninput="atualizarPreviewProd()" />
      <img id="pImgPreview" class="img-preview ${p && p.imagem ? 'visible' : ''}" src="${p ? p.imagem : ''}" alt="Preview" />
    </div>
    <div class="mform-group">
      <label>Status</label>
      <select id="pAtivo">
        <option value="1" ${!p || p.ativo ? 'selected' : ''}>Ativo — visível na loja</option>
        <option value="0" ${p && !p.ativo ? 'selected' : ''}>Inativo — oculto na loja</option>
      </select>
    </div>
  `, [
    { label: 'Cancelar', action: closeModal, secondary: true },
    { label: p ? 'Salvar Alterações' : 'Criar Produto', action: () => salvarProduto(id) }
  ]);
}

function atualizarPreviewProd() {
  const url = document.getElementById('pImgUrl')?.value;
  const prev = document.getElementById('pImgPreview');
  if (prev) { prev.src = url; prev.classList.toggle('visible', !!url); }
}

function salvarProduto(id) {
  const nome = document.getElementById('pNome')?.value?.trim();
  const categoria = document.getElementById('pCategoria')?.value?.trim();
  const desc = document.getElementById('pDesc')?.value?.trim();
  const preco = parseFloat(document.getElementById('pPreco')?.value);
  const unidade = document.getElementById('pUnidade')?.value;
  const imagem = document.getElementById('pImgUrl')?.value?.trim() || 'https://via.placeholder.com/400x300?text=Produto';
  const ativo = document.getElementById('pAtivo')?.value === '1';

  if (!nome) { showToast('Informe o nome do produto', 'error'); return; }
  if (!categoria) { showToast('Informe a categoria', 'error'); return; }
  if (!preco || isNaN(preco) || preco <= 0) { showToast('Informe o preço de venda', 'error'); return; }

  const data = getData();
  if (id) {
    const idx = data.produtos.findIndex(p => p.id === id);
    if (idx >= 0) {
      data.produtos[idx] = { ...data.produtos[idx], nome, categoria, descricao: desc, preco, unidade, imagem, ativo };
    }
  } else {
    const newId = Math.max(0, ...data.produtos.map(p => p.id)) + 1;
    const ordem = data.produtos.length + 1;
    data.produtos.push({ id: newId, nome, categoria, descricao: desc, preco, unidade, imagem, ativo, ordem });
  }
  saveData(data);
  updateBadges();
  closeModal();
  renderProdutos(document.getElementById('pageContent'));
  showToast(id ? 'Produto atualizado!' : 'Produto criado!', 'success');
}

function toggleProdutoStatus(id) {
  const data = getData();
  const p = data.produtos.find(x => x.id === id);
  if (p) { p.ativo = !p.ativo; saveData(data); updateBadges(); renderProdutos(document.getElementById('pageContent')); showToast(`Produto ${p.ativo ? 'ativado' : 'desativado'}`, 'success'); }
}

function deletarProduto(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;
  const data = getData();
  data.produtos = data.produtos.filter(p => p.id !== id);
  saveData(data);
  updateBadges();
  renderProdutos(document.getElementById('pageContent'));
  showToast('Produto excluído', 'success');
}

// =============================================
// USUÁRIOS
// =============================================
function renderUsuarios(container) {
  const data = getData();

  container.innerHTML = `
    <div class="page-actions">
      <h2>Usuários</h2>
      <button class="btn-action primary" onclick="abrirModalUsuario()">
        <i class="fas fa-plus"></i> Novo Usuário
      </button>
    </div>
    <div class="usuarios-table">
      <div class="utable-header">
        <div></div>
        <div>Usuário</div>
        <div>Perfil</div>
        <div>Status</div>
        <div>Ações</div>
      </div>
      ${data.usuarios.map(u => `
        <div class="utable-row" data-id="${u.id}">
          <div class="urow-avatar">${u.nome.charAt(0).toUpperCase()}</div>
          <div class="urow-info">
            <h4>${u.nome}</h4>
            <p>@${u.usuario} · ${u.email || '—'}</p>
          </div>
          <div><span class="role-badge ${u.role}">${u.role === 'admin' ? 'Administrador' : u.role === 'gerente' ? 'Gerente' : 'Operador'}</span></div>
          <div>
            <span class="status-badge ${u.ativo ? 'ativo' : 'inativo'}">${u.ativo ? 'Ativo' : 'Inativo'}</span>
          </div>
          <div class="urow-actions">
            <button class="act-icon-btn" onclick="toggleUserManager(${u.id})" title="Permissão de Gerente" style="color:${u.role === 'gerente' ? '#7c3aed' : '#94a3b8'}">
              <i class="fas fa-user-shield"></i>
            </button>
            <button class="act-icon-btn" onclick="toggleUserStatus(${u.id})" title="${u.ativo ? 'Desativar' : 'Ativar'}" style="color:${u.ativo ? 'var(--success)' : '#94a3b8'}">
              <i class="fas fa-${u.ativo ? 'toggle-on' : 'toggle-off'}"></i>
            </button>
            <button class="act-icon-btn" onclick="abrirAlterarSenha(${u.id})" title="Alterar Senha" style="color:var(--accent)">
              <i class="fas fa-key"></i>
            </button>
            <button class="act-icon-btn" onclick="deletarUsuario(${u.id})" title="Apagar Usuário" style="color:var(--danger)" ${u.role === 'admin' ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function abrirModalUsuario(id = null) {
  const data = getData();
  const u = id ? data.usuarios.find(x => x.id === id) : null;

  openModal(u ? 'Editar Usuário' : 'Novo Usuário', `
    <div class="mform-row">
      <div class="mform-group">
        <label class="required">Nome Completo</label>
        <input type="text" id="uNome" value="${u ? u.nome : ''}" placeholder="Nome do usuário" />
      </div>
      <div class="mform-group">
        <label class="required">Login</label>
        <input type="text" id="uLogin" value="${u ? u.usuario : ''}" placeholder="nome.usuario" ${u ? 'readonly style="background:#f1f5f9"' : ''} />
      </div>
    </div>
    <div class="mform-group">
      <label>E-mail</label>
      <input type="email" id="uEmail" value="${u ? u.email || '' : ''}" placeholder="email@empresa.com" />
    </div>
    ${!u ? `
    <div class="mform-group">
      <label class="required">Senha</label>
      <input type="password" id="uSenha" placeholder="Crie uma senha" />
    </div>` : ''}
    <div class="mform-group">
      <label>Perfil de Acesso</label>
      <select id="uRole">
        <option value="operador" ${u && u.role === 'operador' ? 'selected' : ''}>Operador — acesso básico</option>
        <option value="gerente" ${u && u.role === 'gerente' ? 'selected' : ''}>Gerente — pode gerenciar usuários</option>
        ${currentUser?.role === 'admin' ? `<option value="admin" ${u && u.role === 'admin' ? 'selected' : ''}>Administrador — acesso total</option>` : ''}
      </select>
    </div>
  `, [
    { label: 'Cancelar', action: closeModal, secondary: true },
    { label: u ? 'Salvar' : 'Criar Usuário', action: () => salvarUsuario(id) }
  ]);
}

function salvarUsuario(id) {
  const nome = document.getElementById('uNome')?.value?.trim();
  const login = document.getElementById('uLogin')?.value?.trim();
  const email = document.getElementById('uEmail')?.value?.trim();
  const senha = document.getElementById('uSenha')?.value;
  const role = document.getElementById('uRole')?.value;

  if (!nome) { showToast('Informe o nome', 'error'); return; }
  if (!id && !login) { showToast('Informe o login', 'error'); return; }
  if (!id && !senha) { showToast('Informe a senha', 'error'); return; }

  const data = getData();
  if (id) {
    const u = data.usuarios.find(x => x.id === id);
    if (u) { u.nome = nome; u.email = email; u.role = role; }
  } else {
    const exists = data.usuarios.find(x => x.usuario === login);
    if (exists) { showToast('Login já existe', 'error'); return; }
    const newId = Math.max(0, ...data.usuarios.map(u => u.id)) + 1;
    data.usuarios.push({ id: newId, nome, usuario: login, email, senha, role, ativo: true });
  }
  saveData(data);
  closeModal();
  renderUsuarios(document.getElementById('pageContent'));
  showToast(id ? 'Usuário atualizado!' : 'Usuário criado!', 'success');
}

function toggleUserManager(id) {
  const data = getData();
  const u = data.usuarios.find(x => x.id === id);
  if (!u || u.role === 'admin') return;
  u.role = u.role === 'gerente' ? 'operador' : 'gerente';
  saveData(data);
  renderUsuarios(document.getElementById('pageContent'));
  showToast(`Perfil alterado para ${u.role}`, 'success');
}

function toggleUserStatus(id) {
  const data = getData();
  const u = data.usuarios.find(x => x.id === id);
  if (!u || u.role === 'admin') return;
  u.ativo = !u.ativo;
  saveData(data);
  renderUsuarios(document.getElementById('pageContent'));
  showToast(`Usuário ${u.ativo ? 'ativado' : 'desativado'}`, 'success');
}

function abrirAlterarSenha(id) {
  openModal('Alterar Senha', `
    <div class="mform-group">
      <label class="required">Nova Senha</label>
      <input type="password" id="novaSenha" placeholder="Digite a nova senha" />
    </div>
    <div class="mform-group">
      <label class="required">Confirmar Senha</label>
      <input type="password" id="confirmarSenha" placeholder="Repita a senha" />
    </div>
  `, [
    { label: 'Cancelar', action: closeModal, secondary: true },
    { label: 'Alterar Senha', action: () => {
      const s1 = document.getElementById('novaSenha')?.value;
      const s2 = document.getElementById('confirmarSenha')?.value;
      if (!s1 || s1.length < 4) { showToast('Senha deve ter ao menos 4 caracteres', 'error'); return; }
      if (s1 !== s2) { showToast('Senhas não coincidem', 'error'); return; }
      const data = getData();
      const u = data.usuarios.find(x => x.id === id);
      if (u) { u.senha = s1; saveData(data); }
      closeModal();
      showToast('Senha alterada com sucesso!', 'success');
    }}
  ]);
}

function deletarUsuario(id) {
  const data = getData();
  const u = data.usuarios.find(x => x.id === id);
  if (!u || u.role === 'admin') { showToast('Não é possível excluir o administrador', 'error'); return; }
  if (!confirm(`Excluir o usuário "${u.nome}"?`)) return;
  data.usuarios = data.usuarios.filter(x => x.id !== id);
  saveData(data);
  renderUsuarios(document.getElementById('pageContent'));
  showToast('Usuário excluído', 'success');
}

// =============================================
// CONFIGURAÇÕES
// =============================================
function renderConfiguracoes(container) {
  const data = getData();
  const c = data.config;

  container.innerHTML = `
    <div class="page-actions">
      <h2>Configurações</h2>
    </div>
    <div class="config-grid">
      <div class="config-card">
        <h3><i class="fab fa-whatsapp"></i> WhatsApp de Pedidos</h3>
        <p class="card-desc">Número que receberá os pedidos enviados pela loja</p>
        <div class="config-form">
          <div class="form-group">
            <label>Número WhatsApp (somente dígitos)</label>
            <input type="tel" id="cfgWhatsapp" value="${c.whatsapp || ''}" placeholder="Ex: 27998376157" />
          </div>
          <div class="form-group">
            <label>Mensagem de Abertura do Pedido</label>
            <textarea id="cfgMsgPedido" rows="3" placeholder="Ex: Olá! Gostaria de fazer um pedido:">${c.msg_pedido || ''}</textarea>
          </div>
          <div class="config-save">
            <button class="btn-action primary" onclick="salvarConfigWhats()">
              <i class="fas fa-save"></i> Salvar WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div class="config-card">
        <h3><i class="fas fa-building"></i> Dados da Empresa</h3>
        <p class="card-desc">Informações exibidas no site e rodapé</p>
        <div class="config-form">
          <div class="form-group">
            <label>Nome da Empresa</label>
            <input type="text" id="cfgNome" value="${c.nome_empresa || ''}" placeholder="Lavve Produtos de Limpeza" />
          </div>
          <div class="form-group">
            <label>E-mail</label>
            <input type="email" id="cfgEmail" value="${c.email_empresa || ''}" placeholder="contato@lavve.com.br" />
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input type="tel" id="cfgTelefone" value="${c.telefone || ''}" placeholder="(27) 99837-6157" />
          </div>
          <div class="form-group">
            <label>Endereço</label>
            <input type="text" id="cfgEndereco" value="${c.endereco || ''}" placeholder="Cidade, Estado" />
          </div>
          <div class="config-save">
            <button class="btn-action primary" onclick="salvarConfigEmpresa()">
              <i class="fas fa-save"></i> Salvar Dados
            </button>
          </div>
        </div>
      </div>

      <div class="config-card">
        <h3><i class="fas fa-share-alt"></i> Redes Sociais</h3>
        <p class="card-desc">Links para as redes sociais da empresa</p>
        <div class="config-form">
          <div class="form-group">
            <label><i class="fab fa-instagram" style="color:#e1306c"></i> Instagram</label>
            <input type="url" id="cfgInstagram" value="${c.instagram || ''}" placeholder="https://instagram.com/lavve" />
          </div>
          <div class="form-group">
            <label><i class="fab fa-facebook" style="color:#1877f2"></i> Facebook</label>
            <input type="url" id="cfgFacebook" value="${c.facebook || ''}" placeholder="https://facebook.com/lavve" />
          </div>
          <div class="config-save">
            <button class="btn-action primary" onclick="salvarConfigRedes()">
              <i class="fas fa-save"></i> Salvar Redes
            </button>
          </div>
        </div>
      </div>

      <div class="config-card">
        <h3><i class="fas fa-shield-alt"></i> Segurança</h3>
        <p class="card-desc">Altere a senha do usuário atual</p>
        <div class="config-form">
          <div class="form-group">
            <label>Senha Atual</label>
            <input type="password" id="cfgSenhaAtual" placeholder="••••••••" />
          </div>
          <div class="form-group">
            <label>Nova Senha</label>
            <input type="password" id="cfgNovaSenha" placeholder="Nova senha" />
          </div>
          <div class="form-group">
            <label>Confirmar Nova Senha</label>
            <input type="password" id="cfgConfirmarSenha" placeholder="Repita a nova senha" />
          </div>
          <div class="config-save">
            <button class="btn-action primary" onclick="alterarSenhaPropria()">
              <i class="fas fa-key"></i> Alterar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function salvarConfigWhats() {
  const data = getData();
  data.config.whatsapp = document.getElementById('cfgWhatsapp')?.value?.trim().replace(/\D/g, '') || data.config.whatsapp;
  data.config.msg_pedido = document.getElementById('cfgMsgPedido')?.value?.trim() || data.config.msg_pedido;
  saveData(data);
  showToast('WhatsApp atualizado!', 'success');
}

function salvarConfigEmpresa() {
  const data = getData();
  data.config.nome_empresa = document.getElementById('cfgNome')?.value?.trim() || data.config.nome_empresa;
  data.config.email_empresa = document.getElementById('cfgEmail')?.value?.trim() || data.config.email_empresa;
  data.config.telefone = document.getElementById('cfgTelefone')?.value?.trim() || data.config.telefone;
  data.config.endereco = document.getElementById('cfgEndereco')?.value?.trim() || data.config.endereco;
  saveData(data);
  showToast('Dados da empresa salvos!', 'success');
}

function salvarConfigRedes() {
  const data = getData();
  data.config.instagram = document.getElementById('cfgInstagram')?.value?.trim();
  data.config.facebook = document.getElementById('cfgFacebook')?.value?.trim();
  saveData(data);
  showToast('Redes sociais salvas!', 'success');
}

function alterarSenhaPropria() {
  const atual = document.getElementById('cfgSenhaAtual')?.value;
  const nova = document.getElementById('cfgNovaSenha')?.value;
  const conf = document.getElementById('cfgConfirmarSenha')?.value;
  if (!currentUser) return;
  if (atual !== currentUser.senha) { showToast('Senha atual incorreta', 'error'); return; }
  if (!nova || nova.length < 4) { showToast('Nova senha deve ter ao menos 4 caracteres', 'error'); return; }
  if (nova !== conf) { showToast('Senhas não coincidem', 'error'); return; }
  const data = getData();
  const u = data.usuarios.find(x => x.id === currentUser.id);
  if (u) { u.senha = nova; currentUser.senha = nova; saveData(data); sessionStorage.setItem('lavve_admin_user', JSON.stringify(currentUser)); }
  showToast('Senha alterada com sucesso!', 'success');
  document.getElementById('cfgSenhaAtual').value = '';
  document.getElementById('cfgNovaSenha').value = '';
  document.getElementById('cfgConfirmarSenha').value = '';
}

// =============================================
// MODAL GENÉRICO
// =============================================
function openModal(title, bodyHtml, buttons = []) {
  document.getElementById('adminModalTitle').textContent = title;
  document.getElementById('adminModalBody').innerHTML = bodyHtml;

  const footer = document.getElementById('adminModalFooter');
  footer.innerHTML = buttons.map(btn => `
    <button class="btn-action ${btn.secondary ? 'secondary' : 'primary'}" id="modalBtn_${btn.label.replace(/\s/g, '_')}">${btn.label}</button>
  `).join('');

  buttons.forEach(btn => {
    const el = document.getElementById(`modalBtn_${btn.label.replace(/\s/g, '_')}`);
    if (el && btn.action) el.addEventListener('click', btn.action);
  });

  document.getElementById('adminModalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('adminModalOverlay').classList.remove('open');
}

// =============================================
// TOAST
// =============================================
function showToast(msg, type = 'default') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(8px)'; setTimeout(() => toast.remove(), 300); }, 2800);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initLogin();
  initLogout();
  initSidebar();

  document.getElementById('adminModalClose')?.addEventListener('click', closeModal);
  document.getElementById('adminModalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
});
