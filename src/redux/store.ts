import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import dispatchReducer from './features/dispatchSlice';
import {authApi} from './api/authAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dispatch: dispatchReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
