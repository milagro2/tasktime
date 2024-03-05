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

function generateHoursDropdown() {
    var select = document.createElement('select');
    for (var i = 0; i < 24; i++) {
        var option = document.createElement('option');
        option.text = (i < 10 ? '0' : '') + i;
        option.value = i;
        select.appendChild(option);
    }
    return select;
}

// Function to generate dropdown options for minutes (0-59)
function generateMinutesDropdown() {
    var select = document.createElement('select');
    for (var i = 0; i < 60; i++) {
        var option = document.createElement('option');
        option.text = (i < 10 ? '0' : '') + i;
        option.value = i;
        select.appendChild(option);
    }
    return select;
}

// Function to create a time selector with dropdowns for hours and minutes
function createTimeSelector() {
    var container = document.createElement('div');

    var beginLabel = document.createElement('label');
    beginLabel.textContent = 'Begin Time: ';
    container.appendChild(beginLabel);

    var beginHoursSelect = generateHoursDropdown();
    var beginMinutesSelect = generateMinutesDropdown();

    container.appendChild(beginHoursSelect);
    container.appendChild(document.createTextNode(':'));
    container.appendChild(beginMinutesSelect);

    container.appendChild(document.createElement('br'));

    var endLabel = document.createElement('label');
    endLabel.textContent = 'End Time: ';
    container.appendChild(endLabel);

    var endHoursSelect = generateHoursDropdown();
    var endMinutesSelect = generateMinutesDropdown();

    container.appendChild(endHoursSelect);
    container.appendChild(document.createTextNode(':'));
    container.appendChild(endMinutesSelect);

    return container;
}

// Example usage:
var timeSelector = createTimeSelector();
document.body.appendChild(timeSelector);