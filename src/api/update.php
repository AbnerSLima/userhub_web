<?php
require 'config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$name = $data['name'];
$email = $data['email'];

if ($id && $name && $email) {
    $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
    $stmt->execute([':id' => $id, ':name' => $name, ':email' => $email]);
    echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
} else {
    echo json_encode(["error" => "Dados incompletos"]);
}
?>
