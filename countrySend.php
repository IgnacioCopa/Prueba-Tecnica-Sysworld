<?php

include ('connection.php');

$n_country= $_POST["n_country"];
$clicks= $_POST["clicks"];
$equals="";


if(isset($n_country) && isset($clicks)){

    $query = "SELECT * FROM countries";

    $stmt = connection::conect()->prepare($query);
    $stmt -> execute();
    $respuesta= $stmt -> fetchAll();

    foreach($respuesta as $write){

        foreach($write as $write2){

            if( $write2 == $n_country){

                $equals=$n_country;
            }
        }
    }

    //si existe uno igual ACTUALIZAR
    if($equals==$n_country){

        $clicks++;

        $query2 = "UPDATE countries SET clicks = ('$clicks') WHERE country = '$n_country' ";

        $stmt = connection::conect()->prepare($query2);
        $stmt -> execute();
        

        echo "existe";

    }
    else
    {
        $clicks++;
        //si NO existe uno AGREGARLO 
        $query2 = "INSERT INTO countries (country,clicks) VALUES ('$n_country','$clicks')";

        $stmt = connection::conect()->prepare($query2);
        $stmt -> execute();

        echo "no existe";

    }


}







?>