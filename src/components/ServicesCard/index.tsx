'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Service } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardServiceData = Pick<Service, 'slug' | 'heroImage' | 'title' | 'content' | 'meta'>

export const ServicesCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardServiceData
  relationTo?: 'service'
  title?: string
  showDescription?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps, showDescription = true } = props

  const { slug, heroImage, title, content, meta } = doc || {}
  const { description: metaDescription } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = metaDescription?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Extract a short description from content if no meta description exists
  const getContentExcerpt = () => {
    if (!content?.root?.children) return null

    const textContent = content.root.children
      .filter((child) => child.type === 'paragraph' && Array.isArray(child.children))
      .map((paragraph) =>
        (paragraph.children as any[])
          .filter((child: any) => child.type === 'text')
          .map((textNode: any) => textNode.text)
          .join(''),
      )
      .join(' ')
      .trim()

    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent
  }

  const displayDescription = sanitizedDescription || getContentExcerpt()

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video">
        {!heroImage && (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        {heroImage && typeof heroImage !== 'string' && (
          <Media resource={heroImage} size="33vw" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose prose-headings:m-0 prose-headings:mb-2">
            <h3 className="text-lg font-semibold">
              <Link
                className="not-prose hover:text-primary transition-colors"
                href={href}
                ref={link.ref}
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {showDescription && displayDescription && (
          <div className="mt-2 text-base text-muted-foreground line-clamp-4">
            <p>{displayDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
