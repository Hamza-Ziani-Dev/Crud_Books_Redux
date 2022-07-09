import { configureStore } from '@reduxjs/toolkit';
import booksSlice from '../features/books/booksSlice';
import authSlice from '../features/auth/authSlice';


export const store = configureStore({
    reducer: {
        books: booksSlice,
        auth: authSlice,
    },
});