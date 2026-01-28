'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    number: '1',
    title: 'Get Free Consultation',
    description: 'Contact us for a free assessment of your moving needs and requirements.',
  },
  {
    number: '2',
    title: 'Receive Custom Quote',
    description: 'We provide a detailed, transparent quote with no hidden charges.',
  },
  {
    number: '3',
    title: 'Plan Your Move',
    description: 'Our team works with you to create a detailed moving plan and timeline.',
  },
  {
    number: '4',
    title: 'Execution',
    description: 'Professional movers execute your move with precision and care.',
  },
  {
    number: '5',
    title: 'Setup & Support',
    description: 'We assist with unpacking, arrangement, and post-move cleanup.',
  },
]

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our simple 5-step process makes moving easy.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              <Card className="h-full border border-secondary hover:border-primary/50 hover:shadow-xl transition-all bg-background0 text-foreground">
                <CardHeader className="items-start text-left">
                  <motion.div
                    className="w-12 h-12 bg-background0 text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>
                  <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                </CardHeader>

                <CardContent className="text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Connector */}
              {idx < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/3 -right-1 w-5 h-0.5 bg-linear-to-r from-primary to-primary/50"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
