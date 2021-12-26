<?php
$servername = "localhost";
$username = "root";
$password = "qwerty@123";
$dbname = "AlgoTrade";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("-> Connection failed: " . $conn->connect_error) . "\n";
}else{
    echo "-> Database connected \n";
}

$drop = false;
$create = false;

$sql = "SELECT symbol FROM 1_instruments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        if($drop){
            $sql = "DROP TABLE `".$row["symbol"]."`";
            if ($conn->query($sql) === TRUE) {
                echo $row["symbol"].": DROPED \n";
            }else{
                echo "Error deleting record: " . $conn->error . "\n";
            }

        }
        if($create){
            $sql = "CREATE TABLE `".$row["symbol"]."` (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        candle varchar(100) NOT NULL UNIQUE KEY,
                        open float NOT NULL,
                        high float NOT NULL,
                        low float NOT NULL,
                        close float NOT NULL,
                        volume float NOT NULL,
                        indicator_1_value float NOT NULL DEFAULT 0,
                        indicator_2_value float NOT NULL DEFAULT 0,
                        indicator_3_value float NOT NULL DEFAULT 0,
                        indicator_4_value float NOT NULL DEFAULT 0,
                        indicator_5_value float NOT NULL DEFAULT 0,
                        indicator_1 enum('NONE', 'BUY', 'SELL', '') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        indicator_2 enum('NONE', 'BUY', 'SELL', '') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        indicator_3 enum('NONE', 'BUY', 'SELL', '') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        indicator_4 enum('NONE', 'BUY', 'SELL', '') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        indicator_5 enum('NONE', 'BUY', 'SELL', '') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        status varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE',
                        updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
              ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;";
            if ($conn->query($sql) === TRUE) {
                echo $row["symbol"].": Created \n";
            }else{
                echo "Error creating tables: " . $conn->error . "\n";
            }

        }


    }

} 

$conn->close();