import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResType, PieResType, StatsResType, lineResType } from "../../types/Types";


export const DashboardApi = createApi({
  reducerPath: "DashboardApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    stats: builder.query<StatsResType, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pie: builder.query<PieResType, string>({
      query: (id) => `pie?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResType, string>({
      query: (id) => `bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<lineResType, string>({
      query: (id) => `line?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {useBarQuery,useLineQuery,usePieQuery,useStatsQuery} = DashboardApi;
