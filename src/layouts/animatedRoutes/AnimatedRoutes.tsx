import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, useLocation } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Page from '../Page'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function AnimatedRoutes(props: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery();
  const location = useLocation()

  return (
    !isDesktop ? (
      <AnimatePresence initial={false}>
        <Page key={location.key}>
          <Suspense fallback={<Loader />}>
            <Routes location={location} key={location.key}>
              {props.children}
            </Routes>
          </Suspense>
        </Page>
      </AnimatePresence>
    ) : (
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.key}>
          {props.children}
        </Routes>
      </Suspense>
    )
  )
}