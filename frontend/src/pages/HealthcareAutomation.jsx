import ServiceLanding from "../components/ServiceLanding";
import { Stethoscope } from "lucide-react";
import testimonials from "../data/testimonials";

export default function HealthcareAutomation() {
  return (
    <ServiceLanding
      slug="healthcare-automation"
      icon={Stethoscope}
      accent="secondary"
      eyebrow="Healthcare Automation"
      title="Automate patient scheduling & clinic"
      titleAccent="operations securely"
      description="We build secure appointment alerts, patient intake syncs, billing updates, and review collections so medical clinics can focus on patient care."
      seo={{
        title: "Healthcare Automation",
        description:
          "Secure healthcare workflow automation. Automate patient scheduling reminders, secure intake forms, EHR synchronization, and invoice updates. Ready in 48 hours.",
        keywords:
          "healthcare workflow automation, medical patient intake, appointment reminders WhatsApp, clinic CRM integration, EHR synchronization, doctor scheduling systems",
      }}
      stats={[
        { value: "92%", label: "Appointment show rate" },
        { value: "15 hrs", label: "Saved per staff/week" },
        { value: "48hrs", label: "Clinic setup time" },
      ]}
      ctaPoints={[
        "Secure, encrypted patient data flows",
        "Automated WhatsApp appointment confirmations and reminders",
        "Direct synchronization with clinic EHR/PMS systems",
      ]}
      problems={[
        { problem: "Patients forgetting appointments (high no-shows)", outcome: "Automated WhatsApp and SMS reminders with confirm/reschedule links" },
        { problem: "Manual data entry of paper patient intake forms", outcome: "Secure online intake forms that sync directly to EHRs" },
        { problem: "Chasing outstanding patient invoice balances", outcome: "Automated balance reminders with secure payment links" },
        { problem: "Staff spending hours calling to confirm appointments", outcome: "Self-serve booking portals with live calendar sync" },
        { problem: "Low volume of online doctor reviews", outcome: "Post-visit text campaigns asking for Google/Zocdoc reviews" },
        { problem: "Delayed patient referrals routing", outcome: "Instant referral notifications and appointment invitations" },
      ]}
      includes={[
        { title: "WhatsApp Appointment Reminders", desc: "Send patients instant booking notices and automated reminders leading up to slots." },
        { title: "Secure Intake Forms", desc: "Build online intake paths that capture medical histories and agreements securely." },
        { title: "EHR / PMS Integrations", desc: "Sync contact data and appointment histories directly with systems like Athena or Jane." },
        { title: "Review Campaigns", desc: "Automatically trigger patient feedback requests after clinic appointments close." },
        { title: "Automated Invoicing", desc: "Generate invoices, update insurance flags, and email payment links automatically." },
        { title: "Referrals Tracker", desc: "Track patient source metrics and update referring doctors automatically." },
      ]}
      caseStudy={{
        title: "How a medical clinic reduced appointment no-shows by 75%",
        description:
          "Switching from phone calls to interactive WhatsApp reminders increased patient confirmations and optimized scheduling.",
        featureTitle: "Patient Reminder & Update Loop",
        featureDescription: "Booking sync, confirmation alerts, reschedule buttons, and clinic prep notes",
        featureAlt: "Healthcare clinic appointment workflow dashboard",
        items: [
          {
            industry: "Multi-Location Clinic",
            problem:
              "No-shows cost the clinic thousands weekly, and staff spent 12 hours a week calling patients.",
            solution:
              "Deployed automated WhatsApp reminder chains that allowed patients to confirm or reschedule in one tap.",
            result: "No-show rate fell from 18% to 4%, and clinic staff saved hours of phone time weekly.",
            icon: Stethoscope,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Audit clinic workflow", desc: "We map your PMS/EHR scheduling, client data paths, and notification rules." },
        { title: "Deploy secure pipelines", desc: "We set up secure intake forms, SMS/WhatsApp templates, and database synchronizations." },
        { title: "Live testing & launch", desc: "We test patient notifications, run security checks, and go live on clinic lines." },
      ]}
      faqs={[
        { q: "Is the system secure and compliant?", a: "Yes. All data pipelines utilize secure APIs and encryption protocols to align with strict patient privacy guidelines." },
        { q: "Can we customize the reminder schedule?", a: "Yes. Reminders can be scheduled at custom intervals (e.g. 7 days, 2 days, and 2 hours before the visit)." },
        { q: "Does it work with Athenahealth?", a: "Yes. We connect to Athenahealth, Jane App, DrChrono, and other medical practice management software." },
        { q: "Can patients reschedule via text?", a: "Yes. They can click a link in the message to change their appointment time instantly." },
      ]}
    />
  );
}
