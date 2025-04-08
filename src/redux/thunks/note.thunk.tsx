import { doDelete, doGet, doPatch, doPost } from "@/lib/axios";
import { TNoteSchema } from "@/schemas/note.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNotes = createAsyncThunk<TNoteSchema[]>(
  "get notes",
  async () => {
    try {
      const response = await doGet("/notes");
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface AddNoteResponse {
  message: string;
}

interface AddNoteArgs {
  data: FormData;
  callback?: () => void;
}

export const addNotes = createAsyncThunk<AddNoteResponse, AddNoteArgs>(
  "add notes",
  async ({ data, callback }) => {
    try {
      const response = await doPost("/notes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      callback?.();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface verifyNoteArgs {
  id: string;
  callback?: () => void;
  onError?: () => void;
}

export const verifyNotes = createAsyncThunk<any, verifyNoteArgs>(
  "add notes",
  async ({ id, callback, onError }) => {
    try {
      const response = await doPatch(`/notes/${id}`);

      callback?.();
      return response;
    } catch (error) {
      onError?.();
      throw error;
    }
  }
);

export const deleteNotes = createAsyncThunk<any, verifyNoteArgs>(
  "delete notes",
  async ({ id, callback, onError }) => {
    try {
      const response = await doDelete(`/notes/${id}`);

      callback?.();
      return response;
    } catch (error) {
      onError?.();
      throw error;
    }
  }
);
