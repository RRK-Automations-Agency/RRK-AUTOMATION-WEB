import ServiceLanding from "../components/ServiceLanding";
import { GraduationCap } from "lucide-react";
import testimonials from "../data/testimonials";

export default function EducationAutomation() {
  return (
    <ServiceLanding
      slug="education-automation"
      icon={GraduationCap}
      accent="secondary"
      eyebrow="Education Automation"
      title="Automate course enrollment & student"
      titleAccent="communications"
      description="We automate enrollment syncs, student follow-ups, fee alerts, and certificate deliveries so educational brands and academy owners scale instruction."
      seo={{
        title: "Education Automation",
        description:
          "Wired educational workflow automation. Automate student course enrollment, WhatsApp study alerts, tuition fee notifications, and certificate generation. Ready in 48 hours.",
        keywords:
          "education workflow systems, student portal automation, course registration CRM, WhatsApp study reminders, automated certificate generator, academy tools integration",
      }}
      stats={[
        { value: "90%", label: "Student engagement rate" },
        { value: "20 hrs", label: "Saved per course/month" },
        { value: "48hrs", label: "Academy platform live" },
      ]}
      ctaPoints={[
        "Syncs LMS signups directly to student records",
        "Automates student progress alerts on WhatsApp",
        "Auto-generates verified course completion certificates",
      ]}
      problems={[
        { problem: "Students registering but never starting the course", outcome: "Automated WhatsApp tips and starting encouragements" },
        { problem: "Manual copy-paste of student details to lists", outcome: "Real-time sync of registrations to central CRM files" },
        { problem: "Chasing outstanding course tuition balances", outcome: "Fee reminder notifications with direct payment links" },
        { problem: "Designing and emailing certificates manually", outcome: "PDF completion certificates generated and emailed on course completion" },
        { problem: "Low student feedback and course reviews", outcome: "Triggered feedback requests sent 24 hours after course finishes" },
        { problem: "Student support requests piling up in Slack", outcome: "AI study bots resolving common student platform FAQs 24/7" },
      ]}
      includes={[
        { title: "LMS & CRM Sync", desc: "Connect platforms like Teachable, Kajabi, or Thinkific to CRM pipelines automatically." },
        { title: "WhatsApp Course Updates", desc: "Send class reminders, Zoom links, and assignments directly to student phones." },
        { title: "Fee Reminder Pipeline", desc: "Generate tuition invoices, update billing records, and email payment reminders." },
        { title: "Certificate Generator", desc: "Auto-draft and deliver PDF certificates of completion on user milestone events." },
        { title: "AI Study Assistant", desc: "Deploy bots that resolve course dashboard questions and platform access FAQs." },
        { title: "Course Feedback Loops", desc: "Gather ratings, feedback, and student reviews automatically after course closures." },
      ]}
      caseStudy={{
        title: "How an online academy scaled enrollment syncs and certificate delivery",
        description:
          "Connecting course registration to database trackers and completion events reduced student admin work by 90%.",
        featureTitle: "Registration to Graduation Loop",
        featureDescription: "Signup sync, milestone check, certificate generate, and review collection",
        featureAlt: "Educational student workflow diagram",
        items: [
          {
            industry: "Online Academy",
            problem:
              "The academy team spent days copying student names to sheets and manually generating PDF certificates.",
            solution:
              "Built workflows that synced Teachable signups to ActiveCampaign and auto-emailed PDF certificates on course completions.",
            result: "Manual course administration cut by 90%. Student satisfaction scores improved immediately.",
            icon: GraduationCap,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Audit academy stack", desc: "We review your LMS configurations, course rosters, payment processors, and client tools." },
        { title: "Wired data flows", desc: "We deploy registration triggers, calendar blocks, PDF generators, and notification webhooks." },
        { title: "Test & launch", desc: "We test student onboarding paths, check PDF generation files, and launch public pipelines." },
      ]}
      faqs={[
        { q: "Which LMS platforms do you support?", a: "Teachable, Kajabi, Thinkific, Podia, Canvas, Moodle, and custom portal APIs." },
        { q: "Can we generate certificates automatically?", a: "Yes. Once a student marks the course complete, a PDF certificate is generated and emailed." },
        { q: "Is patient/student data kept secure?", a: "Yes. Student records are secured using standard API authorization and encrypted databases." },
        { q: "How long does setup take?", a: "Typical academy communication setups are fully built and launched in 48 to 72 hours." },
      ]}
    />
  );
}
