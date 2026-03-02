<?php
// Execute UMA VEZ para criar a tabela downloads. Apague após usar.
require_once __DIR__ . '/config.php';
header('Content-Type: text/html; charset=utf-8');

try {
    $pdo = db();

    $pdo->exec("CREATE TABLE IF NOT EXISTS downloads (
        id          INT PRIMARY KEY AUTO_INCREMENT,
        title       VARCHAR(200) NOT NULL,
        description VARCHAR(500) DEFAULT NULL,
        url         VARCHAR(1000) NOT NULL,
        category    VARCHAR(100) DEFAULT 'Suporte',
        sort_order  INT          DEFAULT 0,
        show_in_hub TINYINT(1)   DEFAULT 0,
        active      TINYINT(1)   DEFAULT 1,
        created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    echo "✅ Tabela <strong>downloads</strong> criada (ou já existia).<br>";

    // Seed inicial apenas se tabela estiver vazia
    $count = (int) $pdo->query("SELECT COUNT(*) FROM downloads")->fetchColumn();
    if ($count === 0) {
        $pdo->exec("INSERT INTO downloads (title, description, url, category, sort_order, show_in_hub, active) VALUES
            ('Suporte Netecia',    'Ferramenta de suporte remoto Net e Cia', 'download/suporte-netecia.exe',    'Suporte', 1, 1, 1),
            ('QS Suporte Netecia','Ferramenta QS de suporte remoto',          'download/qs-suporte-netecia.exe', 'Suporte', 2, 1, 1)
        ");
        echo "✅ Dados iniciais inseridos (2 itens).<br>";
    } else {
        echo "ℹ️ Tabela já contém $count item(s). Seed ignorado.<br>";
    }

    echo "<br><strong>✅ Migração concluída!</strong><br>";
    echo "<br><em style='color:#c00'>⚠️ Apague este arquivo do servidor agora: <code>api/migrate-downloads.php</code></em>";

} catch (Exception $e) {
    echo "❌ Erro: " . htmlspecialchars($e->getMessage());
}
