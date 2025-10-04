import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Home, FileText, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Application {
  id: string;
  status: string;
  created_at: string;
  rejection_reason: string | null;
  properties: {
    id: string;
    title: string;
    location_address: string;
    price_monthly: number;
    images: string[];
  };
}

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", user.id)
      .single();

    if (!profile || profile.user_type !== "tenant") {
      toast.error("Access denied");
      navigate("/");
      return;
    }

    fetchApplications();
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          created_at,
          rejection_reason,
          properties (
            id,
            title,
            location_address,
            price_monthly,
            images
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      reviewing: "default",
      approved: "default",
      rejected: "destructive",
    };

    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Track your rental applications and saved properties</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter((a) => a.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter((a) => a.status === "reviewing").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {applications.filter((a) => a.status === "approved").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>View and track your rental applications</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Home className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by searching for properties and submitting applications
                </p>
                <Button onClick={() => navigate("/search")}>
                  Browse Properties
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={application.properties.images[0] || "/placeholder.svg"}
                        alt={application.properties.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {application.properties.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {application.properties.location_address}
                          </p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>৳{application.properties.price_monthly.toLocaleString()}/month</span>
                        <span>•</span>
                        <span>Applied {format(new Date(application.created_at), "MMM dd, yyyy")}</span>
                      </div>
                      {application.status === "rejected" && application.rejection_reason && (
                        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md mt-2">
                          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-destructive mb-1">
                              Application Rejected
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {application.rejection_reason}
                            </p>
                          </div>
                        </div>
                      )}
                      {application.status === "approved" && (
                        <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md mt-2">
                          <AlertCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-600">
                              Congratulations! Your application has been approved
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/property/${application.properties.id}`)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Property
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}