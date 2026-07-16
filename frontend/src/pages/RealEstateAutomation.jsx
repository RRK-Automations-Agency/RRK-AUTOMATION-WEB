import ServiceLanding from "../components/ServiceLanding";
import { Home } from "lucide-react";
import testimonials from "../data/testimonials";

export default function RealEstateAutomation() {
  return (
    <ServiceLanding
      slug="real-estate-automation"
      icon={Home}
      accent="secondary"
      eyebrow="Real Estate Automation"
      title="Scale your property deals with smart"
      titleAccent="lead systems"
      description="We automate lead captures, qualification, property tour bookings, and client updates so agents close more sales without manual follow-up friction."
      seo={{
        title: "Real Estate Automation",
        description:
          "Automate real estate lead capture from Zillow, social media, and websites. Qualify buyers, schedule property tours, and follow up instantly. Ready in 48 hours.",
        keywords:
          "real estate CRM integration, lead capture agents, property tour booking, real estate chatbot, Zillow automation, realtor workflow automation",
      }}
      stats={[
        { value: "85%", label: "Lead response rate" },
        { value: "10x", label: "Faster tour booking" },
        { value: "48hrs", label: "Setup to launch" },
      ]}
      ctaPoints={[
        "Integrates with your existing real estate CRM",
        "Qualifies buyers and renters before you call",
        "Automated WhatsApp status and document alerts",
      ]}
      problems={[
        { problem: "Portal leads sit unanswered for hours", outcome: "Zillow and website leads followed up in seconds" },
        { problem: "Agents spend hours chasing cold prospects", outcome: "Automatic buyer/renter intent qualification" },
        { problem: "Scheduling property showings is a constant headache", outcome: "Self-serve showing slot selection for verified leads" },
        { problem: "CRM databases are outdated and empty", outcome: "Every lead interaction instantly synced to your database" },
        { problem: "Manual document chasing delays closings", outcome: "Automated WhatsApp checklists for signing files" },
        { problem: "Missing out on past client referrals", outcome: "Post-close automated check-in and review requests" },
      ]}
      includes={[
        { title: "Zillow & Portal Sync", desc: "Instantly capture leads from external listing portals and web forms." },
        { title: "Smart Buyer Qualification", desc: "Interactive chatbot screens leads for budget, timeline, and financing." },
        { title: "Showing Scheduler", desc: "Allows verified buyers to schedule property viewings based on agent calendars." },
        { title: "WhatsApp Property Alerts", desc: "Automatically notify interested buyers when new listings fit their criteria." },
        { title: "CRM Syncing", desc: "Bi-directional sync with Follow Up Boss, LionDesk, Salesforce, or HubSpot." },
        { title: "Review Campaigns", desc: "Automatically trigger Google review requests after a successful property closing." },
      ]}
      caseStudy={{
        title: "How a brokerage automated lead intake and showing bookings",
        description:
          "By connecting portal intake to custom WhatsApp flows and scheduling links, agents booked 4x more viewings from the same lead volume.",
        featureTitle: "Lead Intake & Appointment Flow",
        featureDescription: "Instant validation, qualification, and tour scheduling in one pipeline",
        featureAlt: "Real estate showing scheduler automation dashboard",
        items: [
          {
            industry: "Real Estate Brokerage",
            problem:
              "Brokers spent half their day scheduling viewing slots and chasing client details.",
            solution:
              "Deployed automated webhooks to catch portal leads, screen them via WhatsApp, and route ready buyers to calendar tools.",
            result: "Viewings booked increased by 40% and agents saved 15+ hours per week on scheduling admin.",
            icon: Home,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Map your listings & CRM", desc: "We connect your CRM, calendar availability, and lead capture sources." },
        { title: "Build qualification flows", desc: "We configure WhatsApp and web chat templates matching your script." },
        { title: "Go live & sync", desc: "We sync the systems, train agents on the dashboard, and begin routing verified leads." },
      ]}
      faqs={[
        { q: "Does it work with Follow Up Boss?", a: "Yes. We connect with Follow Up Boss, HubSpot, Salesforce, KVCore, and other popular real estate CRMs." },
        { q: "Can it verify buyer financing?", a: "Yes. The screening chatbot can ask about pre-approval status and only allow pre-approved leads to book tours." },
        { q: "How are agents notified?", a: "Agents get immediate SMS, WhatsApp, or Slack alerts the second a hot lead qualifies or schedules a viewing." },
        { q: "Can we automate tenant applications?", a: "Absolutely. We build tenant intake pipelines that send rental applications automatically." },
      ]}
    />
  );
}
