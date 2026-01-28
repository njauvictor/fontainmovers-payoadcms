'use client'

import React from 'react'
import clsx from 'clsx'
import { motion } from 'motion/react'

interface Props {
  className?: string
  href?: string
}

export const Logo: React.FC<Props> = ({ className, href = '/' }) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx('inline-flex flex-col items-start gap-1 select-none mb-2 ', className)}
      aria-label="Fountain Movers & Transport"
    >
      {/* Brand name */}
      <span className="text-base md:text-xl lg:text-2xl font-bold bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text ">
        Fountain Movers &amp; Transport
      </span>

      {/* Tagline */}
      <span className="text-[10px] md:text-xs font-semibold text-muted-foreground/80 dark:text-muted-foreground">
        Professional Moving Services in Nairobi
      </span>
    </motion.a>
  )
}
