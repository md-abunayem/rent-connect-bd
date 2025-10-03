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
import LandlordDashboard from "./pages/landlord/Dashboard";
import LandlordListings from "./pages/landlord/Listings";
import CreateListing from "./pages/landlord/CreateListing";
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
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/listings" element={<LandlordListings />} />
          <Route path="/landlord/create-listing" element={<CreateListing />} />
          <Route path="/landlord/applications" element={<LandlordDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
