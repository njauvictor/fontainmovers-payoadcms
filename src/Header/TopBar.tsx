'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Topbar() {
  const [hideTopBar, setHideTopBar] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setHideTopBar(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <motion.div
        className="bg-secondary/90 backdrop-blur-md"
        animate={{
          y: hideTopBar ? '-100%' : '0%',
          opacity: hideTopBar ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="text-white mx-auto max-w-7xl px-4 py-2 md:px-8 lg:px-16 flex flex-wrap gap-6 justify-center md:justify-between">
          <div className="flex gap-4 text-xs">
            <a
              href="tel:0720479096"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0720479096</span>
            </a>

            <a
              href="mailto:info@fountainmovers.co.ke"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@fountainmovers.co.ke</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Makarios Building – Manyanja Rd, Donholm</span>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
