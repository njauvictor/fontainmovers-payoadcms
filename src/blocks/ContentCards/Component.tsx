'use client'

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { ContentBlock } from '@/payload-types'
import * as LucideIcons from 'lucide-react'

export type CardStyle = 'shadow' | 'outline' | 'glass'

type CardsBlockProps = {
  columns?: ContentBlock['columns']
}

export const CardsBlock: React.FC<CardsBlockProps> = ({ columns }) => {
  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">
        {columns?.map((col: any, index: number) => {
          const { size = 'oneThird', richText } = col
          const column = col as any

          const cardClasses = cn(
            'rounded-xl transition-all duration-300',
            column.cardStyle === 'shadow' && 'shadow-lg',
            column.cardStyle === 'outline' && `border ${column.cardBorder || 'border-primary/30'}`,
            column.cardStyle === 'glass' && 'bg-white/20 backdrop-blur-md border border-white/10',
            column.cardBg,
          )

          const IconComponent = column.icon ? (LucideIcons as any)[column.icon] : null

          const sizeKey = (size || 'oneThird') as keyof typeof colsSpanClasses
          return (
            <div key={index} className={cn(`col-span-4 lg:col-span-${colsSpanClasses[sizeKey]}`)}>
              <Card className={cardClasses}>
                <CardContent className="space-y-4">
                  {/* Optional image */}
                  {column.image && typeof column.image === 'object' && (
                    <Media
                      resource={column.image}
                      imgClassName="rounded-md w-full object-cover h-40"
                    />
                  )}

                  {/* Optional icon */}
                  {IconComponent && (
                    <div className="mb-2 size-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <IconComponent className="size-6 text-primary" />
                    </div>
                  )}

                  {/* Card title */}
                  {column.title && (
                    <h3 className="text-xl font-bold text-foreground">{column.title}</h3>
                  )}

                  {/* Separator */}
                  <hr className="border-t border-primary/20" />

                  {/* Card description */}
                  {column.description && (
                    <p className="text-muted-foreground">{column.description}</p>
                  )}

                  {/* RichText content */}
                  {richText && (
                    <RichText
                      data={richText}
                      enableGutter={false}
                      className="prose max-w-full text-foreground dark:prose-invert"
                    />
                  )}
                </CardContent>

                {/* Card Footer with links/buttons */}
                {column.footerLinks && column.footerLinks.length > 0 && (
                  <CardFooter className="flex flex-wrap gap-2 pt-2">
                    {column.footerLinks.map((linkItem: any, idx: number) => (
                      <CMSLink
                        key={idx}
                        {...linkItem}
                        className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-primary/30 text-sm font-semibold hover:bg-primary/5 transition"
                      />
                    ))}
                  </CardFooter>
                )}
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
