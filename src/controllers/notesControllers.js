import createHttpError from 'http-errors';
import { Note } from '../models/note';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  if (!notes) {
    throw createHttpError(404, 'Notes not found.');
  }
  res.status(200).json(notes);
};
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOne({
    _id: noteId,
  });
  if (!note) {
    throw createHttpError(404, 'Note not found.');
  }
  res.status(200).json(note);
};
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  if (!note) {
    throw createHttpError(500, 'Something went wrong, try again!');
  }
  res.status(201).json(note);
};
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });
  if (!note) {
    throw createHttpError(404, 'Note not found.');
  }
  res.status(200).json(note);
};
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
    },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!note) {
    throw createHttpError(404, 'Note not found.');
  }
  res.status(200).json(note);
};
