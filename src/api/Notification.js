import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';


export const NotificationApi = createApi({
    reducerPath: 'NotificationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
       
    }),
    tagTypes: ['Notification'],
    endpoints: (builder) => ({
        GetAllNotification: builder.query({
            query: (params) => {
                return {
                    url: '/get-user-notificattion',
                    params
                };
            },
            providesTags: ['Notification'],
        }),
       
    }),
});

export const { useGetAllNotificationQuery } = NotificationApi;