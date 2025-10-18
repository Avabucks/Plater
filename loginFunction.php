<?php
  $mail = $_POST['mail'];
  $password = md5($_POST['password']);
  $return_arr = array();

  include 'config.php';

  $tabella = 'tbl_accessi';

        // Connessione al db
          $mysqli = new mysqli($host, $username_db, $password_db, $db_name) or die( "Unable to connect");
  $mysqli->select_db($db_name) or die( "Unable to select database");
    mysqli_set_charset($mysqli,"utf8");

    $query="SELECT usernameText, mailText, passwordText, univocoText FROM $tabella";
    if ($result = $mysqli->query($query)) {
               /* fetch associative array */
               while ($row = $result->fetch_assoc()) {
                if ($row["mailText"] == $mail && $row["passwordText"] == $password) {
                  $return_arr[] = array("usernameText" => $row["usernameText"],
                                  "univocoText" => $row["univocoText"]);

                }
            }

          }

          echo json_encode($return_arr);

      /* free result set */
            $result->free();
      $mysqli->close();


?>
