<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexao.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['user_id'];

if ($id) {
    $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = :id");
    $stmt->execute([':id' => $id]);
    echo json_encode(["message" => "Usuário deletado com sucesso!"]);
} else {
    echo json_encode(["error" => "ID não informado"]);
}
?>
