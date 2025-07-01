<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data["nama"]) && isset($data["skor"])) {
    $file = 'leaderboard.json';

    if (!file_exists($file)) {
        file_put_contents($file, json_encode([]));
    }

    $leaderboard = json_decode(file_get_contents($file), true);
    $leaderboard[] = [
        "nama" => htmlspecialchars($data["nama"]),
        "skor" => intval($data["skor"])
    ];

    // Urutkan dari skor tertinggi ke rendah
    usort($leaderboard, function ($a, $b) {
        return $b["skor"] - $a["skor"];
    });

    // Simpan hanya 5 besar
    $leaderboard = array_slice($leaderboard, 0, 5);

    file_put_contents($file, json_encode($leaderboard, JSON_PRETTY_PRINT));
    echo "Data berhasil disimpan.";
} else {
    echo "Data tidak valid.";
}
?>