import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Eye, Check, X, FileText, Mail, Phone, MapPin, Briefcase, Users, Home } from "lucide-react";
import { format } from "date-fns";

interface Application {
  id: string;
  status: string;
  full_name: string;
  email: string;
  phone: string;
  current_address: string;
  employment_status: string;
  employer_name: string | null;
  job_title: string | null;
  monthly_income: number | null;
  move_in_date: string | null;
  number_of_occupants: number | null;
  has_pets: boolean;
  pet_details: string | null;
  additional_notes: string | null;
  created_at: string;
  id_document_url: string | null;
  income_proof_url: string | null;
  properties: {
    id: string;
    title: string;
    location_address: string;
    price_monthly: number;
  };
}

export default function Applications() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

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

    if (!profile || profile.user_type !== "landlord") {
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
          *,
          properties (
            id,
            title,
            location_address,
            price_monthly
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

  const updateApplicationStatus = async (
    applicationId: string,
    status: string,
    rejectionReason?: string
  ) => {
    setActionLoading(true);
    try {
      const updateData: any = {
        status,
        reviewed_at: new Date().toISOString(),
      };

      if (rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      const { error } = await supabase
        .from("applications")
        .update(updateData)
        .eq("id", applicationId);

      if (error) throw error;

      const statusMessage = status === 'approved' 
        ? '✅ Application approved successfully! The tenant will be notified.' 
        : status === 'rejected' 
        ? 'Application rejected and tenant has been notified.' 
        : `Application status updated to ${status}`;
      
      toast.success(statusMessage);
      fetchApplications();
      setShowRejectDialog(false);
      setSelectedApplication(null);
      setRejectionReason("");
    } catch (error: any) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application");
    } finally {
      setActionLoading(false);
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

  const filterApplications = (status?: string) => {
    if (!status) return applications;
    return applications.filter((app) => app.status === status);
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
          <h1 className="text-3xl font-bold mb-2">Applications</h1>
          <p className="text-muted-foreground">Manage rental applications for your properties</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({filterApplications("pending").length})
            </TabsTrigger>
            <TabsTrigger value="reviewing">
              Reviewing ({filterApplications("reviewing").length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({filterApplications("approved").length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({filterApplications("rejected").length})
            </TabsTrigger>
          </TabsList>

          {["all", "pending", "reviewing", "approved", "rejected"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterApplications(tab === "all" ? undefined : tab).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No applications found
                  </CardContent>
                </Card>
              ) : (
                filterApplications(tab === "all" ? undefined : tab).map((application) => (
                  <Card key={application.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{application.full_name}</CardTitle>
                          <CardDescription>
                            Applied for: {application.properties.title}
                          </CardDescription>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {application.properties.location_address}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{application.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          <span className="capitalize">{application.employment_status}</span>
                        </div>
                        {application.monthly_income && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Income:</span>
                            <span>৳{application.monthly_income.toLocaleString()}/mo</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{application.number_of_occupants || 1} occupants</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          <span>{application.has_pets ? "Has pets" : "No pets"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        Applied on {format(new Date(application.created_at), "MMM dd, yyyy")}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateApplicationStatus(application.id, "reviewing")
                              }
                            >
                              Mark as Reviewing
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateApplicationStatus(application.id, "approved")
                              }
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowRejectDialog(true);
                              }}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        {application.status === "reviewing" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateApplicationStatus(application.id, "approved")
                              }
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowRejectDialog(true);
                              }}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Application Details Dialog */}
      <Dialog
        open={!!selectedApplication && !showRejectDialog}
        onOpenChange={() => setSelectedApplication(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete application information for {selectedApplication?.full_name}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Property</h3>
                <p className="text-sm">{selectedApplication.properties.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.properties.location_address}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-1 text-sm">
                  <p>Email: {selectedApplication.email}</p>
                  <p>Phone: {selectedApplication.phone}</p>
                  <p>Current Address: {selectedApplication.current_address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Employment</h3>
                <div className="space-y-1 text-sm">
                  <p>Status: {selectedApplication.employment_status}</p>
                  {selectedApplication.employer_name && (
                    <p>Employer: {selectedApplication.employer_name}</p>
                  )}
                  {selectedApplication.job_title && (
                    <p>Job Title: {selectedApplication.job_title}</p>
                  )}
                  {selectedApplication.monthly_income && (
                    <p>Monthly Income: ৳{selectedApplication.monthly_income.toLocaleString()}</p>
                  )}
                </div>
              </div>

              {selectedApplication.move_in_date && (
                <div>
                  <h3 className="font-semibold mb-2">Move-in Date</h3>
                  <p className="text-sm">
                    {format(new Date(selectedApplication.move_in_date), "MMMM dd, yyyy")}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Occupancy</h3>
                <p className="text-sm">
                  {selectedApplication.number_of_occupants || 1} occupant(s)
                </p>
                {selectedApplication.has_pets && (
                  <p className="text-sm">Pets: {selectedApplication.pet_details || "Yes"}</p>
                )}
              </div>

              {selectedApplication.additional_notes && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-sm">{selectedApplication.additional_notes}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Documents</h3>
                <div className="flex gap-2">
                  {selectedApplication.id_document_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={selectedApplication.id_document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        ID Document
                      </a>
                    </Button>
                  )}
                  {selectedApplication.income_proof_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={selectedApplication.income_proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Income Proof
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection_reason">Rejection Reason</Label>
              <Textarea
                id="rejection_reason"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explain why this application is being rejected..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  selectedApplication &&
                  updateApplicationStatus(
                    selectedApplication.id,
                    "rejected",
                    rejectionReason
                  )
                }
                disabled={!rejectionReason.trim() || actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  "Reject Application"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}