import ServiceLanding from "../components/ServiceLanding";
import { Bot } from "lucide-react";
import testimonials from "../data/testimonials";

export default function AIChatbots() {
  return (
    <ServiceLanding
      slug="ai-chatbots"
      icon={Bot}
      accent="secondary"
      eyebrow="AI Chatbots"
      title="AI chatbots that qualify, answer, and"
      titleAccent="book - 24/7"
      description="We build AI assistants trained on your business that handle support questions, qualify leads, and hand warm prospects to your team - on your website, WhatsApp, and Instagram."
      seo={{
        title: "AI Chatbots",
        description:
          "Custom AI chatbots that answer customer questions, qualify leads, and book calls around the clock across web, WhatsApp, and Instagram. Live in 48 hours.",
        keywords:
          "AI chatbot development, AI customer support, lead qualification bot, website chatbot, AI sales assistant, GPT chatbot, conversational AI",
      }}
      stats={[
        { value: "24/7", label: "Always answering" },
        { value: "<5s", label: "Reply time" },
        { value: "48hrs", label: "To go live" },
      ]}
      ctaPoints={[
        "Free audit call before any build starts",
        "Trained on your approved business content",
        "Human handoff for edge-case conversations",
      ]}
      problems={[
        { problem: "Leads message at midnight and get no reply", outcome: "Instant answers any hour, every day" },
        { problem: "Same 20 questions answered by hand daily", outcome: "The bot handles repetitive questions for you" },
        { problem: "Hot leads go cold before a human sees them", outcome: "Qualified leads routed to you in real time" },
        { problem: "Support tickets pile up overnight", outcome: "Most are resolved before your team logs on" },
        { problem: "No record of what visitors actually ask", outcome: "Every conversation captured and searchable" },
        { problem: "Generic bots that frustrate customers", outcome: "Trained on your docs, so answers are accurate" },
      ]}
      includes={[
        { title: "Trained on your business", desc: "We feed the assistant your FAQs, docs, pricing, and policies so answers match how you actually work." },
        { title: "Lead capture built in", desc: "Name, email, phone, and intent are collected mid-conversation and saved to your pipeline." },
        { title: "Human handoff", desc: "When a question needs a person, the bot routes the chat and notifies your team instantly." },
        { title: "Multi-channel", desc: "One assistant across your website, WhatsApp, and Instagram DMs - consistent everywhere." },
        { title: "Booking integration", desc: "Visitors who are ready can book a call without leaving the chat." },
        { title: "Analytics", desc: "See what people ask most, where they drop off, and which conversations convert." },
      ]}
      caseStudy={{
        title: "How a chatbot reduced lead wait time and improved booking quality",
        description:
          "A tailored chatbot flow can answer repeat questions, qualify intent, and hand ready prospects to your team with context already captured.",
        featureTitle: "AI Chat Qualification Flow",
        featureDescription: "Instant answers, lead capture, and meeting handoff in one flow",
        featureAlt: "AI chatbot qualification workflow dashboard",
        items: [
          {
            industry: "Marketing Agency",
            problem:
              "New enquiries were arriving after hours and sitting unanswered until the next morning.",
            solution:
              "Built a trained AI chatbot that answered FAQs, qualified intent, and pushed warm leads into the booking flow.",
            result: "Lead response time dropped to under 30 seconds and the team spent more time on sales calls.",
            icon: Bot,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Free audit call", desc: "We map your top questions, channels, and what a qualified lead looks like for you." },
        { title: "We build & train", desc: "We connect your content, set the tone of voice, and wire up lead capture and handoff." },
        { title: "Launch & tune", desc: "We go live on your channels and refine answers from real conversations in week one." },
      ]}
      faqs={[
        { q: "Which channels can it run on?", a: "Your website, WhatsApp Business, and Instagram - usually all from one trained assistant." },
        { q: "Will it give wrong answers?", a: "It answers from your approved content. For anything outside that, it asks a clarifying question or hands off to your team rather than guessing." },
        { q: "How long until it's live?", a: "Most chatbots are live within 48 hours of the audit call, depending on how much content needs connecting." },
        { q: "Can it book meetings?", a: "Yes. Ready-to-buy visitors can pick a time inside the chat, and the details land in your inbox." },
      ]}
    />
  );
}
