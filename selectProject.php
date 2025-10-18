<?php

$id = $_POST['id'];
$return_arr = array();

// variabili di connessione al DB

      include 'config.php';

      $tabella = 'tbl_progetti';

      $mysqli = new mysqli($host, $username_db, $password_db, $db_name) or die( "Unable to connect");
    			$mysqli->select_db($db_name) or die( "Unable to select database");
    			mysqli_set_charset($mysqli,"utf8");
    			$query="SELECT Progetto FROM $tabella WHERE id = $id ";
    			if ($result = $mysqli->query($query)) {
                     /* fetch associative array */
                     while ($row = $result->fetch_assoc()) {
                      $Progetto = $row["Progetto"];

                      $return_arr[] = array("Progetto" => $Progetto,
                                      "id" => $id);
                  }

                }
          echo json_encode($return_arr);
    			  /* free result set */
                  $result->free();
    			  $mysqli->close();
?>
