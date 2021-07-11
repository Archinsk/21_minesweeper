<?php //Чтение списка рекордов

//Подключение RedBeanPHP
require 'rb.php';

//Подключение к базе данных
R::setup( 'mysql:host=localhost; dbname=minesweeper', 'mikhail', '9039033661!' );

//Поиск 10 лучших результатов
$records = R::findAll( 'records' , ' ORDER BY score DESC LIMIT 10 ' );

//Ответ сервера
$strarray = implode(",", $records);
echo $strarray;

?>