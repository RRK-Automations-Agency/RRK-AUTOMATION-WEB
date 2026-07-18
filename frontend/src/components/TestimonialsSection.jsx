import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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

  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const updateItems = () => setItemsPerPage(getItemsPerPage());
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [totalPages, currentPage]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const visibleItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className={`${sectionPadding} bg-muted/30`}>
      <div className="section-container">
        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium text-muted-foreground mb-2"
        >
          Trusted by 400+ businesses across multiple industries.
        </motion.p>

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

        {/* Carousel */}
        <div className="relative">
          {totalPages > 1 && (
            <button
              onClick={goPrev}
              className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary/10 transition-colors shadow-sm"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`page-${currentPage}-count-${itemsPerPage}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid gap-8"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
                }}
              >
                {visibleItems.map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${currentPage}-${index}`}
                    className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-secondary/40 hover:shadow-elevated"
                  >
                    <div className="mb-6 flex gap-1">
                      {Array.from({ length: testimonial.rating ?? 5 }).map(
                        (_, starIndex) => (
                          <Star
                            key={starIndex}
                            className="h-5 w-5 fill-yellow-500 text-yellow-500"
                          />
                        ),
                      )}
                    </div>

                    <p className="mb-8 leading-relaxed text-foreground/90">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <button
              onClick={goNext}
              className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary/10 transition-colors shadow-sm"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-secondary w-6"
                    : "bg-border hover:bg-secondary/40"
                }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
