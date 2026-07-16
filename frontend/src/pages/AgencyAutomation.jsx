import ServiceLanding from "../components/ServiceLanding";
import { Users } from "lucide-react";
import testimonials from "../data/testimonials";

export default function AgencyAutomation() {
  return (
    <ServiceLanding
      slug="agency-automation"
      icon={Users}
      accent="secondary"
      eyebrow="Agency Automation"
      title="Scale client deliverables without"
      titleAccent="hiring more team"
      description="We automate lead captures, client onboarding, Slack notifications, task setups, and monthly reports so your agency runs like clockwork."
      seo={{
        title: "Agency Automation",
        description:
          "Automate your marketing or creative agency. Sync client onboarding, project setup, Slack alerts, CRM updates, and report generation in 48 hours.",
        keywords:
          "agency CRM setup, client onboarding automation, automated client reporting, Slack automation, marketing agency systems, automated workspace setup",
      }}
      stats={[
        { value: "10+ hrs", label: "Saved per client" },
        { value: "0", label: "Manual setup mistakes" },
        { value: "48hrs", label: "Integration setup" },
      ]}
      ctaPoints={[
        "Automated workspace setups (ClickUp, Notion, Slack)",
        "Zero delay client kickoff and contract sequences",
        "Auto-generate visual KPI sheets and reports",
      ]}
      problems={[
        { problem: "New clients wait days for kickoff documents", outcome: "Kickoff assets and invoices sent instantly on payment" },
        { problem: "Project managers wasting hours setting up tools", outcome: "Automated creation of PM tasks, folders, and shared files" },
        { problem: "Team misses lead updates across multiple platforms", outcome: "Unified central alerts pushed directly into Slack/Teams" },
        { problem: "Generating monthly report decks takes days", outcome: "KPI dashboards auto-updated with live campaign statistics" },
        { problem: "Contract signatures delay project starts", outcome: "Automated document chasing with custom text reminders" },
        { problem: "Clients complaining about poor communication", outcome: "Automated project progress notifications sent automatically" },
      ]}
      includes={[
        { title: "Onboarding Pipelines", desc: "Automate contract signatures, initial invoice delivery, and onboarding intake forms." },
        { title: "Instant PM Creation", desc: "Instantly build folders and templates in ClickUp, Asana, Notion, or Trello." },
        { title: "Slack / Teams Bots", desc: "Alert your team about lead status, contract signs, and invoice payments automatically." },
        { title: "Reporting Aggregators", desc: "Extract metrics from Meta, Google Ads, and analytics directly into client dashboards." },
        { title: "Dynamic CRM Pipelines", desc: "Move agency deals through pipeline stages automatically based on actual events." },
        { title: "Feedback Automation", desc: "Trigger NPS score surveys and testimonial request emails automatically." },
      ]}
      caseStudy={{
        title: "How an agency automated onboarding and saved 12 hours per client",
        description:
          "Connecting client payments to PM setups and Slack alerts cut onboarding time from 3 days to under 5 minutes.",
        featureTitle: "Payment to Project Workflow",
        featureDescription: "Stripe alerts, ClickUp setups, Slack notifications, and client kickoff email chains",
        featureAlt: "Agency client onboarding automation flow",
        items: [
          {
            industry: "Marketing Agency",
            problem:
              "Setting up ClickUp projects, contracts, and Slack channels manually delayed client starts by days.",
            solution:
              "Wired Stripe triggers to generate legal contracts, open custom Slack channels, and build ClickUp boards automatically.",
            result: "Client startup lag eliminated entirely. PM workload reduced by 15 hours every month.",
            icon: Users,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Audit your tech stack", desc: "We map your CRM, PM tools, chat software, and financial programs." },
        { title: "Configure standard templates", desc: "We create folders, documents, and notifications structures." },
        { title: "Deploy workflows", desc: "We link payments to setups and run clean end-to-end client simulations." },
      ]}
      faqs={[
        { q: "Which PM systems do you support?", a: "ClickUp, Notion, Asana, Monday.com, Trello, Jira, and Basecamp." },
        { q: "Can we auto-generate custom reports?", a: "Yes. We connect marketing API data directly to Google Looker Studio, Sheets, or custom portals." },
        { q: "Is payment integration secure?", a: "Yes. All data routing uses secure encrypted webhooks directly with platforms like Stripe, PayPal, or Razorpay." },
        { q: "How long does setup take?", a: "We build and deploy typical agency workflows within 48 to 72 hours." },
      ]}
    />
  );
}
