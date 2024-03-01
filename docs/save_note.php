<?php
// Check if the note is sent
if (isset($_POST['note'])) {
    $note = $_POST['note'];

    // Append the note to the file (you may want to store in a database for a real application)
    file_put_contents("notes.txt", $note . PHP_EOL, FILE_APPEND);
}
