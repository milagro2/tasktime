window.onload = function () {
    loadNotes();
    initFlatpickr();
};

function initFlatpickr() {
    flatpickr("#start-time-input", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minuteIncrement: 1,
        time_24hr: true
    });

    flatpickr("#end-time-input", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minuteIncrement: 1,
        time_24hr: true
    });
}

function addNote() {
    var noteText = document.getElementById('note-text').value;
    var startTime = document.getElementById('start-time-input').value;
    var endTime = document.getElementById('end-time-input').value;

    if (noteText.trim() !== '' && startTime) {
        var notesContainer = document.getElementById('notes-container');

        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText + ': ' + startTime + (endTime ? ' - ' + endTime : '');
        noteElement.appendChild(noteContent);

        var editButton = document.createElement('button');
        editButton.textContent = 'Bewerken';
        editButton.className = 'edit-button';
        editButton.onclick = function () {
            editNote(noteText, startTime, endTime, noteElement);
        };
        noteElement.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijder';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            deleteNote(noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);


        saveNoteToLocalStorage(noteText + ': ' + startTime + (endTime ? ' - ' + endTime : ''));

        document.getElementById('note-text').value = '';
        document.getElementById('start-time-input').value = '';
        document.getElementById('end-time-input').value = '';
    } else {
        alert('Voeg een taak toe en selecteer een begintijd');
    }
}

function editNote(noteText, startTime, endTime, noteElement) {
    var noteContent = noteElement.querySelector('span').textContent;

    if (!noteContent.includes(startTime) && !noteContent.includes(endTime)) {
        noteContent += ' - ' + startTime + ' tot ' + endTime;
    }

    var textarea = document.createElement('textarea');
    textarea.value = noteContent;
    textarea.className = 'note-textarea';
    noteElement.replaceChild(textarea, noteElement.querySelector('span'));

    var editButton = noteElement.querySelector('.edit-button');
    editButton.textContent = 'Opslaan';

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

        editButton.textContent = 'Bewerken';
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
        editButton.textContent = 'Bewerken';
        editButton.className = 'edit-button';
        editButton.onclick = function () {
            var times = noteText.match(/\d{2}:\d{2}/g);
            if (times.length >= 1) {
                editNote(noteText, times[0], times[1] || null, noteElement);
            }
        };
        noteElement.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijderen';
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