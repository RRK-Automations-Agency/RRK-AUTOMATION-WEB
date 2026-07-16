import ServiceLanding from "../components/ServiceLanding";
import { TrendingUp } from "lucide-react";
import testimonials from "../data/testimonials";

export default function FinanceAutomation() {
  return (
    <ServiceLanding
      slug="finance-automation"
      icon={TrendingUp}
      accent="accent"
      eyebrow="Finance Automation"
      title="Automate bookkeeping data & cash"
      titleAccent="flow dashboards"
      description="We connect your bank APIs, billing files, invoicing tools, and reporting books so financial records remain up-to-date with zero manual typing."
      seo={{
        title: "Finance Automation",
        description:
          "Automate accounting and finance workflows: sync billing systems to ledger books, track invoices, generate expense alerts, and update financial dashboards. Ready in 48 hours.",
        keywords:
          "accounting workflow automation, invoicing sync pipeline, QuickBooks ledger sync, automated expense alerts, finance dashboard updates, billing pipelines",
      }}
      stats={[
        { value: "98%", label: "Fewer manual entries" },
        { value: "5 days", label: "Faster invoice payouts" },
        { value: "48hrs", label: "Ledger pipeline setup" },
      ]}
      ctaPoints={[
        "Connect billing apps to core accounting records",
        "Automated balance notices and overdue alerts",
        "Pushes real-time financial stats to your dashboard",
      ]}
      problems={[
        { problem: "Manually copying invoice details to ledgers", outcome: "Invoices sync directly to accounting apps on creation" },
        { problem: "Chasing clients for payment of overdue fees", outcome: "Automated payment alert emails and WhatsApp links" },
        { problem: "Expense receipts piled up and unsorted", outcome: "Secure receipt capture pipelines that upload files automatically" },
        { problem: "Accounting books updated only once a month", outcome: "Daily automated financial balance synchronizations" },
        { problem: "Billing errors causing lost revenue", outcome: "Discrepancy validation alerts sent to admin teams" },
        { problem: "Dashboards displaying outdated sales charts", outcome: "Live cashflow metrics streamed directly to database pages" },
      ]}
      includes={[
        { title: "Billing & Ledger Sync", desc: "Keep invoices, payments, and refunds synced between billing apps and accounting systems." },
        { title: "Invoice Recovery Loops", desc: "Automate reminders and billing links for clients with outstanding invoices." },
        { title: "Receipt Collector Pipeline", desc: "Capture expense sheets, parse transaction details, and upload receipts to folders." },
        { title: "Balance Updates Stream", desc: "Deliver daily cashflow updates, bank transactions, and ledger summaries automatically." },
        { title: "Discrepancy Alerts System", desc: "Monitor bank balances, validate invoicing totals, and trigger discrepancy updates." },
        { title: "Secure E-Signature Integration", desc: "Wired triggers that request client payment details and signatures automatically." },
      ]}
      caseStudy={{
        title: "How an accounting firm cut client billing work by 80%",
        description:
          "By syncing client payments directly to Quickbooks ledgers, administrative billing tasks were automated.",
        featureTitle: "Billing to Ledger Pipeline",
        featureDescription: "Invoice triggers, payment syncs, ledger inputs, and dashboard updates",
        featureAlt: "Financial ledger sync flow diagram",
        items: [
          {
            industry: "Accounting Practice",
            problem:
              "Accounting assistants spent hours matching invoices to bank accounts and filing receipts manually.",
            solution:
              "Connected Stripe and Xero to pull transaction records, reconcile balances, and file invoices automatically.",
            result: "Manual billing administration fell by 80%. Client invoicing updates improved significantly.",
            icon: TrendingUp,
          },
        ],
      }}
      testimonials={testimonials}
      steps={[
        { title: "Review accounting tools", desc: "We map your billing tools, invoice apps, banking APIs, and ledger systems." },
        { title: "Configure integrations", desc: "We deploy secure data pipes, balance triggers, and receipt upload forms." },
        { title: "Test & launch", desc: "We run test invoicing runs, check reconciliation files, and go live on accounting books." },
      ]}
      faqs={[
        { q: "Which ledger systems do you support?", a: "QuickBooks Online, Xero, FreshBooks, Sage, Zoho Books, and Wave." },
        { q: "Is the financial data kept secure?", a: "Yes. All workflows utilize secure encrypted endpoints, complying with accounting compliance rules." },
        { q: "Can we review ledger updates before posting?", a: "Yes. We build approval states where transaction matches wait in draft until approved." },
        { q: "How long does setup take?", a: "Typical accounting pipeline setups are built and launched in 48 to 72 hours." },
      ]}
    />
  );
}
