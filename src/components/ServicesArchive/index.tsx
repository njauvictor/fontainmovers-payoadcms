import { cn } from '@/utilities/ui'
import React from 'react'

import { ServicesCard, CardServiceData } from '@/components/ServicesCard'

export type Props = {
  services: CardServiceData[]
  className?: string
}

export const ServicesArchive: React.FC<Props> = ({ services, className }) => {
  return (
    <div className={cn('px-4 sm:px-8 md:px-12 lg:px-16 mb-8', className)}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {services?.map((service, index) => {
            if (typeof service === 'object' && service !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <ServicesCard className="h-full" doc={service} relationTo="service" />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
