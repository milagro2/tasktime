// Load saved notes when the page loads
window.onload = function () {
    loadNotes();
};

function addNote() {
    var noteText = document.getElementById('note-text').value;

    if (noteText.trim() !== '') {
        var notesContainer = document.getElementById('notes-container');

        var noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.textContent = noteText;

        notesContainer.appendChild(noteElement);

        // Save note to local storage
        saveNoteToLocalStorage(noteText);

        document.getElementById('note-text').value = ''; // Clear the textarea after adding note
    } else {
        alert('Please enter a note.');
    }
}

// Save note to local storage
function saveNoteToLocalStorage(note) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load saved notes from local storage
function loadNotes() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];

    var notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(function (noteText) {
        var noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.textContent = noteText;
        notesContainer.appendChild(noteElement);
    });
}
