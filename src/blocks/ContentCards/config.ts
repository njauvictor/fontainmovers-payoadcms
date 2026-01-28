import type { Block, Field } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'cardStyle',
    type: 'select',
    defaultValue: 'shadow',
    options: [
      { label: 'Shadow', value: 'shadow' },
      { label: 'Outline', value: 'outline' },
      { label: 'Glass', value: 'glass' },
    ],
  },
  {
    name: 'cardBg',
    type: 'text',
    admin: { description: 'Optional Tailwind background classes (e.g., bg-primary/10)' },
  },
  {
    name: 'cardBorder',
    type: 'text',
    admin: { description: 'Optional Tailwind border classes (e.g., border-red-500)' },
  },
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
  },
  {
    name: 'icon',
    type: 'text',
    admin: { description: 'Optional Lucide icon name for card (e.g., "Star", "Heart")' },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media', // or your images collection
    admin: { description: 'Optional card image' },
  },
  {
    name: 'footerLinks',
    type: 'array',
    fields: [
      link({
        overrides: {
          admin: {
            description: 'Footer link for the card',
          },
        },
      }),
    ],
  },
]

export const CardsBlock: Block = {
  slug: 'cardsBlock',
  interfaceName: 'CardsBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
