import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface InitialState {
  title: string
  content: string
  creatorId: string
  subcategoryId: string
}

export type UpdatePostAction = {
  key: keyof InitialState
  value: string
}

const initialState: InitialState = {
  title: "",
  content: "",
  creatorId: "",
  subcategoryId: ""
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<UpdatePostAction>) => {
      state[action.payload.key] = action.payload.value
    }
  }
})

export const { updatePost } = postSlice.actions
