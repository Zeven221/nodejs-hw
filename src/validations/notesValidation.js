import {Joi, Segments} from 'celebrate';
import { TAGS } from '../constants/tags.js';
import {isValidObjectId} from 'mongoose';
const isValidNoteId = (value, helpers) => {
  if(isValidObjectId(value)){
    return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;

  }
};
export const noteId = {
  [Segments.QUERY]: Joi.object({
    noteId: Joi.string().custom(isValidNoteId).required()
  })
} ;
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    perPage: Joi.number().integer().min(5).max(20).default(10),
    page: Joi.number().min(1).default(1),
    tag: Joi.string().valid(...TAGS).default('Todo'),
    search: Joi.string().trim().allow('')
  })
};
export const noteIdSchema = {
  ...noteId
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS)
  })
};
export const updateNoteSchema = {
  ...noteId,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS)
  }).min(1)
};
