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
  const {
    className,
    doc,
    relationTo = 'service',
    title: titleFromProps,
    showDescription = true,
  } = props

  const { slug, heroImage, title, content, meta } = doc || {}
  const { description: metaDescription } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = metaDescription?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

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

    return textContent.length > 140 ? textContent.substring(0, 140) + '...' : textContent
  }

  const displayDescription = sanitizedDescription || getContentExcerpt()

  return (
    <article
      ref={card.ref}
      className={cn(
        'group rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className,
      )}
    >
      {/* IMAGE CONTAINER - fixed ratio */}
      <div className="relative w-full h-56 sm:h-60 md:h-64 overflow-hidden bg-muted">
        {heroImage && typeof heroImage !== 'string' ? (
          <Media
            resource={heroImage}
            size="33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {titleToUse && (
          <h3 className="text-lg font-semibold leading-snug">
            <Link href={href} ref={link.ref} className="hover:text-primary transition-colors">
              {titleToUse}
            </Link>
          </h3>
        )}

        {showDescription && displayDescription && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{displayDescription}</p>
        )}
      </div>
    </article>
  )
}
