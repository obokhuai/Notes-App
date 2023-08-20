const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("new notes added");
  } else {
    console.log("note title taken");
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const updatedNotes = notes.filter((note) => note.title !== title);
  if (notes.length > updatedNotes.length) {
    console.log("note removed");
  } else {
    console.log("note not updated");
  }
  saveNotes(updatedNotes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const allNotes = loadNotes();
  allNotes.forEach((note) => {
    console.log(note.title, note.body);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log("no note was found");
  }
};

module.exports = {
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
