// Load saved notes when the page loads
window.onload = function () {
    loadNotes();
    populateTimeOptions(); // Populate time options when the page loads
};

function populateTimeOptions() {
    var startTimeSelect = document.getElementById('start-time-select');
    var endTimeSelect = document.getElementById('end-time-select');

    // Populate start and end time options (for demonstration, you can adjust the options as needed)
    for (var hour = 0; hour < 24; hour++) {
        for (var minute = 0; minute < 60; minute += 15) {
            var timeString = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
            var option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            startTimeSelect.appendChild(option);
            endTimeSelect.appendChild(option.cloneNode(true));
        }
    }
}

function addNote() {
    var noteText = document.getElementById('note-text').value;
    var startTime = document.getElementById('start-time-select').value;
    var endTime = document.getElementById('end-time-select').value;

    if (noteText.trim() !== '' && startTime && endTime) {
        var notesContainer = document.getElementById('notes-container');

        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText + ' - ' + startTime + ' to ' + endTime; // Append selected times to note text
        noteElement.appendChild(noteContent);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            deleteNote(noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);

        // Save note to local storage
        saveNoteToLocalStorage(noteText + ' - ' + startTime + ' to ' + endTime); // Save note with times

        document.getElementById('note-text').value = ''; // Clear the textarea after adding note
    } else {
        alert('Please enter a note and select start and end times.');
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

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText;
        noteElement.appendChild(noteContent);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            deleteNote(noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    });
}

// Delete note from local storage
function deleteNote(note) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var index = notes.indexOf(note);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
