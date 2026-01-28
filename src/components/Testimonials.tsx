'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'

const reviews = [
  {
    id: 1,
    name: 'Sarah Kipchoge',
    role: 'Tech Startup CEO',
    company: 'TechFlow Solutions',
    rating: 5,
    text: 'Fountain Movers made our office relocation seamless. Professional team, no damage to equipment, and they finished ahead of schedule. Highly recommended!',
    verified: true,
  },
  {
    id: 2,
    name: 'James Mwangi',
    role: 'Business Owner',
    company: 'Mwangi Enterprises',
    rating: 5,
    text: 'Best moving experience ever. They handled our entire household with care. The whole process was smooth and well-organized from start to finish.',
    verified: true,
  },
  {
    id: 3,
    name: 'Grace Omondi',
    role: 'Marketing Director',
    company: 'Creative Agency',
    rating: 5,
    text: 'Affordable, professional, and trustworthy. They even helped us with furniture arrangement in our new home. Five stars without a doubt!',
    verified: true,
  },
  {
    id: 4,
    name: 'Peter Kiplagat',
    role: 'Property Manager',
    company: 'Nairobi Properties',
    rating: 5,
    text: 'We use Fountain Movers for all our client relocations. They are reliable, punctual, and very professional. Highly trustworthy partner for our business.',
    verified: true,
  },
  {
    id: 5,
    name: 'Margaret Njeri',
    role: 'Home Owner',
    company: 'Residential Client',
    rating: 5,
    text: 'Outstanding service! They took care of my elderly parents belongings like it was their own. Very respectful and patient throughout the process.',
    verified: true,
  },
  {
    id: 6,
    name: 'David Kariuki',
    role: 'Corporate Manager',
    company: 'Finance Corp Kenya',
    rating: 5,
    text: 'Professional team handled our office equipment with expertise. Insurance coverage was transparent and the pricing was competitive. Best decision!',
    verified: true,
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm">CUSTOMER TESTIMONIALS</p>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Customer Testimonials
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Join 500+ satisfied customers who have trusted Fountain Movers for their relocation
            needs across Nairobi and beyond.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { stat: '500+', label: 'Happy Clients' },
            { stat: '5.0', label: 'Average Rating' },
            { stat: '98%', label: 'Recommendation Rate' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="text-left p-4 border border-secondary rounded-lg hover:border-primary/30 transition"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
              <div className="text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-secondary hover:border-primary/50 hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 italic min-h-24">
                    &quot;{review.text}&quot;
                  </p>

                  <div className="border-t border-secondary mb-4" />

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        {review.name}
                        {review.verified && (
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/20 rounded-full">
                            <svg
                              className="w-3 h-3 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                      <p className="text-xs text-muted-foreground opacity-70">{review.company}</p>
                    </div>

                    <div className="w-10 h-10 bg-linear-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Ready to experience our service? Get in touch today!
          </p>

          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
