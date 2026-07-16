import ServiceLanding from "../components/ServiceLanding";
import { Workflow } from "lucide-react";
import testimonials from "../data/testimonials";

export default function WorkflowAutomation() {
  return (
    <ServiceLanding
      slug="workflow-automation"
      icon={Workflow}
      accent="accent"
      eyebrow="Workflow Automation"
      title="Connect your apps into one"
      titleAccent="automated workflow"
      description="We design and build custom workflows with n8n, Make, and Zapier that move data between your apps, trigger actions automatically, and run reliably in the background."
      seo={{
        title: "Workflow Automation",
        description:
          "Custom workflow automation with n8n, Make, and Zapier. Connect your apps, sync data, and trigger actions automatically with reliable, monitored workflows.",
        keywords:
          "workflow automation, n8n development, Make automation, Zapier automation, API integration, data sync, automated workflows, integration consultant",
      }}
      stats={[
        { value: "n8n", label: "Make · Zapier" },
        { value: "100%", label: "Hands-off runs" },
        { value: "48hrs", label: "First flow live" },
      ]}
      ctaPoints={[
        "Right platform selected for cost and complexity",
        "Monitoring and retry logic built into delivery",
        "Clear documentation before handover",
      ]}
      problems={[
        { problem: "Apps that don't talk to each other", outcome: "Data flows between them automatically" },
        { problem: "Manual exports and imports every week", outcome: "Syncs run on a schedule or on trigger" },
        { problem: "Workflows that break silently", outcome: "Monitoring and alerts when something fails" },
        { problem: "Zaps that hit limits and stall", outcome: "Right tool for the job, built to scale" },
        { problem: "Logic too complex for off-the-shelf tools", outcome: "Custom steps and code where needed" },
        { problem: "No documentation of how things work", outcome: "Every workflow mapped and handed over" },
      ]}
      includes={[
        { title: "Custom workflow design", desc: "We map the triggers, steps, and conditions, then build them in the platform that fits best." },
        { title: "n8n, Make & Zapier", desc: "We pick the right tool for reliability and cost - and can self-host n8n for full control." },
        { title: "API integrations", desc: "When no connector exists, we integrate directly with the app's API." },
        { title: "Data transformation", desc: "Clean, format, and map data between systems so it lands correctly every time." },
        { title: "Error handling & alerts", desc: "Retries, fallbacks, and notifications so a failed run never goes unnoticed." },
        { title: "Documentation & handover", desc: "Clear diagrams and notes so your team can understand and own the workflows." },
      ]}
      caseStudy={{
        title: "How a monitored workflow replaced manual app-to-app work",
        description:
          "The right workflow setup removes exports, imports, and silent failures while keeping your team informed only when something actually needs attention.",
        featureTitle: "Monitored App Integration Flow",
        featureDescription: "Automated sync, conditional logic, and failure alerts across core tools",
        featureAlt: "Workflow automation monitoring dashboard",
        items: [
          {
            industry: "Agency Operations",
            problem:
              "Data had to be exported, cleaned, and re-entered across multiple tools every week.",
            solution:
              "Built a monitored workflow in n8n with transformation steps, API calls, and alerting for failed runs.",
            result: "The sync became hands-off for normal cases and only surfaced exceptions when a human was actually needed.",
            icon: Workflow,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Free audit call", desc: "We map the apps involved and the exact trigger-to-outcome path you need." },
        { title: "We build & test", desc: "We build the workflow, transform the data, and test it against real edge cases." },
        { title: "Launch & monitor", desc: "We deploy with error handling and alerts, then hand over full documentation." },
      ]}
      faqs={[
        { q: "Which platform will you use?", a: "Whichever fits your needs and budget. We use n8n (often self-hosted), Make, or Zapier, and we'll explain the trade-offs before building." },
        { q: "Can you self-host n8n for us?", a: "Yes. For data control or high volume, we can run n8n on your own infrastructure and maintain it." },
        { q: "What about apps without integrations?", a: "We connect directly to their API. If the app exposes data, we can almost always automate it." },
        { q: "What happens if a workflow fails?", a: "We build in retries and fallbacks, and set up alerts so you know immediately if something needs attention." },
      ]}
    />
  );
}
