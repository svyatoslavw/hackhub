import { clsx, type ClassValue } from "clsx"
import { format, isToday, isYesterday } from "date-fns"
import { enUS } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthURL = (provider: string): string => {
  return `${process.env.SERVER_URL}/auth/${provider}-init`
}

export function formatPostDate(date: string) {
  const parsedDate = new Date(date)

  if (isToday(parsedDate)) {
    return `Today, at ${format(parsedDate, "HH:mm", { locale: enUS })}`
  } else if (isYesterday(parsedDate)) {
    return `Yesterday, at ${format(parsedDate, "HH:mm", { locale: enUS })}`
  } else {
    return format(parsedDate, "dd MMMM yyyy, в HH:mm", { locale: enUS })
  }
}

export function formatDate(date: string) {
  const parsedDate = new Date(date)

  return format(parsedDate, "dd MMMM yyyy", { locale: enUS })
}

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null

  return function (this: any, ...args: any[]) {
    const context = this

    const later = () => {
      timeout = null
      func.apply(context, args)
    }

    clearTimeout(timeout!)
    timeout = setTimeout(later, wait)
  }
}

export function getPageNumbers(current: number, total: number) {
  const maxVisibleCount = 3
  let start = Math.max(current - 1, 1)
  let end = start + maxVisibleCount - 1

  if (end > total) {
    end = total
    start = Math.max(end - maxVisibleCount + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
