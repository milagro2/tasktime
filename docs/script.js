window.onload = function () {
    loadNotes();
    populateTimeOptions();
};

function populateTimeOptions() {
    var startTimeSelect = document.getElementById('start-time-select');
    var endTimeSelect = document.getElementById('end-time-select');

    for (var hour = 8; hour < 23; hour++) {
        for (var minute = 0; minute < 60; minute += 1) {
            var timeString = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
            var option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            startTimeSelect.appendChild(option);
            endTimeSelect.appendChild(option.cloneNode(true));
        }
    }

    startTimeSelect.addEventListener('change', filterEndTimeOptions);
}

function filterEndTimeOptions() {
    var startTimeSelect = document.getElementById('start-time-select');
    var endTimeSelect = document.getElementById('end-time-select');

    var selectedStartTime = startTimeSelect.value.split(':')[0];
    for (var i = 0; i < endTimeSelect.options.length; i++) {
        var optionHour = endTimeSelect.options[i].value.split(':')[0];
        if (optionHour < selectedStartTime) {
            endTimeSelect.options[i].disabled = true;
        } else {
            endTimeSelect.options[i].disabled = false;
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
        noteContent.textContent = noteText + ' - ' + startTime + ' to ' + endTime;
        noteElement.appendChild(noteContent);

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = function () {
            editNote(noteText, startTime, endTime, noteElement);
        };
        noteElement.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            deleteNote(noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);


        saveNoteToLocalStorage(noteText + ' - ' + startTime + ' to ' + endTime);

        document.getElementById('note-text').value = '';
        document.getElementById('start-time-select').value = endTime;
        document.getElementById('end-time-select').value = '';
    } else {
        alert('Please enter a note and select start and end times.');
    }
}
function editNote(noteText, startTime, endTime, noteElement) {
    var noteContent = noteElement.querySelector('span').textContent;

    if (!noteContent.includes(startTime) && !noteContent.includes(endTime)) {
        noteContent += ' - ' + startTime + ' to ' + endTime;
    }

    var textarea = document.createElement('textarea');
    textarea.value = noteContent;
    textarea.className = 'note-textarea';
    noteElement.replaceChild(textarea, noteElement.querySelector('span'));

    var editButton = noteElement.querySelector('.edit-button');
    editButton.textContent = 'Save';

    editButton.onclick = function () {
        updateNote();
    };

    function updateNote() {
        var updatedNoteText = textarea.value;

        textarea.textContent = updatedNoteText;

        var updatedNoteContent = document.createElement('span');
        updatedNoteContent.textContent = updatedNoteText;
        noteElement.replaceChild(updatedNoteContent, textarea);

        var notes = JSON.parse(localStorage.getItem('notes')) || [];
        var index = notes.indexOf(noteText);
        if (index !== -1) {
            notes[index] = updatedNoteText;
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            editNote(updatedNoteText, startTime, endTime, noteElement);
        };
    }
}


function saveNoteToLocalStorage(note) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

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

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = function () {
            var times = noteText.match(/\d{2}:\d{2}/g);
            if (times.length === 2) {
                editNote(noteText, times[0], times[1], noteElement);
            }
        };
        noteElement.appendChild(editButton);

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


function deleteNote(note) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var index = notes.indexOf(note);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
