import ServiceLanding from "../components/ServiceLanding";
import { Cloud } from "lucide-react";
import testimonials from "../data/testimonials";

export default function SaaSAutomation() {
  return (
    <ServiceLanding
      slug="saas-automation"
      icon={Cloud}
      accent="accent"
      eyebrow="SaaS Automation"
      title="Automate SaaS onboarding & customer"
      titleAccent="success flows"
      description="We sync signups, automate workspace setups, stream product metrics to CRMs, and route support requests so your SaaS scales efficiently."
      seo={{
        title: "SaaS Automation",
        description:
          "Automate SaaS operations: connect payment systems (Stripe) to CRM pipelines, trigger user onboarding emails, sync analytics, and route customer success tasks. Ready in 48 hours.",
        keywords:
          "SaaS onboarding automation, Stripe CRM sync, product analytics pipeline, HubSpot SaaS setup, customer success workflows, Intercom Slack integration",
      }}
      stats={[
        { value: "40%", label: "Trial activation boost" },
        { value: "0", label: "Missed trial follow-ups" },
        { value: "48hrs", label: "Integration speed" },
      ]}
      ctaPoints={[
        "Connect Stripe/billing directly to user tracking",
        "Automate workspace and account creation sequences",
        "Pushes real-time user metrics directly to your sales team",
      ]}
      problems={[
        { problem: "Trial users sign up and never log back in", outcome: "Automated behavior-based email and SMS reactivation flows" },
        { problem: "Stripe payments are disconnected from CRM records", outcome: "Real-time sync of subscriptions, upgrades, and cancellations" },
        { problem: "Sales team doesn't know who the power users are", outcome: "Product usage metrics streamed straight to CRM records" },
        { problem: "Customer support tickets get lost in Slack", outcome: "Bi-directional ticket sync and routing to designated queues" },
        { problem: "New team accounts need manual database provisioning", outcome: "Automated database setups and seat allocation flows" },
        { problem: "High subscription churn rate with zero feedback", outcome: "Automated cancellation surveys and win-back sequences" },
      ]}
      includes={[
        { title: "Billing & CRM Synchronization", desc: "Keep subscription updates, upgrades, and invoices synced between Stripe and your CRM." },
        { title: "Behavioral Onboarding Triggers", desc: "Send targeted messages based on what features users have or haven't clicked." },
        { title: "Usage Streamer", desc: "Sync user activity metrics straight to Salesforce or HubSpot contact records." },
        { title: "Churn Prevention Loops", desc: "Automate cancellation feedback collections and trigger targeted win-back discount emails." },
        { title: "Team Seat Provisioner", desc: "Automate organization setup, database configurations, and invitation updates." },
        { title: "Slack / Discord Bots", desc: "Get real-time Slack/Discord alerts when new customers sign up or upgrade." },
      ]}
      caseStudy={{
        title: "How a B2B SaaS increased free trial conversion by 35%",
        description:
          "By syncing product usage metrics to the sales team's CRM, reps reached out to active accounts at the perfect conversion window.",
        featureTitle: "Product Activity to Sales Pipeline",
        featureDescription: "Usage monitoring, CRM scoring, representative alerts, and outreach triggers",
        featureAlt: "SaaS sales intelligence dashboard flow",
        items: [
          {
            industry: "B2B Software",
            problem:
              "The sales team had no visibility into which trial users were actively engaging with the software.",
            solution:
              "Connected Segment/Mixpanel event streams directly to HubSpot CRM, triggering Slack alerts for hot leads.",
            result: "Trial-to-paid conversions increased by 35% and sales response times dropped by 90%.",
            icon: Cloud,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Map SaaS endpoints", desc: "We review your SaaS API endpoints, billing software, and target database fields." },
        { title: "Wired data pipelines", desc: "We connect event webhooks, setup user-scoring rules, and map fields to your CRM." },
        { title: "Test & launch", desc: "We run end-to-end user trials, verify billing updates, and launch the production pipeline." },
      ]}
      faqs={[
        { q: "Which CRM platforms do you support?", a: "HubSpot, Salesforce, Pipedrive, ActiveCampaign, and custom setups." },
        { q: "Can we trigger emails based on database events?", a: "Yes. We set up webhooks that trigger email campaigns in Customer.io, Mailchimp, or Loops." },
        { q: "Is customer billing data kept secure?", a: "Absolutely. No financial information is stored. We only route metadata status updates (e.g. 'paid', 'canceled')." },
        { q: "How long does setup take?", a: "Typical SaaS synchronization setups are built and launched in 48 to 72 hours." },
      ]}
    />
  );
}
