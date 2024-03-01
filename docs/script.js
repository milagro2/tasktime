// Function to save a note
function saveNote() {
    var noteInput = document.getElementById("noteInput").value;

    // Check if the note is not empty
    if (noteInput.trim() !== "") {
        // Send the note to the server using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "save_note.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // If the note is saved successfully, reload the notes
                loadNotes();
                // Clear the note input field
                document.getElementById("noteInput").value = "";
            }
        };
        xhr.send("note=" + noteInput);
    }
}

// Function to load notes
function loadNotes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "load_notes.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Display the notes
            document.getElementById("notesContainer").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Load notes when the page is loaded
window.onload = function () {
    loadNotes();
};
