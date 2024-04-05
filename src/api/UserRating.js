import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const UserRatingApi = createApi({
  reducerPath: "UserRatingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    AddRating: builder.mutation({
      query: (body) => ({
        url: "/rating",
        method: "post",
        body,
      }),
    }),
   
  }),
});

export const {
  useAddRatingMutation
} = UserRatingApi;
