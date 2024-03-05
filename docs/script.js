// Load saved notes when the page loads
window.onload = function () {
    loadNotes();
};

// Function to add a note with start and end time
function addNote() {
    var noteText = document.getElementById('note-text').value;
    var startTime = document.getElementById('start-time').value;
    var endTime = document.getElementById('end-time').value;

    if (noteText.trim() !== '') {
        var notesContainer = document.getElementById('notes-container');

        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText + ' - ' + startTime + ' to ' + endTime;
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
        saveNoteToLocalStorage(noteText, startTime, endTime);

        document.getElementById('note-text').value = '';
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
    } else {
        alert('Please enter a note.');
    }
}

// Save note with start and end time to local storage
function saveNoteToLocalStorage(note, startTime, endTime) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var noteObject = {
        text: note,
        start: startTime,
        end: endTime
    };
    notes.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load saved notes from local storage
function loadNotes() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];

    var notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(function (noteObject) {
        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteObject.text + ' - ' + noteObject.start + ' to ' + noteObject.end;
        noteElement.appendChild(noteContent);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            deleteNote(noteObject.text);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    });
}

// Delete note from local storage
function deleteNote(noteText) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var index = notes.findIndex(function(note) {
        return note.text === noteText;
    });
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function createTimeSelector() {
    var timeSelector = document.createElement('div');
    timeSelector.id = 'time-selector';

    var startTimeInput = document.createElement('input');
    startTimeInput.type = 'time';
    startTimeInput.id = 'start-time';
    startTimeInput.placeholder = 'Start Time';

    var endTimeInput = document.createElement('input');
    endTimeInput.type = 'time';
    endTimeInput.id = 'end-time';
    endTimeInput.placeholder = 'End Time';

    timeSelector.appendChild(startTimeInput);
    timeSelector.appendChild(endTimeInput);

    return timeSelector;
}

// Example usage:
var timeSelectorContainer = createTimeSelector();
document.getElementById('input-section').appendChild(timeSelectorContainer);

