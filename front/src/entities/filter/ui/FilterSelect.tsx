import type { IForumSelect } from "@/pages/ForumPage/components/ForumFilter"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select"
import type { TypeDataFilters } from "../model/filter.slice"

interface IRangeFilter {
  data: IForumSelect[]
  name: keyof TypeDataFilters
  queryParams: TypeDataFilters
  updateQueryParams: (key: keyof TypeDataFilters, value: string) => void
}

const FilterSelect = ({ data, name, queryParams, updateQueryParams }: IRangeFilter) => {
  return (
    <Select
      onValueChange={(field) => {
        field !== "all" ? updateQueryParams(name, field) : updateQueryParams(name, "")
      }}
      defaultValue={queryParams[name] || data[0].value}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((option) => (
            <SelectItem key={option.id} value={option.value || ""}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { FilterSelect }
