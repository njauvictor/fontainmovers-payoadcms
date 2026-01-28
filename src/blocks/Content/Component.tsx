'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import { motion } from 'motion/react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import Link from 'next/link'

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="px-4 py-8 md:px-12 lg:px-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.map((col, idx) => {
          const { enableCard, cardType, size, richText, enableLink, link, buttons } = col

          if (!enableCard) {
            return (
              <div key={idx} className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`)}>
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={cn(
                      'prose max-w-full text-foreground dark:text-foreground',
                      'prose-headings:text-foreground dark:prose-headings:text-foreground',
                      'prose-h2:text-2xl  prose-h3:text-2xl prose-h4:text-xl',
                      'md:prose-h2:text-4xl',
                      'prose-h2:font-bold prose-h3:font-semibold prose-h4:font-normal',
                      'prose-p:text-muted-foreground dark:prose-p:text-muted-foreground',
                      'prose-a:text-primary hover:prose-a:underline dark:prose-a:text-primary',
                    )}
                  />
                )}
                {enableLink && (
                  <CMSLink {...link} className="text-primary dark:text-primary hover:underline" />
                )}
              </div>
            )
          }

          const cardClasses = cn(
            'overflow-hidden rounded-xl transition-shadow duration-300',
            cardType === 'shadow' && 'shadow-lg hover:shadow-xl bg-card dark:bg-card',
            cardType === 'outline' &&
              'border border-muted/30 hover:border-primary/50 bg-card dark:bg-card',
            cardType === 'glass' &&
              'bg-white/20 backdrop-blur-lg border border-white/10 dark:bg-black/20 dark:border-white/20',
          )

          return (
            <motion.div
              key={idx}
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, cardClasses)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <CardContent className="p-6 space-y-4">
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={cn(
                      'prose max-w-full text-foreground dark:text-foreground',
                      'prose-headings:text-foreground dark:prose-headings:text-foreground',
                      'prose-p:text-muted-foreground dark:prose-p:text-muted-foreground',
                      'prose-Link:text-secondary hover:prose-Link:underline dark:prose-Link:text-secondary',
                    )}
                  />
                )}

                {buttons &&
                  buttons.length > 0 &&
                  buttons.map((btn: any, i: number) => (
                    <Button key={i} asChild variant={btn.variant || 'default'} className="w-full">
                      <Link href={btn.url}>{btn.label}</Link>
                    </Button>
                  ))}

                {enableLink && (
                  <CMSLink {...link} className="text-primary dark:text-primary hover:underline" />
                )}
              </CardContent>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
