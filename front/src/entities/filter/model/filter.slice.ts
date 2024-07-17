import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum EnumPostCreatedSort {
  NEWEST = "newest",
  OLDEST = "oldest"
}

export enum EnumPostDateSort {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year"
}

export type TypeDataFilters = {
  sort?: EnumPostCreatedSort | string
  range?: EnumPostDateSort | string
  searchTerm?: string
  username?: string
  page: string
  perPage: string
  subcategory?: string
}
export interface IFilterState {
  isFilterUpdated: boolean
  queryParams: TypeDataFilters
}

export interface iFilterActiontsPayload {
  key: keyof TypeDataFilters
  value: string
}

const initialState: IFilterState = {
  isFilterUpdated: false,
  queryParams: {
    username: "",
    searchTerm: "",
    page: "1",
    perPage: "3",
    subcategory: "",
    sort: EnumPostCreatedSort.NEWEST,
    range: EnumPostDateSort.YEAR
  }
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateQueryParam: (state, action: PayloadAction<iFilterActiontsPayload>) => {
      const { key, value } = action.payload
      state.queryParams[key] = value
      state.isFilterUpdated = true
    },
    resetFilterUpdate: (state) => {
      state.isFilterUpdated = false
    }
  }
})

export const { updateQueryParam, resetFilterUpdate } = filtersSlice.actions
