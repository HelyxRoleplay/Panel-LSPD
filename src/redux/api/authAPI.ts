import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (
                body: {username: string; password: string} | {token: string},
            ) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useLoginMutation} = authApi;
