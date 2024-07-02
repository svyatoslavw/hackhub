import { useLayoutEffect, useState } from "react"

export const useAnchor = () => {
  const [isShow, setIsShow] = useState(false)

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsShow(scrollTop > 0)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { isShow }
}
