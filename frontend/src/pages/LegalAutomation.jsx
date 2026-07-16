import ServiceLanding from "../components/ServiceLanding";
import { Briefcase } from "lucide-react";
import testimonials from "../data/testimonials";

export default function LegalAutomation() {
  return (
    <ServiceLanding
      slug="legal-automation"
      icon={Briefcase}
      accent="accent"
      eyebrow="Legal Automation"
      title="Automate legal paperwork & client"
      titleAccent="intake pipelines"
      description="We streamline client intake, contract generation, calendar deadlines, and secure document collection so law firms can focus on billable casework."
      seo={{
        title: "Legal Automation",
        description:
          "Automate law firm workflows: client intake forms, legal document drafting, court deadline trackers, and secure client file intake. Ready in 48 hours.",
        keywords:
          "law firm automation, legal document generation, client intake form integration, law practice CRM, court deadline tracker, secure document portal",
      }}
      stats={[
        { value: "70%", label: "Admin time drop" },
        { value: "0", label: "Missed filing deadlines" },
        { value: "48hrs", label: "System installation" },
      ]}
      ctaPoints={[
        "Streamlines client intakes and pre-screens cases",
        "Auto-drafts retainer agreements and contracts",
        "Ensures calendar and deadline syncs securely",
      ]}
      problems={[
        { problem: "Lawyers spending hours copying case details", outcome: "Dynamic client intake forms that populate databases automatically" },
        { problem: "Manual drafting of standard legal retainers", outcome: "Retainer templates generated instantly from intake answers" },
        { problem: "Missed deadlines due to unsynced calendars", outcome: "Automated court and case deadlines pushed to all team calendars" },
        { problem: "Clients sending files via disorganized emails", outcome: "Secure customized file upload request pipelines" },
        { problem: "Chasing clients for missing document uploads", outcome: "Automated text/email notification loops for missing files" },
        { problem: "Billing hours are lost or forgotten", outcome: "Automated prompts and timesheet updates based on file events" },
      ]}
      includes={[
        { title: "Intake Forms Engine", desc: "Build smart forms that capture contact and case details directly from prospects." },
        { title: "Document Generator", desc: "Draft PDF contracts, NDAs, and representation letters using dynamic template files." },
        { title: "Deadline Automation", desc: "Calculate filing timelines and push tasks to outlook and Google calendars automatically." },
        { title: "Secure Upload Portal", desc: "Dynamic upload requests that place files into structured folders instantly." },
        { title: "Time Tracking Alerts", desc: "Integrate document edits with hourly tracking tools like Clio or TimeSolv." },
        { title: "Secure E-Signature", desc: "Trigger DocuSign or HelloSign flows automatically for quick sign-offs." },
      ]}
      caseStudy={{
        title: "How a law firm automated client intake and saved 10 hours per case",
        description:
          "Connecting online discovery forms to client agreements reduced lead response times and client setup costs by 70%.",
        featureTitle: "Client Intake & Retainer Setup",
        featureDescription: "Prospect intake, CRM creation, agreement drafting, and signature requests",
        featureAlt: "Legal client onboarding automation flowchart",
        items: [
          {
            industry: "Family Law Practice",
            problem:
              "Client details were hand-typed from paper forms into case systems, delaying start times by days.",
            solution:
              "Built online intake workflows that pre-screened cases, updated Clio, and sent retainers automatically.",
            result: "Manual paperwork reduced by 85%. Client signup speed improved from days to minutes.",
            icon: Briefcase,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Define case templates", desc: "We map out your fields, standard client agreements, and calendar deadlines." },
        { title: "Build secure pathways", desc: "We deploy secure intake forms, auto-document actions, and CRM connections." },
        { title: "Train & launch", desc: "We train staff on document triggers, run test intakes, and launch securely." },
      ]}
      faqs={[
        { q: "Is the data storage secure and compliant?", a: "Yes. All workflows are built to follow strict data security standards, using encrypted pipelines and secure storage integrations." },
        { q: "Can it integrate with Clio?", a: "Yes. We support Clio, PracticePanther, MyCase, and other popular legal practice management software." },
        { q: "Can we review drafts before they go to clients?", a: "Absolutely. We build approval gates where drafts are held in 'review' status until an attorney clicks approve." },
        { q: "How long does setup take?", a: "Typical legal systems go live within 48 to 72 hours of the onboarding kickoff." },
      ]}
    />
  );
}
