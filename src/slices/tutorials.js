import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TutorialServece from "../services/TutorialService";

const initialState = [];

export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }) => {
    const res = await TutorialServece.create({ title, description });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "tutorial/retrieve",
  async () => {
    const res = await TutorialServece.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorial/update",
  async ({ id, data }) => {
    const res = await TutorialServece.update(id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorial/delete",
  async ({ id }) => {
    await TutorialServece.remove(id);
    return { id };
  }
);

export const deleteAllTutorials = createAsyncThunk(
  "tutorial/deleteAll",
  async () => {
    const res = await TutorialServece.removeAll();
    return res.data;
  }
);

export const findTutorialsByTitle = createAsyncThunk(
  "tutorial/findByTitle",
  async ({ title }) => {
    const res = await TutorialServece.findByTitle(title);
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  extraReducers: {
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },
    [findTutorialsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = tutorialSlice;
export default reducer;
