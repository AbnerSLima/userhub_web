<?php
require 'conexao.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

if ($email && $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
    $stmt->execute([':email' => $email, ':password' => $hashedPassword]);
    echo json_encode(["message" => "Usuário criado com sucesso!"]);
} else {
    echo json_encode(["error" => "Dados incompletos"]);
}
?>
