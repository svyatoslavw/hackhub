import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps {
  category: ICategory
  subcategoryId: string
  updateSubcategoryId: (id: string) => void
}

const CategoryLink = ({ category, subcategoryId, updateSubcategoryId }: CategoryItemProps) => {
  return (
    <Accordion key={category.id} type="single" collapsible>
      <AccordionItem
        value={category.id}
        className="rounded border border-none border-input px-2 py-0 text-sm transition-all hover:bg-accent hover:text-accent-foreground"
      >
        <AccordionTrigger className="py-2 text-start hover:no-underline">
          <div className="flex items-center gap-4">
            <Image src={category.icon} alt={category.name} width={20} height={20} />
            {category.name}
          </div>
        </AccordionTrigger>
        {category.subcategories.map((subcategory) => (
          <AccordionContent key={subcategory.id} className={"pb-0 pt-2 hover:text-primary"}>
            <Link href={"/forum"}>
              <span className="cursor-pointer">{subcategory.name}</span>
            </Link>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  )
}

export { CategoryLink }
