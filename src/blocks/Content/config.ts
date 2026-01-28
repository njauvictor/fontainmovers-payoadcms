import type { Block, Field } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { MediaBlock } from '../MediaBlock/config'
import { Banner } from '../Banner/config'
import { CallToAction } from '../CallToAction/config'

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
    name: 'enableCard',
    type: 'checkbox',
    defaultValue: true,
    label: 'Show Card?',
  },
  {
    name: 'cardType',
    type: 'select',
    label: 'Card Type',
    defaultValue: 'shadow',
    options: [
      { label: 'Shadow', value: 'shadow' },
      { label: 'Outline', value: 'outline' },
      { label: 'Glassmorphism', value: 'glass' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures, defaultFeatures }) => [
        ...rootFeatures,
        ...defaultFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        BlocksFeature({ blocks: [MediaBlock, Banner, CallToAction] }),
      ],
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
  {
    name: 'buttons',
    type: 'array',
    label: 'Buttons',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'url', type: 'text' },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
        ],
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
