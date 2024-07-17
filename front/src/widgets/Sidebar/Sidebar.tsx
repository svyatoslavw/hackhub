"use client"
import { CategoryLink } from "@/entities/category/ui/CategoryLink"
import { updatePost } from "@/entities/post/model/post.slice"
import { CreateCategory, CreateSubcategory } from "@/features"
import { useGetAllCategoriesQuery } from "@/shared/api/queries/useGetAllCategoriesQuery"
import { useFilter } from "@/shared/lib/hooks/useFilter"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { SidebarDropdown } from "./SidebarDropdown"
import { SidebarSkeleton } from "./SidebarSkeleton"

const Sidebar = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery()

  const dispatch = useAppDispatch()
  const { queryParams, updateQueryParams } = useFilter()

  const subcategoryId = useAppSelector((state) => state.post.subcategoryId)

  const onSelectSubcategory = (id: string) => {
    dispatch(updatePost({ key: "subcategoryId", value: id }))
  }

  const updateSubcategoryId = (id: string) => {
    updateQueryParams("subcategory", id)
  }

  return (
    <div className="flex h-full w-[250px] flex-col gap-2 rounded-xl bg-foreground/[0.02] p-2">
      <SidebarDropdown {...{ categories: categories || [], subcategoryId, onSelectSubcategory }} />
      {/* Demo creating */}
      <CreateCategory />
      <CreateSubcategory />
      {isLoading && <SidebarSkeleton />}
      {categories &&
        categories.map((category) => (
          <CategoryLink
            key={category.id}
            {...{ category, subcategoryId: queryParams.subcategory || "", updateSubcategoryId }}
          />
        ))}
    </div>
  )
}

export { Sidebar }
