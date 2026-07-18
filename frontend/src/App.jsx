import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import { CalendlyGateProvider } from "./components/CalendlyLeadGate";
import { Toaster } from "./components/ui/toaster";
import { lazy, Suspense } from "react";
import * as Sentry from "@sentry/react";
import "./index.css";

// ============================================================
// Sentry error monitoring
// ============================================================
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 0,
    // React runtime errors and unhandled promise rejections
    // are captured automatically by the default integrations.
  });
}

// ============================================================
// Environment validation — fail fast with descriptive errors
// ============================================================
import { validateEnv } from "./lib/env";
if (import.meta.env.PROD) {
  validateEnv();
}

// Pages
import Index from "./pages/index";
import ScrollToTop from "./components/ScrollToTop";
import AdminSwitcher from "./components/AdminSwitcher";
const Services = lazy(() => import("./pages/Services"));
const AIChatbots = lazy(() => import("./pages/AIChatbots"));
const WhatsAppAutomation = lazy(() => import("./pages/WhatsAppAutomation"));
const BusinessAutomation = lazy(() => import("./pages/BusinessAutomation"));
const WorkflowAutomation = lazy(() => import("./pages/WorkflowAutomation"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Blog = lazy(() => import("./pages/Blog"));
const FAQ = lazy(() => import("./pages/FAQ"));

const BlogPost = lazy(() => import("./pages/BlogPost"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminPricing = lazy(() => import("./pages/admin/AdminPricing"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Industry Specific Pages
const RealEstateAutomation = lazy(() => import("./pages/RealEstateAutomation"));
const EcommerceAutomation = lazy(() => import("./pages/EcommerceAutomation"));
const AgencyAutomation = lazy(() => import("./pages/AgencyAutomation"));
const LegalAutomation = lazy(() => import("./pages/LegalAutomation"));
const HealthcareAutomation = lazy(() => import("./pages/HealthcareAutomation"));
const SaaSAutomation = lazy(() => import("./pages/SaaSAutomation"));
const ConsultingAutomation = lazy(() => import("./pages/ConsultingAutomation"));
const EducationAutomation = lazy(() => import("./pages/EducationAutomation"));
const FinanceAutomation = lazy(() => import("./pages/FinanceAutomation"));
const LocalServicesAutomation = lazy(() => import("./pages/LocalServicesAutomation"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <CalendlyGateProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AdminSwitcher />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-chatbots" element={<AIChatbots />} />
            <Route path="/whatsapp-automation" element={<WhatsAppAutomation />} />
            <Route path="/business-automation" element={<BusinessAutomation />} />
            <Route path="/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Industry Specific Routes */}
            <Route path="/real-estate-automation" element={<RealEstateAutomation />} />
            <Route path="/ecommerce-automation" element={<EcommerceAutomation />} />
            <Route path="/agency-automation" element={<AgencyAutomation />} />
            <Route path="/legal-automation" element={<LegalAutomation />} />
            <Route path="/healthcare-automation" element={<HealthcareAutomation />} />
            <Route path="/saas-automation" element={<SaaSAutomation />} />
            <Route path="/consulting-automation" element={<ConsultingAutomation />} />
            <Route path="/education-automation" element={<EducationAutomation />} />
            <Route path="/finance-automation" element={<FinanceAutomation />} />
            <Route path="/local-services-automation" element={<LocalServicesAutomation />} />

            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Auth & Admin */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/pricing" element={<AdminPricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </CalendlyGateProvider>
    </AuthProvider>
  );
};

export default App;