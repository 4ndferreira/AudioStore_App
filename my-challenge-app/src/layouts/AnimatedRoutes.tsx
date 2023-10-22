import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, useLocation } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import Page from './Page'

export default function AnimatedRoutes(props: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence initial={false}>
      <Page key={location.key}>
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>
            {props.children}
          </Routes>
        </Suspense>
      </Page>
    </AnimatePresence>
  )
}