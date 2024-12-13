<?php
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
