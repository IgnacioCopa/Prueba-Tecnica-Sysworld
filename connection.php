<?php

//NOTA: EJECUTAR "MYSQL" EN EL PUERTO 3310 DE LOCALHOST

class connection{

    public static function conect(){
        
        //PDO("nombre del servidor; "nombre de la base de datos"; "usuario"; "contraseña");
        $link = new PDO("mysql:host=localhost:3310;dbname=paises","root","");

        $link ->exec("set names utf8");

        return $link;
    }
}


?>