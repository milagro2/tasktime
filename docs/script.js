function addNote() {
    var noteText = document.getElementById('note-text').value;

    if (noteText.trim() !== '') {
        var notesContainer = document.getElementById('notes-container');

        var noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.textContent = noteText;

        notesContainer.appendChild(noteElement);

        document.getElementById('note-text').value = ''; // Clear the textarea after adding note
    } else {
        alert('Please enter a note.');
    }
}
