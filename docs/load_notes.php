<?php
// Load notes from the file (you may want to fetch from a database for a real application)
$notes = file("notes.txt");

// Display notes
foreach ($notes as $note) {
    echo "<div class='note'>$note</div>";
}
