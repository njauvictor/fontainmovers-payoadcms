'use client'

import React from 'react'
import { motion } from 'motion/react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

export const MediaBlockComponent: React.FC<MediaBlockProps> = ({
  title,
  description,
  mediaGallery,
  enableLink,
  link,
}) => {
  return (
    <section className="px-4 py-12 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-space-y-8 ">
        {/* Section title & description */}
        {title && (
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground dark:text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl ">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Media gallery grid */}
        {mediaGallery && mediaGallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaGallery.map((item, index) => {
              if (!item.media) return null

              return (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl transition-shadow duration-300 shadow-lg hover:shadow-xl bg-card dark:bg-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Media
                    resource={item.media}
                    imgClassName="w-full h-64 object-cover rounded-t-xl"
                    priority={index === 0}
                  />

                  {(item.caption || (enableLink && link?.url)) && (
                    <CardContent className="p-4 space-y-4">
                      {item.caption && (
                        <p className="text-muted-foreground dark:text-muted-foreground">
                          {item.caption}
                        </p>
                      )}

                      {enableLink && link?.url && (
                        <Button asChild variant="default" className="w-full">
                          <CMSLink {...link}>{link.label || 'Learn More'}</CMSLink>
                        </Button>
                      )}
                    </CardContent>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
