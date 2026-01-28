'use client'

import React from 'react'
import { motion, type Variants } from 'motion/react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, links, media }) => {
  /* ---------------- Animations ---------------- */

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 h-72 w-72 md:h-96 md:w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 md:h-112 md:w-md rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl py-12 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          {/* Left content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center rounded-md border border-secondary/60 bg-secondary/20 px-4 py-2 text-xs font-medium text-secondary/90 dark:text-white"
            >
              ✨ Professional Moving Solutions
            </motion.span>

            {richText && (
              <motion.div variants={itemVariants}>
                <RichText
                  data={richText}
                  enableGutter={false}
                  className="
                    prose
                    max-w-xl
                    text-foreground
                      /* Headings */
    prose-h1:font-bold
    prose-h1:text-2xl
    md:prose-h1:text-5xl
  
    prose-h2:font-semibold
    prose-h2:text-3xl
    font-normal
    prose-h3:text-2xl
    prose-h4:font-normal
    prose-h5:font-normal
    prose-h6:font-normal

    /* Paragraphs */
    prose-p:text-muted-foreground
    prose-p:text-base
                    dark:prose-invert
                  "
                />
              </motion.div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center"
              >
                {links.map(({ link }, i) => {
                  const isPrimary = i === 0

                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={isPrimary ? 'default' : 'outline'}
                      className={clsx(
                        'flex items-center justify-center gap-2 py-6 px-8 text-base shadow-lg',
                        !isPrimary && 'border-2 border-primary/30',
                      )}
                    >
                      {/* Only render the icon, CMSLink will render the label */}
                      {isPrimary ? (
                        <ArrowRight className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </CMSLink>
                  )
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative order-first md:order-last"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/30 to-primary/5 blur-2xl" />

            {media && typeof media === 'object' && (
              <Media
                resource={media}
                imgClassName="relative z-10 h-full w-full rounded-3xl object-cover shadow-2xl"
                priority
              />
            )}

            <motion.div
              className="absolute -bottom-4 -left-4 z-50 rounded-lg bg-secondary/90 p-4 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-semibold text-card-foreground text-lg">⭐ 4.9/5 Rating</p>
              <p className="text-sm text-muted-foreground ">From 200+ verified reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
