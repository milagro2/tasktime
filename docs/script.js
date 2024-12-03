window.onload = function () {
    loadNotes();
    initFlatpickr();
    initQuickTasks();
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

function initQuickTasks() {
    const quickTasksBtn = document.getElementById('quick-tasks-btn');
    const tasksDropdown = document.getElementById('tasks-dropdown');
    const taskItems = document.querySelectorAll('.task-item');

    // Toggle dropdown when button is clicked
    quickTasksBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        tasksDropdown.classList.toggle('show');
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function() {
        tasksDropdown.classList.remove('show');
    });

    // Prevent dropdown from closing when clicking inside it
    tasksDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Add click handlers for task items
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('note-text').value = this.textContent;
            tasksDropdown.classList.remove('show');
        });
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
        document.getElementById('start-time-input')._flatpickr.clear();
        document.getElementById('end-time-input')._flatpickr.clear();
    } else {
        alert('Voeg een taak toe en selecteer een begintijd');
    }
}

function editNote(noteText, startTime, endTime, noteElement) {
    var noteContent = noteElement.querySelector('span').textContent;
    var originalText = noteContent.split(':')[0];

    // Create edit container
    var editContainer = document.createElement('div');
    editContainer.className = 'edit-container';

    // Create text input
    var textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = originalText;
    textInput.className = 'edit-text-input';
    editContainer.appendChild(textInput);

    // Create start time display
    var startTimeDisplay = document.createElement('span');
    startTimeDisplay.textContent = startTime;
    startTimeDisplay.className = 'time-display';
    editContainer.appendChild(startTimeDisplay);

    // Add separator
    var separator = document.createElement('span');
    separator.textContent = '-';
    separator.className = 'time-separator';
    editContainer.appendChild(separator);

    // Create time input for end time
    var timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.className = 'edit-time-input';
    timeInput.placeholder = 'Eind Tijd';
    editContainer.appendChild(timeInput);

    // Replace the span with our edit container
    noteElement.replaceChild(editContainer, noteElement.querySelector('span'));

    // Initialize Flatpickr on the time input
    var fp = flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minuteIncrement: 1,
        time_24hr: true,
        defaultHour: endTime ? parseInt(endTime.split(':')[0]) : null,
        defaultMinute: endTime ? parseInt(endTime.split(':')[1]) : null
    });

    // Modify edit button
    var editButton = noteElement.querySelector('.edit-button');
    editButton.textContent = 'Opslaan';

    editButton.onclick = function() {
        var updatedText = textInput.value;
        var updatedTime = timeInput.value;
        
        var updatedNoteContent = document.createElement('span');
        updatedNoteContent.textContent = updatedText + ': ' + startTime + (updatedTime ? ' - ' + updatedTime : '');
        noteElement.replaceChild(updatedNoteContent, editContainer);

        // Update in localStorage
        var notes = JSON.parse(localStorage.getItem('notes')) || [];
        var index = notes.indexOf(noteContent);
        if (index !== -1) {
            notes[index] = updatedNoteContent.textContent;
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        editButton.textContent = 'Bewerken';
        editButton.onclick = function() {
            editNote(updatedNoteContent.textContent, startTime, updatedTime, noteElement);
        };
    };
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