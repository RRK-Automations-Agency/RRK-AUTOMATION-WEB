import ServiceLanding from "../components/ServiceLanding";
import { MessageCircle } from "lucide-react";
import testimonials from "../data/testimonials";

export default function WhatsAppAutomation() {
  return (
    <ServiceLanding
      slug="whatsapp-automation"
      icon={MessageCircle}
      accent="accent"
      eyebrow="WhatsApp Automation"
      title="Turn WhatsApp into your fastest"
      titleAccent="sales channel"
      description="We set up WhatsApp Business automation that replies in seconds, follows up on its own, sends order and appointment updates, and keeps every conversation in one place."
      seo={{
        title: "WhatsApp Automation",
        description:
          "WhatsApp Business API automation: instant replies, automated follow-ups, order and appointment notifications, and broadcast campaigns. Set up in 48 hours.",
        keywords:
          "WhatsApp automation, WhatsApp Business API, WhatsApp chatbot, automated follow-up, WhatsApp notifications, WhatsApp broadcast, WhatsApp CRM",
      }}
      stats={[
        { value: "98%", label: "Open rate" },
        { value: "Instant", label: "First reply" },
        { value: "48hrs", label: "To go live" },
      ]}
      ctaPoints={[
        "Official WhatsApp Business setup",
        "Template-safe messaging aligned to platform rules",
        "Shared inbox and event-based automation included",
      ]}
      problems={[
        { problem: "Replies come hours after the customer asks", outcome: "Auto-reply greets and answers in seconds" },
        { problem: "Follow-ups forgotten when things get busy", outcome: "Sequenced follow-ups send themselves" },
        { problem: "Customers call to ask 'where's my order?'", outcome: "Status updates sent automatically" },
        { problem: "Appointments missed without reminders", outcome: "Timed reminders cut no-shows" },
        { problem: "Chats split across personal phones", outcome: "One shared inbox the whole team sees" },
        { problem: "No way to message past customers at scale", outcome: "Compliant broadcasts to opted-in contacts" },
      ]}
      includes={[
        { title: "Official WhatsApp Business API", desc: "Set up on the official API with a verified business profile - not a fragile personal-phone workaround." },
        { title: "Instant auto-replies", desc: "Greet every new chat immediately and answer common questions without anyone lifting a finger." },
        { title: "Automated follow-ups", desc: "Nudge quiet leads on a schedule you control until they reply or book." },
        { title: "Order & appointment alerts", desc: "Trigger confirmations, shipping updates, and reminders straight from your system." },
        { title: "Shared team inbox", desc: "Everyone works from the same conversation history, with notes and assignment." },
        { title: "Broadcast campaigns", desc: "Reach opted-in customers with offers and updates, within WhatsApp's policy rules." },
      ]}
      caseStudy={{
        title: "How WhatsApp automation turned a manual inbox into a faster sales channel",
        description:
          "Automated replies, follow-ups, reminders, and status updates help teams respond faster while keeping conversations compliant and visible.",
        featureTitle: "WhatsApp Follow-Up Engine",
        featureDescription: "Instant reply, reminder, and status-update flows tied to live events",
        featureAlt: "WhatsApp automation follow-up workflow dashboard",
        items: [
          {
            industry: "Real Estate Business",
            problem:
              "Property enquiries arrived on WhatsApp but responses and follow-ups depended on whoever was available.",
            solution:
              "Set up official WhatsApp automation for instant replies, qualification, and CRM-linked follow-up sequences.",
            result: "First-response speed improved immediately and the team stopped losing chats across devices.",
            icon: MessageCircle,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Free audit call", desc: "We review your customer journey and pick the highest-impact messages to automate first." },
        { title: "We build & connect", desc: "We provision the API, design the flows, and connect your CRM or store." },
        { title: "Launch & optimize", desc: "We go live, watch the first conversations, and tune timing and copy for replies." },
      ]}
      faqs={[
        { q: "Is this the official WhatsApp API?", a: "Yes. We set you up on the official WhatsApp Business Platform with a verified profile, so your account stays in good standing." },
        { q: "Can it connect to my CRM or store?", a: "Yes. We connect to most popular CRMs, e-commerce platforms, and custom systems to trigger messages from real events." },
        { q: "Will broadcasts get me banned?", a: "Not when done right. We only message opted-in contacts using approved templates, following WhatsApp's rules." },
        { q: "How fast can we launch?", a: "Typically 48 hours once the business verification clears on WhatsApp's side." },
      ]}
    />
  );
}
