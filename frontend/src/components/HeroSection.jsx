import { Button } from "../components/ui/button";
import { MessageCircle, Calendar, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useCalendlyGate } from "./CalendlyLeadGate";
import { useIsMobile } from "../hooks/useIsMobile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const { openGate } = useCalendlyGate();
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-pulse" />

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tech Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/30 mb-8 backdrop-blur-md"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                48-Hour Automation Delivery • Limited Weekly Slots
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            >
              AI Automations
              <br className="hidden sm:block" />
              <span className="text-accent drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                & Complete Software Solutions
              </span>{" "}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              We design automation systems for agencies, startups, and growing
              businesses — helping you capture leads, follow up instantly, and
              convert prospects automatically.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button
                variant="cta"
                size="xl"
                className="w-full sm:w-auto"
                onClick={() => openGate({ source: "hero" })}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Free Audit
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>

              <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
                <a
                  href="https://wa.me/918341374436"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ask on WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeUp}
              className="mt-16 pt-8 border-t border-border"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 md:gap-0 md:divide-x divide-border text-center">
                <div className="md:px-8 py-2">
                  <p className="text-2xl font-bold text-secondary">523+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Projects Delivered</p>
                </div>
                <div className="md:px-8 py-2">
                  <p className="text-2xl font-bold text-accent">400+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Happy Clients</p>
                </div>
                <div className="md:px-8 py-2">
                  <p className="text-2xl font-bold text-secondary">50+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Mobile & Web Apps</p>
                </div>
                <div className="md:px-8 py-2">
                  <p className="text-2xl font-bold text-white">5.5+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Visual — only mounted on desktop to save mobile data */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1.1, x: 30, y: -100 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
               <div className="relative z-10 rounded-[2rem] border border-white/10 bg-card/30 backdrop-blur-2xl p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
                  <video
                    src="/hero-video-opt.mp4"
                    poster="/hero-poster.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 pointer-events-none" />
               </div>

               {/* Decorative Elements */}
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
