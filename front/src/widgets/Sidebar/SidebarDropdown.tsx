import { CategoryItem } from "@/entities/category/ui/CategoryItem"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import Link from "next/link"
import { useMemo } from "react"

interface CategoryItemProps {
  categories: ICategory[]
  subcategoryId: string
  onSelectSubcategory: (id: string) => void
}

const SidebarDropdown = ({ categories, onSelectSubcategory, subcategoryId }: CategoryItemProps) => {
  const selectedSubcategory = useMemo(() => {
    return categories.find((cat) => cat.subcategories.find((subcat) => subcat.id === subcategoryId))
  }, [categories, subcategoryId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"w-full"} size={"sm"}>
          Create a topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] xl:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Choose a section</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input placeholder="Search..." autoFocus={false} />
          <Button disabled={!subcategoryId}>
            <Link href={"/forum/create"}>
              Create a topic {subcategoryId && `in ${selectedSubcategory?.name}`}
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {categories.map((category) => (
            <CategoryItem key={category.id} {...{ category, subcategoryId, onSelectSubcategory }} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SidebarDropdown }
