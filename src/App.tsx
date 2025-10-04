import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import PropertySearchResults from "./pages/PropertySearchResults";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/landlord/Dashboard";
import Listings from "./pages/landlord/Listings";
import CreateListingPage from "./pages/landlord/CreateListing";
import Applications from "./pages/landlord/Applications";
import Apply from "./pages/Apply";
import TenantDashboard from "./pages/tenant/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<PropertySearchResults />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landlord/dashboard" element={<Dashboard />} />
          <Route path="/landlord/listings" element={<Listings />} />
          <Route path="/landlord/create-listing" element={<CreateListingPage />} />
          <Route path="/landlord/applications" element={<Applications />} />
          <Route path="/apply/:propertyId" element={<Apply />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
