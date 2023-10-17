import { AnimatePresence } from 'framer-motion'
import { Routes, useLocation, useNavigate } from 'react-router-dom'

const AnimatedRoutes = (props: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        {props.children}
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes