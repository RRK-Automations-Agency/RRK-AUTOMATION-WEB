import { Button } from "../components/ui/button";
import {
  Calendar,
  MessageCircle,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Phone,
  Building2,
  User,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { getSupabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { useCalendlyGate } from "./CalendlyLeadGate";
import TurnstileWidget from "./TurnstileWidget";

const ContactSection = () => {
  const { toast } = useToast();
  const { openGate } = useCalendlyGate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [turnstileError, setTurnstileError] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken) {
      newErrors.turnstile = "Please complete the security check";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const sb = await getSupabase();
      const { error } = await sb.functions.invoke("submit-lead", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          business_name: formData.business.trim() || null,
          message: formData.message.trim(),
          company_website: "",
          turnstile_token: turnstileToken || undefined,
        },
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", business: "", message: "" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass =
    "w-full px-4 py-3.5 pl-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:border-secondary focus:ring-2 focus:ring-secondary/30 outline-none transition-all text-sm";

  return (
    <section id="contact" className="relative py-28 bg-muted/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s Automate Your Growth
          </h2>
          <p className="text-muted-foreground text-lg">
            Book a free automation audit or send us a message below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Left — Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-8 space-y-5">
              <h3 className="text-lg font-bold mb-2">Quick Connect</h3>

              <button
                type="button"
                onClick={() => openGate({ source: "contact" })}
                className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Book Free Audit</p>
                  <p className="text-xs text-muted-foreground">15-minute strategy call</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/918341374436"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Instant response</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:rrkautomations@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Send Email</p>
                  <p className="text-xs text-muted-foreground">rrkautomations@gmail.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Response Badge */}
            <div className="flex items-center gap-3 p-4 bg-card/60 rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm">Fast Response</p>
                <p className="text-xs text-muted-foreground">We respond within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Send Us a Message</h3>
                  <p className="text-xs text-muted-foreground">We&apos;ll get back to you shortly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={inputClass}
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-muted-foreground/50" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your automation needs... *"
                    className="w-full px-4 py-3.5 pl-12 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:border-secondary focus:ring-2 focus:ring-secondary/30 outline-none transition-all text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>
                  )}
                </div>

                {/* Cloudflare Turnstile */}
                <TurnstileWidget
                  key={formData.message} // reset on form clear
                  onVerify={setTurnstileToken}
                  onError={() => setTurnstileError(true)}
                />
                {errors.turnstile && (
                  <p className="text-red-500 text-xs text-center">{errors.turnstile}</p>
                )}
                {turnstileError && (
                  <p className="text-amber-500 text-xs text-center">
                    Security check unavailable. Please refresh if the issue persists.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Fields marked with * are required
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;