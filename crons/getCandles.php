<?php
// crontab -e
// */5 9,10,11,12,13,14,15 * * * php ~/Web/AlgoTrade/crons/getCandles.php > ~/Web/AlgoTrade/crons/logs/getCandles/`date +\%H:\%M`.log 2>&1
// service cron reload
// service cron restart

echo "\n =================================== \n";
echo "\n".date('h:i:s a', time())." : START \n\n";
$start_time = strtotime(date('h:i:s a', time()));

$servername = "localhost";
$username = "root";
$password = "qwerty@123";
$dbname = "AlgoTrade";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("-> Connection failed: " . $conn->connect_error) . "\n";
  exit;
}else{
    echo "-> Database connected \n";
}

$truncate_current_time = DateTime::createFromFormat('h:i a', date('h:i:s a', time()));
$truncate_start_time = DateTime::createFromFormat('h:i a', "09:00 am");
$truncate_end_time = DateTime::createFromFormat('h:i a', "09:10 am");
if ($truncate_current_time > $truncate_start_time && $truncate_current_time < $truncate_end_time)
{
    echo "-> TRUNCATE START \n";
    $sql = "SELECT symbol FROM 1_instruments";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $truncate_success = 0;
        $truncate_error = 0;
        while($row = $result->fetch_assoc()) {
            $sql = "TRUNCATE TABLE `".$row["symbol"]."`";
            if ($conn->query($sql) === TRUE) {
                echo "-> TRUNCATE SUCCESS : ".$row['symbol']." \n";
                $truncate_success++;
            }else{
                echo "-> TRUNCATE ERROR : ".$row['symbol']." : ".$conn->error." \n";
                $truncate_error++;
                exit;
            }
        }
    }
    echo "-> TRUNCATE SUCCESS : ".$truncate_success." ERROR : ".$truncate_error." \n";
    echo "-> TRUNCATE END \n";
}else{

    $sql = "SELECT authorization FROM 1_auth WHERE id=1";
    $result = $conn->query($sql);
    $token = null;
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $token = $row["authorization"];
            echo "-> TOKEN : ".$token."\n";
        }
    }else{
        echo "-> TOKEN  FAILED : ".$token."\n";
        exit;
    }

    echo "-> INSERT START \n";
    
    $from = date('Y-m-d', time());
    $to = date('Y-m-d', time());

    // $from = "2021-09-15";
    // $to = "2021-09-16";
    $sql = "SELECT symbol,instrumentCode FROM 1_instruments ORDER BY symbol ASC";
    $result = $conn->query($sql);
    $instrumentCode = null;
    $symbol = null;
    $insert_success = 0;
    $insert_error = 0;

    if ($result->num_rows > 0) {    
        while($row = $result->fetch_assoc()) {
            $instrumentCode = $row["instrumentCode"];
            $symbol = $row["symbol"];
            // insert operation starts
            $url = "https://kite.zerodha.com/oms/instruments/historical/".$instrumentCode."/5minute?user_id=VM7727&oi=1&from=".$from."&to=".$to."";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL,$url);
            $headers = [
                'authorization:'.$token.'',
                'accept: application/json, text/plain, */*'
            ];
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $server_output = curl_exec ($ch);
            curl_close ($ch);
            $response = json_decode($server_output);
            $insert_symbol_error = 0;
            $insert_symbol_success = 0;
            if($response->status == "success"){
                foreach ($response->data->candles as $key => $row) {
                    $candle = $row[0];
                    $open = $row[1];
                    $high = $row[2];
                    $low = $row[3];
                    $close = $row[4];
                    $volume = $row[5];
                    $sql = "INSERT INTO `".$symbol."`(candle,open,high,low,close,volume) 
                            VALUES('".$candle."',".$open.",".$high.",".$low.",".$close.",".$volume.");";
                    if ($conn->query($sql) === TRUE) {
                        // echo "-> INSERT SUCCESS : ".$symbol."\n";
                        $insert_symbol_success++;
                        $insert_success++;
                    } else {
                        // echo "-> INSERT ERROR :  ".$candle." - ".$symbol." : ".$conn->error."\n";
                        $insert_error++;
                        $insert_symbol_error++;
                    }
                }
            }
            echo "-> ".date('h:i:s a', time())." : INSERT : [ SUCCESS :  ".$insert_symbol_success." ] : ".$symbol."\n";
            // insert operation ends
        }
    }

    echo "-> INSERT SUCCESS : ".$insert_success." \n";
    echo "-> INSERT END \n";
}

$end_time = strtotime(date('h:i:s a', time()));
echo "-> TIME TAKEN : ".round(abs($start_time - $end_time) / 60,2). " minutes \n";
echo "\n".date('h:i:s a', time())." : END \n";



echo "\n =================================== \n";
