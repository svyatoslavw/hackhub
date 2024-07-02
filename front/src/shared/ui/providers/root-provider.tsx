"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { Provider } from "react-redux"
import { toast } from "sonner"

import { store } from "@/shared/lib/store"
import { Toaster } from "../sonner"
import { ThemeProvider } from "./theme-provider"

const DEFAULT_ERROR = "Something went wrong"
const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (cause) => {
      const { response } = cause as AxiosError<BaseResponse>
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        cancel: { label: "Close" }
      })
    }
  }),
  mutationCache: new MutationCache({
    onError: (cause) => {
      const { response } = cause as AxiosError<BaseResponse>
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        cancel: { label: "Close" }
      })
    }
  })
})
const TOASTER_DURATION = 5000

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={client}>
          {children}
          <Toaster duration={TOASTER_DURATION} />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  )
}

export { RootProvider }
