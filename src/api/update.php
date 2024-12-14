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
$name = $data['name'];
$login = $data['login'];
$password = $data['senha'];

if ($id && $nome && $login && $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE users SET nome = :nome, login = :login WHERE user_id = :id");
    $stmt->execute([':id' => $id, ':nome' => $nome, ':login' => $login, ':senha' => $hashedPassword]);
    echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Dados incompletos"]);
}
?>
