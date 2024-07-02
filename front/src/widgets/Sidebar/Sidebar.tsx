"use client"
import { CategoryItem } from "@/entities/category/ui/CategoryItem"
import { updatePost } from "@/entities/post/model/post.slice"
import { CreateCategory, CreateSubcategory } from "@/features"
import { useGetAllCategoriesQuery } from "@/shared/api/queries/useGetAllCategoriesQuery"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { SidebarDropdown } from "./SidebarDropdown"
import { SidebarSkeleton } from "./SidebarSkeleton"

const Sidebar = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery()

  const dispatch = useAppDispatch()

  const subcategoryId = useAppSelector((state) => state.post.subcategoryId)

  const onSelectSubcategory = (id: string) => {
    dispatch(updatePost({ key: "subcategoryId", value: id }))
  }

  return (
    <div className="selec flex h-full w-[250px] flex-col gap-2 rounded-xl bg-[#ededed] px-2 py-2 dark:bg-popover">
      <SidebarDropdown {...{ categories: categories || [], subcategoryId, onSelectSubcategory }} />
      {/* Demo creating */}
      <CreateCategory />
      <CreateSubcategory />
      {isLoading && <SidebarSkeleton />}
      {categories &&
        categories.map((category) => (
          <CategoryItem key={category.id} {...{ category, subcategoryId, onSelectSubcategory }} />
        ))}
    </div>
  )
}

export { Sidebar }
