import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum EnumProductSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest"
}

export type TypeDataFilters = {
  sort?: EnumProductSort | string
  searchTerm?: string
  username?: string
  page?: string | number
  perPage: string | number
  minPrice?: string
  maxPrice?: string
  categoryId?: string
  genderId?: string
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
    searchTerm: "",
    username: "",
    sort: EnumProductSort.NEWEST,
    page: 1,
    perPage: 9
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
