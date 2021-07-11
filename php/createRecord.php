<?php //Запись в таблицу рекордов

//Подключение RedBeanPHP
require 'rb.php';

//Подключение к базе данных
R::setup( 'mysql:host=localhost; dbname=minesweeper', 'mikhail', '9039033661!' );

//Запись результата в БД
$record = R::dispense('records');
  $record->player = $_POST['player'];
  $record->score = $_POST['score'];
R::store($record);

//Ответ сервера
echo "Результат записан в БД";

?>