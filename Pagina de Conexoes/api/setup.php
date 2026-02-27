<?php
// ──────────────────────────────────────────────────────────────
//  Central de Conexões — Setup (execute 1 vez em produção)
//  Acesse: https://seudominio.com/api/setup.php
//  IMPORTANTE: Delete este arquivo do servidor após executar!
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');

$log = [];
function log_ok(string $msg) { global $log; $log[] = "✅ $msg"; }
function log_info(string $msg) { global $log; $log[] = "ℹ️  $msg"; }

try {
    $pdo = db();

    // ── 1. Criar tabelas ──────────────────────────────────────

    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id            INT PRIMARY KEY AUTO_INCREMENT,
        username      VARCHAR(50)  UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name          VARCHAR(100) NOT NULL,
        role          ENUM('admin','editor') DEFAULT 'editor',
        active        TINYINT(1)   DEFAULT 1,
        created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    log_ok("Tabela 'users' criada/verificada");

    $pdo->exec("CREATE TABLE IF NOT EXISTS hub_nodes (
        id            INT PRIMARY KEY AUTO_INCREMENT,
        title         VARCHAR(100) NOT NULL,
        url           VARCHAR(500) NOT NULL,
        icon_url      VARCHAR(500) DEFAULT NULL,
        fallback_bg   VARCHAR(20)  DEFAULT '#AC3A40',
        fallback_text VARCHAR(10)  DEFAULT NULL,
        target_blank  TINYINT(1)   DEFAULT 1,
        active        TINYINT(1)   DEFAULT 1,
        sort_order    INT          DEFAULT 0,
        created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    log_ok("Tabela 'hub_nodes' criada/verificada");

    $pdo->exec("CREATE TABLE IF NOT EXISTS adm_columns (
        id         INT PRIMARY KEY AUTO_INCREMENT,
        title      VARCHAR(100) NOT NULL,
        subtitle   VARCHAR(100) DEFAULT NULL,
        active     TINYINT(1)   DEFAULT 1,
        sort_order INT          DEFAULT 0,
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    log_ok("Tabela 'adm_columns' criada/verificada");

    $pdo->exec("CREATE TABLE IF NOT EXISTS adm_cards (
        id                INT PRIMARY KEY AUTO_INCREMENT,
        column_id         INT NOT NULL,
        name              VARCHAR(100) NOT NULL,
        tag               VARCHAR(100) DEFAULT NULL,
        favicon_domain    VARCHAR(200) DEFAULT NULL,
        fallback_initials VARCHAR(5)   DEFAULT NULL,
        active            TINYINT(1)   DEFAULT 1,
        sort_order        INT          DEFAULT 0,
        FOREIGN KEY (column_id) REFERENCES adm_columns(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    log_ok("Tabela 'adm_cards' criada/verificada");

    $pdo->exec("CREATE TABLE IF NOT EXISTS adm_links (
        id         INT PRIMARY KEY AUTO_INCREMENT,
        card_id    INT NOT NULL,
        label      VARCHAR(100) NOT NULL,
        url        VARCHAR(1000) NOT NULL,
        sort_order INT DEFAULT 0,
        FOREIGN KEY (card_id) REFERENCES adm_cards(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    log_ok("Tabela 'adm_links' criada/verificada");

    // ── 2. Seeder: Usuário admin ──────────────────────────────

    $adminExists = $pdo->query("SELECT COUNT(*) FROM users WHERE username='admin'")->fetchColumn();
    if (!$adminExists) {
        $hash = password_hash('Admin@123', PASSWORD_DEFAULT);
        $pdo->prepare("INSERT INTO users (username,password_hash,name,role) VALUES (?,?,?,?)")
            ->execute(['admin', $hash, 'Administrador', 'admin']);
        log_ok("Usuário admin criado — login: admin / senha: Admin\@123");
    } else {
        log_info("Usuário admin já existe — pulando");
    }

    // ── 3. Seeder: Nós do Hub ─────────────────────────────────

    $nodesExist = $pdo->query("SELECT COUNT(*) FROM hub_nodes")->fetchColumn();
    if (!$nodesExist) {
        $nodes = [
            [1, 'Sistema Netecia', 'https://app.netecia.com.br/sistema/', 'https://app.netecia.com.br/sistema/favicon.ico',  '#AC3A40', 'SN',  1],
            [2, 'Torge',           'https://app.torge.com.br/#/',          'https://app.torge.com.br/images/LogoTorgeBranco.png','#0D47A1','T',  1],
            [3, 'Zweb',            'https://zweb.com.br/#/sign-in',         'https://zweb.com.br/media/dark/images/zweb-horizontal.png','#1565C0','Z', 1],
            [4, 'GDoor Web',       'https://app.gdoorweb.com.br/login',     'https://app.gdoorweb.com.br/favicon.ico',             '#2E7D32','GW', 1],
            [5, 'Site Net e Cia',  'Site/index.html',                       'https://www.google.com/s2/favicons?domain=netecia.com.br&sz=64','#710606','SITE',0],
        ];
        $stmt = $pdo->prepare("INSERT INTO hub_nodes (sort_order,title,url,icon_url,fallback_bg,fallback_text,target_blank) VALUES (?,?,?,?,?,?,?)");
        foreach ($nodes as $n) $stmt->execute($n);
        log_ok("5 nós do hub inseridos");
    } else {
        log_info("hub_nodes já populado — pulando");
    }

    // ── 4. Seeder: Colunas, Cards e Links do CentralAdm ──────

    $colsExist = $pdo->query("SELECT COUNT(*) FROM adm_columns")->fetchColumn();
    if (!$colsExist) {
        $insertCol  = $pdo->prepare("INSERT INTO adm_columns (sort_order,title,subtitle) VALUES (?,?,?)");
        $insertCard = $pdo->prepare("INSERT INTO adm_cards (column_id,sort_order,name,tag,favicon_domain,fallback_initials) VALUES (?,?,?,?,?,?)");
        $insertLink = $pdo->prepare("INSERT INTO adm_links (card_id,sort_order,label,url) VALUES (?,?,?,?)");

        // ──── Coluna 1: Gestão de Sistemas ────
        $insertCol->execute([1, 'Gestão de Sistemas', 'Área Administrativa']);
        $col1 = $pdo->lastInsertId();

        $insertCard->execute([$col1, 1, 'SGBR',   'Sistemas',       'sgbr.com.br',              'SG']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Acesso Restrito — Login', 'https://acessorestrito.sgbr.com.br/login']);

        $insertCard->execute([$col1, 2, 'Torge',  'Revenda',        'torge.com.br',              'T']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Revenda — Login', 'https://revenda.torge.com.br/#/Login']);

        $insertCard->execute([$col1, 3, 'Zweb',   'Sistemas',       'zweb.com.br',               'Z']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Zweb — Sign In', 'https://zweb.com.br/#/sign-in']);

        $insertCard->execute([$col1, 4, 'Gdoor',  'Painel',         'gdoor.com.br',              'GD']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Painel — Login', 'https://painel.gdoor.com.br/rev/login']);

        $insertCard->execute([$col1, 5, 'Avante', 'Gestão & Suporte', 'avantecontrole.com.br',   'AV']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Gestão — Login',       'https://avantegestao.avantecontrole.com.br/gestaofacil/login/Index']);
        $insertLink->execute([$c, 2, 'Movidesk — Suporte',   'https://avanteempresas.movidesk.com/']);
        $insertLink->execute([$c, 3, 'Academy — Login',      'https://academy.avantejuntos.com.br/users/sign_in']);

        log_ok("Coluna 1 (Gestão de Sistemas) — 5 cards inseridos");

        // ──── Coluna 2: Gestão Telefonia ────
        $insertCol->execute([2, 'Gestão Telefonia', 'Infraestrutura']);
        $col2 = $pdo->lastInsertId();

        $insertCard->execute([$col2, 1, 'Issabel',   'PABX / VoIP',      'issabel.com',           'IS']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'sip.netecia.com.br', 'https://sip.netecia.com.br']);

        $insertCard->execute([$col2, 2, 'Issabel 2', 'PABX / VoIP',      'issabel.com',           'IS2']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'sipd.netecia.com.br', 'https://sipd.netecia.com.br']);

        $insertCard->execute([$col2, 3, 'Diskfree',  'Telefonia',        'diskfree.com.br',       'DF']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Diskfree — Login', 'https://sip.diskfree.com.br/security/login']);

        $insertCard->execute([$col2, 4, 'Gt Group',  'Telefonia',        'gtgi.com.br',           'GT']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Gt Group — Login',   'https://gtgi.com.br/login']);
        $insertLink->execute([$c, 2, '0800 042 4242',      'tel:08000424242']);
        $insertLink->execute([$c, 3, 'suporte@gtgi.com.br','mailto:suporte@gtgi.com.br']);

        $insertCard->execute([$col2, 5, 'BR DID',    'Numeração / DID',  'brdid.com.br',          'BR']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'BR DID — Login', 'https://brdid.com.br/br-did/wp-login.php?redirect_to=%2Fbr-did%2Fdids%2F']);

        $insertCard->execute([$col2, 6, 'SeteTel',   'Telefonia',        'setetel.com.br',        'ST']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'SeteTel — mBilling', 'https://sip.setetel.com.br/mbilling/']);

        log_ok("Coluna 2 (Gestão Telefonia) — 6 cards inseridos");

        // ──── Coluna 3: Planilhas & Docs ────
        $insertCol->execute([3, 'Planilhas & Docs', 'Google Workspace']);
        $col3 = $pdo->lastInsertId();

        $insertCard->execute([$col3, 1, 'Planilhas',  'Google Sheets', 'sheets.google.com', 'SH']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Clientes Contrato', 'https://docs.google.com/spreadsheets/d/1IgfIyEtRFPgcZCRIKsdk-87f3onJGpgCG21B5Cf4d8c/edit?gid=229792928#gid=229792928']);
        $insertLink->execute([$c, 2, 'Ramais Telefonia',  'https://docs.google.com/spreadsheets/d/1EFjVMKChRom__o84wclOOeASJDvoE_slSQdMMG4t6Yw/edit?gid=0#gid=0']);
        $insertLink->execute([$c, 3, 'Falha de Ligação',  'https://docs.google.com/spreadsheets/d/1TUWcIDNY2hzcoyP2I4HejiWk3zIr0LZAnOvYAnXfOJI/edit?gid=0#gid=0']);

        $insertCard->execute([$col3, 2, 'Documentos', 'Google Docs',   'docs.google.com',   'DC']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Mapa SGBR',  'https://docs.google.com/document/d/1wT6yRKsuNAmvNUa22BGmMdSRORP97b-KZ4tccRS7opY/edit?tab=t.0']);
        $insertLink->execute([$c, 2, 'Mapa Gdoor', 'https://docs.google.com/document/d/1-rAbGeotLsecxHLu0LZMP7LkRu0LPsS2Y1Jc9bWtOdM/edit?tab=t.0']);
        $insertLink->execute([$c, 3, 'Mapa Avante','https://docs.google.com/document/d/1nhkXpYhH_JyX71WrPRaacSxjeL8_k8xu2H_lx18Ty0E/edit?tab=t.0']);
        $insertLink->execute([$c, 4, 'Torge',      'https://docs.google.com/document/d/1Zoy2YlPsUGL1-PIoKf0FdyeTuzvKFZP7BqlODWcNw7E/edit?tab=t.0#heading=h.kocjf9pdhs1l']);

        log_ok("Coluna 3 (Planilhas & Docs) — 2 cards inseridos");

        // ──── Coluna 4: Domínios ────
        $insertCol->execute([4, 'Domínios', 'Infraestrutura Web']);
        $col4 = $pdo->lastInsertId();

        $insertCard->execute([$col4, 1, 'Cyber Panel',  'Painel VPS',       'cyberpanel.net',    'CP']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Cyber Panel Nuvem', 'https://154.38.182.18:8090']);

        $insertCard->execute([$col4, 2, 'Snappymail',   'Webmail',          'snappymail.eu',     'SM']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Snappymail — Webmail', 'https://154.38.182.18:8090/snappymail/index.php/']);

        $insertCard->execute([$col4, 3, 'Hostmachine',  'Hospedagem',       'hostmach.com.br',   'HM']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Hostmachine — Portal', 'https://portal.hostmach.com.br/servicos#anc_jumpin']);

        $insertCard->execute([$col4, 4, 'No IP',        'DNS Dinâmico',     'noip.com',          'NIP']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'No IP — Login', 'https://www.noip.com/pt-BR/login?ref_url=console']);

        $insertCard->execute([$col4, 5, 'Contabo',      'VPS / Cloud',      'contabo.com',       'CTB']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Contabo — Painel VPS', 'https://my.contabo.com/vps/0#']);

        $insertCard->execute([$col4, 6, 'Registro BR',  'Registro .br',     'registro.br',       'REG']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Registro BR — Login', 'https://registro.br/login/?session=required']);

        $insertCard->execute([$col4, 7, 'CloudFlare',   'CDN / DNS',        'cloudflare.com',    'CF']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'CloudFlare — Login', 'https://dash.cloudflare.com/login']);

        $insertCard->execute([$col4, 8, 'Namecheap',    'Domínios',         'namecheap.com',     'NC']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Namecheap — Site', 'https://www.namecheap.com/']);

        $insertCard->execute([$col4, 9, 'Proxmox',      'Virtualização',    'proxmox.com',       'PX']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Proxmox — Painel Local', 'http://192.168.0.17']);

        log_ok("Coluna 4 (Domínios) — 9 cards inseridos");

        // ──── Coluna 5: Suportes & Ferramentas ────
        $insertCol->execute([5, 'Suportes & Ferramentas', 'Atendimento']);
        $col5 = $pdo->lastInsertId();

        $insertCard->execute([$col5, 1, 'Tatical RMN', 'Acesso Remoto', 'vicpro.co', 'RMN']); $c = $pdo->lastInsertId();
        $insertLink->execute([$c, 1, 'Tatical RMN — Login', 'https://remote.vicpro.co/login']);

        log_ok("Coluna 5 (Suportes & Ferramentas) — 1 card inserido");
        log_ok("Seeder completo: 5 colunas, 23 cards, 34+ links");

    } else {
        log_info("adm_columns já populado — pulando");
    }

} catch (PDOException $e) {
    $log[] = "❌ ERRO: " . $e->getMessage();
}

// ── Output ────────────────────────────────────────────────────
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Setup — Central de Conexões</title>
<style>
  body { font-family: monospace; background: #0f0f0e; color: #e8e8ec; padding: 2rem; }
  h1 { color: #AC3A40; margin-bottom: 1.5rem; }
  .log { line-height: 2; font-size: 0.95rem; }
  .warn { margin-top: 2rem; padding: 1rem; border: 1px solid #AC3A40; border-radius: 8px; color: #d94e55; }
</style>
</head>
<body>
<h1>⚙️ Setup — Central de Conexões</h1>
<div class="log">
<?php foreach ($log as $l) echo "<div>$l</div>"; ?>
</div>
<div class="warn">
  ⚠️ <strong>IMPORTANTE:</strong> Delete este arquivo (<code>api/setup.php</code>) do servidor imediatamente após o setup!<br>
  Credenciais padrão: <strong>admin</strong> / <strong>Admin@123</strong> — troque a senha após o primeiro login.
</div>
</body>
</html>
