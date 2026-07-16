import ServiceLanding from "../components/ServiceLanding";
import { ShoppingBag } from "lucide-react";
import testimonials from "../data/testimonials";

export default function EcommerceAutomation() {
  return (
    <ServiceLanding
      slug="ecommerce-automation"
      icon={ShoppingBag}
      accent="accent"
      eyebrow="E-commerce Automation"
      title="Turn lost carts into repeat buyers"
      titleAccent="automatically"
      description="We connect your e-commerce store with WhatsApp reminders, automated stock management, and multi-channel support that cuts admin tasks in half."
      seo={{
        title: "Ecommerce Automation",
        description:
          "Automate cart abandonment flows, Shopify order alerts, inventory updates, and order confirmations via WhatsApp and SMS. Ready in 48 hours.",
        keywords:
          "Shopify automation, cart recovery WhatsApp, ecommerce inventory sync, WooCommerce automation, e-commerce order tracking, customer support bot",
      }}
      stats={[
        { value: "28%", label: "Cart recovery rate" },
        { value: "40%", label: "Support ticket drop" },
        { value: "48hrs", label: "Store setup time" },
      ]}
      ctaPoints={[
        "Works with Shopify, WooCommerce, and custom setups",
        "Automated WhatsApp order alerts and tracking links",
        "Reduces manual copy-pasting of shipping details",
      ]}
      problems={[
        { problem: "70% of shoppers leave items in their cart", outcome: "Automated cart abandonment alerts on WhatsApp/SMS" },
        { problem: "Answering the same shipping question all day", outcome: "AI chatbot tracks orders instantly for customers" },
        { problem: "Copying orders manually to sheets or shipping software", outcome: "Real-time Shopify orders synced to your operations CRM" },
        { problem: "Over-selling products when inventory runs low", outcome: "Automated multi-channel stock sync and alerts" },
        { problem: "Manual invoice creation takes forever", outcome: "Receipts and tax invoices auto-generated and emailed" },
        { problem: "Low repeat customer rate after the first purchase", outcome: "Automated post-purchase review and offer campaigns" },
      ]}
      includes={[
        { title: "Abandoned Cart Recovery", desc: "Trigger personalized WhatsApp alerts with discount codes for abandoned checkouts." },
        { title: "WhatsApp Order Updates", desc: "Automate tracking details, shipping updates, and purchase confirmations." },
        { title: "CRM & ERP Sync", desc: "Connect store purchases with shipping partners, accounting, and database sheets." },
        { title: "Stock Alert Pipeline", desc: "Get Slack or email alerts when inventory drops, or sync stock numbers instantly." },
        { title: "Self-Service Order Lookup", desc: "Customers chat with an AI bot to locate orders, request refunds, or update addresses." },
        { title: "Review Collections", desc: "Gather product and site reviews via automatic post-delivery check-ins." },
      ]}
      caseStudy={{
        title: "How an online brand recovered 3x more carts using WhatsApp",
        description:
          "By switching from email-only cart recovery to high-delivery WhatsApp templates, cart recovery rates jumped from 8% to 28%.",
        featureTitle: "WhatsApp Checkout Pipeline",
        featureDescription: "Cart triggers, templates with action buttons, and discount paths",
        featureAlt: "Ecommerce cart recovery dashboard setup",
        items: [
          {
            industry: "D2C Brand",
            problem:
              "Standard email abandonment sequences were hitting spam folders and losing revenue.",
            solution:
              "Built a Make.com scenario triggering personalized WhatsApp reminders 30 mins after cart abandonment.",
            result: "Recovered cart value increased by 210% within the first month of activation.",
            icon: ShoppingBag,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Connect your store", desc: "We link your store APIs (Shopify/Woo) to our automation dashboard securely." },
        { title: "Define the triggers", desc: "We build workflows for abandonment, confirmation, and support lookups." },
        { title: "Test & launch", desc: "We run live simulations, verify sitemaps and API updates, and activate public flows." },
      ]}
      faqs={[
        { q: "Is it compliant with WhatsApp business policies?", a: "Yes. We use approved official utility and marketing templates to ensure full compliance." },
        { q: "Can we integrate custom shipping providers?", a: "Yes. We use custom webhooks and APIs to fetch tracking information from any regional courier." },
        { q: "Will this slow down my site load speed?", a: "No. All automation runs server-side after events occur, keeping your frontend lightweight." },
        { q: "What stores do you support?", a: "Shopify, WooCommerce, Magento, BigCommerce, and custom Headless/API store systems." },
      ]}
    />
  );
}
