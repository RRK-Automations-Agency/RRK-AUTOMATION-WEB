import ServiceLanding from "../components/ServiceLanding";
import { Building2 } from "lucide-react";
import testimonials from "../data/testimonials";

export default function BusinessAutomation() {
  return (
    <ServiceLanding
      slug="business-automation"
      icon={Building2}
      accent="secondary"
      eyebrow="Business Automation"
      title="Automate the busywork running"
      titleAccent="your business"
      description="From lead intake to invoicing to reporting, we connect your tools and automate the manual steps that eat your team's time - so the work happens without anyone chasing it."
      seo={{
        title: "Business Automation",
        description:
          "End-to-end business process automation: lead intake, CRM updates, invoicing, onboarding, and reporting connected across your tools. Built in days, not months.",
        keywords:
          "business automation, business process automation, CRM automation, invoice automation, reporting automation, operations automation, no-code automation",
      }}
      stats={[
        { value: "10+", label: "Hours saved / week" },
        { value: "Zero", label: "Copy-paste" },
        { value: "48hrs", label: "First workflow live" },
      ]}
      ctaPoints={[
        "First workflow prioritized by ROI",
        "Built around the tools your team already uses",
        "Documented handover for internal ownership",
      ]}
      problems={[
        { problem: "Data retyped between spreadsheets and apps", outcome: "Tools sync automatically, no retyping" },
        { problem: "Leads logged late or lost entirely", outcome: "Every lead captured the moment it arrives" },
        { problem: "Invoices and reminders sent by hand", outcome: "Billing and reminders run on their own" },
        { problem: "Onboarding steps slip through the cracks", outcome: "New clients move through a tracked checklist" },
        { problem: "Reports built manually every week", outcome: "Dashboards refresh themselves" },
        { problem: "No one knows the status of anything", outcome: "One source of truth your team trusts" },
      ]}
      includes={[
        { title: "Tool integration", desc: "We connect your CRM, email, spreadsheets, forms, billing, and chat so data flows automatically." },
        { title: "Lead-to-CRM pipeline", desc: "Capture leads from every source and route them into your CRM with the right tags and owners." },
        { title: "Billing & reminders", desc: "Generate invoices, send payment reminders, and flag overdue accounts without manual chasing." },
        { title: "Client onboarding", desc: "Trigger welcome emails, document requests, and task checklists the moment a deal closes." },
        { title: "Automated reporting", desc: "Live dashboards and scheduled summaries so you stop rebuilding the same report." },
        { title: "Alerts that matter", desc: "Get notified only when something needs a human - not for everything." },
      ]}
      caseStudy={{
        title: "How one operations workflow saved time and reduced manual follow-up",
        description:
          "Business automation works best when it connects lead intake, internal handoff, billing, and reporting into one predictable process.",
        featureTitle: "Business Operations Workflow",
        featureDescription: "Lead capture, invoicing, onboarding, and reporting connected end to end",
        featureAlt: "Business automation operations workflow dashboard",
        items: [
          {
            industry: "Coaching Business",
            problem:
              "Lead handling, invoicing, and onboarding were spread across separate tools and required manual chasing.",
            solution:
              "Connected lead capture, reminders, onboarding steps, and reporting into one tracked workflow.",
            result: "Saved 10+ hours per week and gave the team a clearer view of what needed attention next.",
            icon: Building2,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Free audit call", desc: "We map your current process and find the steps costing the most time." },
        { title: "We build & connect", desc: "We wire up the integrations and automations, then test them against real data." },
        { title: "Launch & expand", desc: "We ship the first workflow fast, then automate the next bottleneck from there." },
      ]}
      faqs={[
        { q: "Which tools can you connect?", a: "Most mainstream CRMs, email platforms, spreadsheets, form builders, billing tools, and custom APIs. If it has an integration or API, we can usually connect it." },
        { q: "Do we have to switch software?", a: "No. We automate around the tools you already use wherever possible, so your team keeps working the way they know." },
        { q: "What if our process changes?", a: "Automations are built to be adjusted. We document everything and can update flows as your business evolves." },
        { q: "Where do we start?", a: "With the single most repetitive task. We get one workflow live in days so you see value before expanding." },
      ]}
    />
  );
}
