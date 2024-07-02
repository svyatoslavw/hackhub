const Footer = () => {
  return (
    <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <a href="/terms" className="underline underline-offset-4 hover:text-primary">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
        Privacy Policy
      </a>
    </p>
  )
}

export { Footer }
