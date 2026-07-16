import ServiceLanding from "../components/ServiceLanding";
import { Wrench } from "lucide-react";
import testimonials from "../data/testimonials";

export default function LocalServicesAutomation() {
  return (
    <ServiceLanding
      slug="local-services-automation"
      icon={Wrench}
      accent="secondary"
      eyebrow="Local Services Automation"
      title="Automate appointment booking & field"
      titleAccent="dispatch alerts"
      description="We automate job scheduling, dispatcher alerts, client text updates, and Google review collection so local businesses win more regional jobs."
      seo={{
        title: "Local Services Automation",
        description:
          "Automate contracting and service businesses: online appointment scheduling, WhatsApp booking confirmations, dispatch notices, and automatic reviews. Ready in 48 hours.",
        keywords:
          "contractor booking automation, HVAC scheduling software, automated dispatch text, home services CRM, review collection campaign, local business workflows",
      }}
      stats={[
        { value: "95%", label: "First-contact booking" },
        { value: "10+ hrs", label: "Saved per week" },
        { value: "48hrs", label: "Setup to launch" },
      ]}
      ctaPoints={[
        "Syncs site forms directly to scheduling apps",
        "Automated WhatsApp updates with technician names",
        "Triggers Google review requests after project closures",
      ]}
      problems={[
        { problem: "Missed phone calls mean lost client jobs", outcome: "AI chatbots book service calls instantly online 24/7" },
        { problem: "Manually typing customer details to jobs", outcome: "Inbound leads sync straight to field calendars" },
        { problem: "Customers waiting home with zero status updates", outcome: "WhatsApp dispatch notices showing technician ETAs" },
        { problem: "Chasing clients for payment after job completion", outcome: "Invoices and secure booking links emailed instantly" },
        { problem: "Low volume of local Google Map reviews", outcome: "Review requests texted automatically post-job completion" },
        { problem: "No follow-up on estimates that were sent", outcome: "Automated check-ins for pending job proposals" },
      ]}
      includes={[
        { title: "24/7 Booking Assistant", desc: "Collect job details and schedule appointments directly from web or mobile chat." },
        { title: "WhatsApp Dispatch Alerts", desc: "Automate appointment confirmations, reminders, and technician ETA texts." },
        { title: "Field CRM Integrations", desc: "Sync job details directly with platforms like ServiceTitan, Housecall Pro, or Jobber." },
        { title: "Review Chaser Loops", desc: "Text clients a Google review link automatically when a job is marked closed." },
        { title: "Estimate Follow-ups", desc: "Draft and schedule email reminders to follow up on pending estimate proposals." },
        { title: "Invoice & Pay System", desc: "Email receipts, generate invoices, and text secure payment links after jobs." },
      ]}
      caseStudy={{
        title: "How an HVAC firm automated bookings and doubled Google reviews",
        description:
          "By syncing client job completion to review triggers and SMS updates, booking administration was reduced by 70%.",
        featureTitle: "Field Booking to Review Loop",
        featureDescription: "Job creation, dispatch alerts, invoice email, and review requests",
        featureAlt: "Contractor job workflow diagram",
        items: [
          {
            industry: "HVAC Services",
            problem:
              "The office manager spent hours calling clients to confirm appointments and asking for online reviews.",
            solution:
              "Connected Jobber to WhatsApp notification templates, sending confirmations and automated review requests post-visit.",
            result: "Office admin time cut by 12 hours weekly, and Google reviews tripled in 60 days.",
            icon: Wrench,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Map business stack", desc: "We review your calendar, payment processors, dispatch systems, and booking pipelines." },
        { title: "Wired scheduling gates", desc: "We deploy booking forms, SMS templates, billing links, and feedback loops." },
        { title: "Live testing & launch", desc: "We run test client booking schedules, verify SMS alerts, and launch the workflows." },
      ]}
      faqs={[
        { q: "Which CRM software do you support?", a: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, HubSpot, and custom setups." },
        { q: "Can we dispatch alerts to technicians?", a: "Yes. Dispatch notifications can be sent via WhatsApp, SMS, or Slack to client teams." },
        { q: "Is payment collection secure?", a: "Yes. Payment links utilize encrypted Stripe, PayPal, or Razorpay gateways securely." },
        { q: "How long does setup take?", a: "Typical contractor scheduling setups go live within 48 to 72 hours of kickoff." },
      ]}
    />
  );
}
