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

        // Save note to local storage
        saveNoteToLocalStorage(noteText);

        document.getElementById('note-text').value = '';
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

function createTimeDropdowns(containerId) {
    var container = document.getElementById(containerId);

    var beginTimeLabel = document.createElement('label');
    beginTimeLabel.textContent = 'Begin Time: ';
    container.appendChild(beginTimeLabel);

    var beginHourSelect = document.createElement('select');
    for (var i = 0; i < 24; i++) {
        var option = document.createElement('option');
        option.text = (i < 10 ? '0' : '') + i;
        beginHourSelect.add(option);
    }
    container.appendChild(beginHourSelect);

    var beginMinuteSelect = document.createElement('select');
    for (var j = 0; j < 60; j++) {
        var option = document.createElement('option');
        option.text = (j < 10 ? '0' : '') + j;
        beginMinuteSelect.add(option);
    }
    container.appendChild(beginMinuteSelect);

    container.appendChild(document.createElement('br'));

    var endTimeLabel = document.createElement('label');
    endTimeLabel.textContent = 'End Time: ';
    container.appendChild(endTimeLabel);

    var endHourSelect = document.createElement('select');
    for (var i = 0; i < 24; i++) {
        var option = document.createElement('option');
        option.text = (i < 10 ? '0' : '') + i;
        endHourSelect.add(option);
    }
    container.appendChild(endHourSelect);

    var endMinuteSelect = document.createElement('select');
    for (var j = 0; j < 60; j++) {
        var option = document.createElement('option');
        option.text = (j < 10 ? '0' : '') + j;
        endMinuteSelect.add(option);
    }
    container.appendChild(endMinuteSelect);
}

// Usage
createTimeDropdowns('time-selector-container');
