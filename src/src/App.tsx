import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import VisitTracker from "./components/VisitTracker";
import MobileBottomCTA from "./components/mobile/MobileBottomCTA";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Quote from "./pages/Quote";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Inspiration from "./pages/Inspiration";
import Consultation from "./pages/Consultation";
import Customization from "./pages/Customization";
import WhyUrbanBlinds from "./pages/WhyUrbanBlinds";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import ProductCare from "./pages/ProductCare";
import InstallationGuides from "./pages/InstallationGuides";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import QuoteCalculator from "./pages/QuoteCalculator";
import EcoFriendlyMaterials from "./pages/EcoFriendlyMaterials";
import SmartHomeIntegration from "./pages/SmartHomeIntegration";
import DustRepellentTechnology from "./pages/DustRepellentTechnology";
import AdvancedLightControl from "./pages/AdvancedLightControl";
import FallSale from "./pages/FallSale";
import WindowMeasurement from "./pages/WindowMeasurement";

import ThankYou from "./pages/ThankYou";
import BuildYourBlind from "./pages/BuildYourBlind";
import Unsubscribe from "./pages/Unsubscribe";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <VisitTracker />
        <MobileBottomCTA />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:slug" element={<ProductDetail />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact-us" element={<Navigate to="/quote" replace />} />
        <Route path="/quote-calculator" element={<QuoteCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/consultation" element={<Consultation />} />
        
        <Route path="/customization" element={<Customization />} />
        <Route path="/why-urban-blinds" element={<WhyUrbanBlinds />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product-care" element={<ProductCare />} />
        <Route path="/installation-guides" element={<InstallationGuides />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/fall-sale" element={<FallSale />} />
        <Route path="/window-measurement" element={<WindowMeasurement />} />
        
        <Route path="/eco-friendly-materials" element={<EcoFriendlyMaterials />} />
        <Route path="/smart-home-integration" element={<SmartHomeIntegration />} />
        <Route path="/smart-technology" element={<SmartHomeIntegration />} />
        <Route path="/dust-repellent-technology" element={<DustRepellentTechnology />} />
        <Route path="/advanced-light-control" element={<AdvancedLightControl />} />
        
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/build-your-blind" element={<BuildYourBlind />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
