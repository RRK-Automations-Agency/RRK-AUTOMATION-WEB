import ServiceLanding from "../components/ServiceLanding";
import { Presentation } from "lucide-react";
import testimonials from "../data/testimonials";

export default function ConsultingAutomation() {
  return (
    <ServiceLanding
      slug="consulting-automation"
      icon={Presentation}
      accent="secondary"
      eyebrow="Consulting Automation"
      title="Automate discovery calls & client"
      titleAccent="intake systems"
      description="We build lead qualifying flows, self-serve scheduling setups, contract automations, and onboarding file collectors so consultants can focus on advice."
      seo={{
        title: "Consulting Automation",
        description:
          "Automate consulting lead qualification, client scheduling, retainer invoicing, secure document sign-offs, and onboarding setups. Ready in 48 hours.",
        keywords:
          "consulting business systems, qualification forms, Calendly CRM sync, automated client intake, proposal generator, advisor tools integration",
      }}
      stats={[
        { value: "95%", label: "Lead qualification accuracy" },
        { value: "12 hrs", label: "Admin work saved/week" },
        { value: "48hrs", label: "Consultant portal live" },
      ]}
      ctaPoints={[
        "Pre-screen low-budget inquiries automatically",
        "Generate contracts and proposals instantly from calls",
        "Set up workspaces and kickoff files for paid projects",
      ]}
      problems={[
        { problem: "Calendar packed with low-budget inquiries", outcome: "Inquiries must pre-screen budget and needs before booking" },
        { problem: "Hours spent writing consulting proposals manually", outcome: "Proposals draft automatically based on intake answers" },
        { problem: "New clients waiting days for kickoff materials", outcome: "Kickoff docs, links, and folders sent instantly on contract sign" },
        { problem: "Unpaid invoices delay kickoff meetings", outcome: "Wired workflows hold bookings until payment clearing completes" },
        { problem: "Chasing clients for survey assets and files", outcome: "Secure customized intake forms with auto-reminder loops" },
        { problem: "No systematic follow-up with past clients", outcome: "Automated retention campaigns and check-ins every 90 days" },
      ]}
      includes={[
        { title: "Smart Screening Engine", desc: "Qualify prospective clients on budget, timeline, and needs before they calendar." },
        { title: "Proposal Generator", desc: "Auto-draft scope documents and custom proposals using pre-saved content blocks." },
        { title: "Payment & Kickoff Bridge", desc: "Trigger client agreements, Stripe payments, and kickoff emails in one seamless flow." },
        { title: "Document Chaser", desc: "Send automated text/email notifications to client teams for missing files." },
        { title: "Automated PMS Setup", desc: "Instantly create client projects and task boards in Notion, ClickUp, or Asana." },
        { title: "Retention Automations", desc: "Trigger follow-up sequences to check in with past consulting clients automatically." },
      ]}
      caseStudy={{
        title: "How an agency consultant saved 10 hours a week on client setup",
        description:
          "Automating lead qualification forms and document signing pipelines allowed a consultant to double their client capacity.",
        featureTitle: "Qualify to Kickoff Pipeline",
        featureDescription: "Pre-screening, Calendly lock, proposal draft, invoice send, and kickoff checklist",
        featureAlt: "Consultant workflow automation map",
        items: [
          {
            industry: "Strategic Consulting",
            problem:
              "The consultant spent hours taking calls with unqualified leads and drafting project agreements by hand.",
            solution:
              "Built pre-screening filters before calendar bookings and connected signatures to automatic project board setups.",
            result: "Unqualified calls dropped by 80%. PM setups went from hours of work to instant execution.",
            icon: Presentation,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Map consulting templates", desc: "We review your client intakes, standard packages, agreement structures, and project tools." },
        { title: "Wired intake pipeline", desc: "We build screening rules, calendar blocks, invoice links, and document triggers." },
        { title: "Live simulation & launch", desc: "We run test intakes, verify signature workflows, and launch the portal live." },
      ]}
      faqs={[
        { q: "Can we restrict scheduling to paid sessions?", a: "Yes. We can integrate payment gateways directly into the calendar step, ensuring clients pay before booking." },
        { q: "Which proposal tools do you support?", a: "PandaDoc, DocuSign, Better Proposals, HelloSign, and PDF-generation sheets." },
        { q: "Will I lose leads with screening questions?", a: "No. It redirects unqualified leads to lower-tier options or newsletters, preserving your calendar for high-ticket clients." },
        { q: "How long does setup take?", a: "Typical consulting pipelines are fully configured and live within 48 to 72 hours." },
      ]}
    />
  );
}
