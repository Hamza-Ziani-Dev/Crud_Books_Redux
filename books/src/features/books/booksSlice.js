import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// get All Books
export const getBooks = createAsyncThunk('book/getBooks', async(_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:3005/books');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});




// add Book
export const insertBook = createAsyncThunk(
    'book/insertBook',
    async(bookData, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        bookData.auther = getState().auth.name;
        try {
            const res = await fetch('http://localhost:3000/books', {
                method: 'POST',
                body: JSON.stringify(bookData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// delete Book
export const deleteBook = createAsyncThunk(
    'book/deleteBook',
    async(data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await fetch(`http://localhost:3000/books/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            //const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        loading: false,
        error: null
    },
    reducers: {},

    extraReducers: { // subscribe to function out slice
        //fetch
        [getBooks.pending]: (state, action) => {
            console.log(action);
            state.loading = true;
            state.error = null;
        },
        [getBooks.fulfilled]: (state, action) => {
            console.log(action);
            state.books = action.payload;
            state.loading = false;
        },
        [getBooks.rejected]: (state, action) => {
            console.log(action);
            state.error = action.payload;
            state.loading = false;
        },

        //insert
        [insertBook.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [insertBook.fulfilled]: (state, action) => {
            state.books.push(action.payload);
            state.loading = false;
        },
        [insertBook.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        //delete
        [deleteBook.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.books = state.books.filter((el) => el.id !== action.payload.id);
            state.loading = false;
        },
        [deleteBook.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export default booksSlice.reducer;