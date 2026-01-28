import type { Service } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { ServicesArchive } from '@/components/ServicesArchive'
import { cn } from '@/utilities/ui'

// Define the props interface locally since ServicesBlock might not be in payload-types yet
export interface ServicesBlockProps {
  id?: string
  introContent?: any
  populateBy?: 'collection' | 'selection'
  relationTo?: 'services'
  categories?: any[] // Services don't have categories, but keeping for compatibility
  limit?: number
  selectedDocs?: Array<{
    relationTo: 'services'
    value: number | Service
  }>
}

export const ServicesBlock: React.FC<
  ServicesBlockProps & {
    id?: string
  }
> = async (props) => {
  const { introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let services: Service[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    // Services don't have categories, so we just fetch all services
    const fetchedServices = await payload.find({
      collection: 'services',
      depth: 1,
      limit,
      sort: '-publishedAt', // Sort by published date, most recent first
    })

    services = fetchedServices.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedServices = selectedDocs.map((service) => {
        if (typeof service.value === 'object') return service.value
      }) as Service[]

      services = filteredSelectedServices
    }
  }

  return (
    <div className="my-16 lg:my-24 ">
      {introContent && (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 mb-8">
          <RichText
            data={introContent}
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
        </div>
      )}
      <ServicesArchive services={services} />
    </div>
  )
}
