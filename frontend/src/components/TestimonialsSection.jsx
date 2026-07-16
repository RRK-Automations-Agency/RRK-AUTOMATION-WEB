import { motion } from "framer-motion";
import { Star } from "lucide-react";
import testimonials from "../data/testimonials";

export default function TestimonialsSection({
  items = testimonials,
  eyebrow = "Testimonials",
  title = "What Our Clients Say",
  description = "Real feedback from businesses that automated their growth with us.",
  density = "normal",
}) {
  const sectionPadding = density === "compact" ? "py-20" : "py-28";
  const headingMargin = density === "compact" ? "mb-14" : "mb-20";

  return (
    <section className={`${sectionPadding} bg-muted/30`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mx-auto max-w-3xl text-center ${headingMargin}`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
            {eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-secondary/40 hover:shadow-elevated"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: testimonial.rating ?? 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-5 w-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="mb-8 leading-relaxed text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
