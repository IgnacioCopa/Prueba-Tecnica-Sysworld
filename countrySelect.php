<?php

include ('connection.php');



    $query = "SELECT * FROM countries ORDER BY country";

    $stmt = connection::conect()->prepare($query);
    $stmt -> execute();
    $respuesta= $stmt -> fetchAll();

    if(isset($respuesta)){

        $json = array();

        foreach($respuesta as $write){

            $json[] = array(
                "country" => $write["country"],
                "clicks" => $write["clicks"],
            );
                
        }

        $json_package = json_encode($json);
        echo $json_package;
            
    }        
   

?>