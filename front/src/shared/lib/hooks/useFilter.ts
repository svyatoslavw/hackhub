import { TypeDataFilters, updateQueryParam } from "@/entities/filter/model/filter.slice"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"

export const useFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const { queryParams, isFilterUpdated } = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  useEffect(() => {
    searchParams?.forEach((value, key) => {
      dispatch(
        updateQueryParam({
          key: key as keyof TypeDataFilters,
          value
        })
      )
    })
  }, [dispatch, searchParams])

  const updateQueryParams = (key: keyof TypeDataFilters, value: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    if (value) {
      newParams.set(key, String(value))
    } else {
      newParams.delete(key)
    }

    replace(pathname + (newParams.toString() ? `?${newParams.toString()}` : ""))
    dispatch(updateQueryParam({ key, value }))
  }

  return {
    updateQueryParams,
    queryParams,
    isFilterUpdated
  }
}
