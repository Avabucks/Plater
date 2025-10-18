<?php
$projectId = $_POST['projectId'];
$projectName = $_POST['projectName'];
$userId = $_POST['userId'];
$fileText = $_POST['fileText'];
$lastModified = $_POST['lastModified'];

// variabili di connessione al DB

      include 'config.php';

      $tabella = 'tbl_progetti';

            // Connessione al db
              $mysqli = new mysqli($host, $username_db, $password_db, $db_name) or die( "Unable to connect");
      $mysqli->select_db($db_name) or die( "Unable to select database");
        mysqli_set_charset($mysqli,"utf8");

        if ($projectId == 0) {
          $query="INSERT INTO $tabella (Titolo, Progetto, id_Utente, Attivo, lastModified) VALUES ('$projectName', '$fileText', '$userId', 'X', '$lastModified') ";
        } else {
          $query="UPDATE $tabella SET Titolo = '$projectName', Progetto = '$fileText', lastModified = '$lastModified' WHERE id = $projectId ";
        }

        if (mysqli_query($mysqli, $query)) {
            $last_id = mysqli_insert_id($mysqli);
            if ($projectId == 0) echo $last_id;
        }

        $mysqli->close();


?>
