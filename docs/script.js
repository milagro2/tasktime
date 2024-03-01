// Load saved notes when the page loads
window.onload = function() {
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
        deleteButton.onclick = function() {
            deleteNote(noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

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

    notes.forEach(function(noteText) {
        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText;
        noteElement.appendChild(noteContent);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
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

// JavaScript (script.js)

// Function to register a new user
function registerUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if username already exists in localStorage
    if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose another username.');
        return;
    }

    // Store username and password in localStorage
    localStorage.setItem(username, password);

    // Hide registration form and show notes section
    document.getElementById('login-section').style.display = 'none';
    loadNotes(username);
}

// Function to log in an existing user
function loginUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if username exists and password matches in localStorage
    if (localStorage.getItem(username) === password) {
        // Hide login form and show notes section
        document.getElementById('login-section').style.display = 'none';
        loadNotes(username);
    } else {
        alert('Invalid username or password.');
    }
}

// Load saved notes for the logged-in user
function loadNotes(username) {
    var notes = JSON.parse(localStorage.getItem(username + '_notes')) || [];

    var notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(function(noteText) {
        var noteElement = document.createElement('div');
        noteElement.className = 'note';

        var noteContent = document.createElement('span');
        noteContent.textContent = noteText;
        noteElement.appendChild(noteContent);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deleteNote(username, noteText);
            notesContainer.removeChild(noteElement);
        };
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    });
}

// Function to add a note for the logged-in user
function addNote() {
    var username = document.getElementById('username').value;
    var noteText = document.getElementById('note-text').value;

    if (noteText.trim() !== '') {
        var notes = JSON.parse(localStorage.getItem(username + '_notes')) || [];
        notes.push(noteText);
        localStorage.setItem(username + '_notes', JSON.stringify(notes));

        loadNotes(username);

        document.getElementById('note-text').value = ''; // Clear the textarea after adding note
    } else {
        alert('Please enter a note.');
    }
}

// Function to delete a note for the logged-in user
function deleteNote(username, note) {
    var notes = JSON.parse(localStorage.getItem(username + '_notes')) || [];
    var index = notes.indexOf(note);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem(username + '_notes', JSON.stringify(notes));
    }
}
