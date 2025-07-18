const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";

    // Rebind events after restoring from storage
    let notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.onkeyup = updateStorage;
    });
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create new note
createBtn.addEventListener("click", () => {
    let noteDiv = document.createElement("div");
    noteDiv.className = "note";

    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    let img = document.createElement("img");
    img.src = "images/delete.png";

    inputBox.onkeyup = updateStorage;

    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(img);
    notesContainer.appendChild(noteDiv);
    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

showNotes();