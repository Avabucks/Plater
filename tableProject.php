<?php

$userId = $_POST['userId'];

// variabili di connessione al DB

      include 'config.php';

      $tabella = 'tbl_progetti';

      $mysqli = new mysqli($host, $username_db, $password_db, $db_name) or die( "Unable to connect");
    			$mysqli->select_db($db_name) or die( "Unable to select database");
    			mysqli_set_charset($mysqli,"utf8");
    			$query="SELECT id, Titolo, Progetto, Attivo, lastModified FROM $tabella WHERE id_Utente = '$userId' ";
    			if ($result = $mysqli->query($query)) {
                     /* fetch associative array */
                     while ($row = $result->fetch_assoc()) {
                      $projectName = $row["Titolo"];
                      $id = $row["id"];
                      $attivo = $row["Attivo"];
                      $lastModified = $row["lastModified"];

                ?>


    					<tr data-folder='<?php echo $attivo ?>' class="slide-top" style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: var(--primary); box-shadow: inset 0px 0px 0px 1px rgb(150, 150, 150, .1); border-radius: 6px;' onclick='openProjectFromClickTable(this, event);'>
                <td style='padding: 15px 10px; text-align: left; display: none;'><?php echo $id ?></td>
                <!-- <td style='border-top-left-radius: 0px; border-bottom-left-radius: 0px; padding: 15px 30px; text-align: left; width: 10px; font-family: Material Icons; font-size: 18px;'>
                  <p id='launchProject' onclick='openMode="N"; this.parentNode.click();' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0; margin-right: 9px;'>
                    <span id='launchProjectSpan' style='font-size: 22px; font-family: Material Icons; transition: .3s;'>
                      launch
                    </span>
                  </p>
                </td> -->
                <td style='border-top-left-radius: 6px; border-bottom-left-radius: 6px; padding: 15px 40px 15px 25px; font-family: Material Icons; font-size: 20px; width: 5px;'>description</td>
                <td style='padding: 15px 0; text-align: left; width: 80%; font-size: 13.5px; letter-spacing: .3px;'><?php echo $projectName ?></td>
                <td style='padding: 15px 10px; text-align: left; width: 100px; font-family: Material Icons; font-size: 20px;'>cloud_done</td>
                <td style='padding: 15px 10px; text-align: left; width: 30%; font-size: 13.5px; letter-spacing: .3px;'><?php echo $lastModified ?></td>
                <td style='border-top-right-radius: 6px; border-bottom-right-radius: 6px; padding: 15px 10px; text-align: left; width: 30%;'>
                  <p id='removeProject' onclick='openAlertDeleteProject(this);' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0; margin-right: 9px;'>
                    <span id='removeProjectSpan' style='font-size: 22px; font-family: Material Icons; transition: .3s;'>
                      remove
                    </span>
                  </p>
                </td>
              </tr>

                  <?php
                      }
                    }

    			  /* free result set */
                  $result->free();
    			  $mysqli->close();
?>
