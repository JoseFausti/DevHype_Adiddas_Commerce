import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, hash, search])
  return null
}

export default ScrollToTop
