interface BaseResponse {
  message: string
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    "queryKey"
  >
}
