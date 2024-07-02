import { useSpring } from "@react-spring/web"

const ConversationDots = () => {
  const dot1 = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    config: { duration: 500 },
    delay: 0
  })

  const dot2 = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    config: { duration: 500 },
    delay: 200
  })

  const dot3 = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    config: { duration: 500 },
    delay: 400
  })

  return (
    <div className="flex items-end gap-1">
      <div className="animate-blink1 h-3 w-3 rounded-full bg-zinc-700" />
      <div className="animate-blink2 h-3 w-3 rounded-full bg-zinc-700" />
      <div className="animate-blink3 h-3 w-3 rounded-full bg-zinc-700" />
    </div>
  )
}

export { ConversationDots }
