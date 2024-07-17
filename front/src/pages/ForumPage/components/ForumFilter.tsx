import { EnumPostCreatedSort } from "@/entities/filter/model/filter.slice"
import { FilterSelect } from "@/entities/filter/ui/FilterSelect"
import { useFilter } from "@/shared/lib/hooks/useFilter"

export interface IForumSelect {
  id: string
  name: string
  value: string
}

const FILTER_OPTIONS = {
  ANSWER1: [
    { id: "1", name: "By last answer", value: "lastAnswer" },
    { id: "2", name: "By creation date", value: "createdAt" },
    { id: "3", name: "By number of answers", value: "count" },
    { id: "4", name: "No answers", value: "closed" }
  ],
  SORT: [
    { id: "1", name: "By ascending", value: EnumPostCreatedSort.NEWEST },
    { id: "2", name: "By descending", value: EnumPostCreatedSort.OLDEST }
  ],
  RANGE: [
    { id: "1", name: "Less than a day ago", value: "day" },
    { id: "2", name: "Less than a week ago", value: "week" },
    { id: "3", name: "Less than a month ago", value: "month" },
    { id: "4", name: "Less than a year ago", value: "year" }
  ],
  ANSWERS4: [
    { id: "1", name: "Active", value: "ACTIVE" },
    { id: "2", name: "Closed", value: "CLOSED" }
  ]
}

const ForumFilter = ({ subcategories }: { subcategories: ISubcategory[] }) => {
  const { updateQueryParams, queryParams } = useFilter()

  return (
    <div className="flex gap-1 rounded bg-foreground/[0.02] p-2">
      <FilterSelect
        name="sort"
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        data={FILTER_OPTIONS.SORT}
      />
      <FilterSelect
        name="range"
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        data={FILTER_OPTIONS.RANGE}
      />
      <FilterSelect
        name="subcategory"
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        data={[
          { id: "all", name: "All", value: "all" },
          ...subcategories.map((subcategory) => ({
            id: subcategory.id,
            name: subcategory.name,
            value: subcategory.id
          }))
        ]}
      />
    </div>
  )
}

export { ForumFilter }
