import { cn } from "@/shared/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion"
import Image from "next/image"

interface CategoryItemProps {
  category: ICategory
  subcategoryId: string
  onSelectSubcategory: (id: string) => void
}

const CategoryItem = ({ category, subcategoryId, onSelectSubcategory }: CategoryItemProps) => {
  return (
    <Accordion key={category.id} type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="rounded border border-none border-input px-2 py-0 text-sm transition hover:bg-accent hover:text-accent-foreground"
      >
        <AccordionTrigger className="py-2 text-start hover:no-underline">
          <div className="flex items-center gap-4">
            <Image src={category.icon} alt={category.name} width={20} height={20} />
            {category.name}
          </div>
        </AccordionTrigger>
        {category.subcategories.map((subcategory) => (
          <AccordionContent
            key={subcategory.id}
            className={cn("pb-0 pt-2 hover:text-primary", {
              "font-semibold text-primary": subcategory.id === subcategoryId
            })}
            onClick={() => onSelectSubcategory(subcategory.id)}
          >
            <span className="cursor-pointer">{subcategory.name}</span>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  )
}

export { CategoryItem }
