import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";

export default function Apply() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_address: "",
    employment_status: "",
    employer_name: "",
    job_title: "",
    monthly_income: "",
    employment_duration: "",
    reference_name: "",
    reference_phone: "",
    reference_relationship: "",
    move_in_date: "",
    number_of_occupants: "1",
    has_pets: false,
    pet_details: "",
    additional_notes: "",
    background_check_authorized: false,
  });

  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [incomeProof, setIncomeProof] = useState<File | null>(null);

  useEffect(() => {
    checkAuth();
    fetchProperty();
  }, [propertyId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please log in to apply");
      navigate("/auth");
      return;
    }
    setUser(user);
    
    // Fetch user profile to pre-fill form
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (profile) {
      setFormData(prev => ({
        ...prev,
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        email: user.email || "",
      }));
    }
  };

  const fetchProperty = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();

    if (error) {
      toast.error("Property not found");
      navigate("/search");
      return;
    }
    setProperty(data);
  };

  const uploadFile = async (file: File, folder: string) => {
    if (!user) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from("application-documents")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("application-documents")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to apply");
      return;
    }

    if (!formData.background_check_authorized) {
      toast.error("Please authorize background check to proceed");
      return;
    }

    setLoading(true);

    try {
      // Upload documents
      let idDocUrl = null;
      let incomeProofUrl = null;

      if (idDocument) {
        idDocUrl = await uploadFile(idDocument, "id-documents");
      }

      if (incomeProof) {
        incomeProofUrl = await uploadFile(incomeProof, "income-proofs");
      }

      // Submit application
      const { error } = await supabase.from("applications").insert({
        property_id: propertyId,
        tenant_id: user.id,
        ...formData,
        monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : null,
        number_of_occupants: parseInt(formData.number_of_occupants),
        id_document_url: idDocUrl,
        income_proof_url: incomeProofUrl,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("You have already applied for this property");
        } else {
          throw error;
        }
        return;
      }

      toast.success("Application submitted successfully!");
      navigate("/tenant/dashboard");
    } catch (error: any) {
      console.error("Application error:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!property) {
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
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Rental Application</h1>
          <p className="text-muted-foreground">
            Applying for: <span className="font-semibold text-foreground">{property.title}</span>
          </p>
          <p className="text-sm text-muted-foreground">{property.location_address}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="move_in_date">Preferred Move-in Date</Label>
                  <Input
                    id="move_in_date"
                    type="date"
                    value={formData.move_in_date}
                    onChange={(e) => handleChange("move_in_date", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="current_address">Current Address *</Label>
                <Input
                  id="current_address"
                  value={formData.current_address}
                  onChange={(e) => handleChange("current_address", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
              <CardDescription>Your employment and income details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employment_status">Employment Status *</Label>
                  <Select
                    value={formData.employment_status}
                    onValueChange={(value) => handleChange("employment_status", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="monthly_income">Monthly Income (BDT)</Label>
                  <Input
                    id="monthly_income"
                    type="number"
                    value={formData.monthly_income}
                    onChange={(e) => handleChange("monthly_income", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="employer_name">Employer Name</Label>
                  <Input
                    id="employer_name"
                    value={formData.employer_name}
                    onChange={(e) => handleChange("employer_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    value={formData.job_title}
                    onChange={(e) => handleChange("job_title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="employment_duration">Employment Duration</Label>
                  <Input
                    id="employment_duration"
                    placeholder="e.g., 2 years"
                    value={formData.employment_duration}
                    onChange={(e) => handleChange("employment_duration", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
              <CardDescription>Provide a reference contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference_name">Reference Name</Label>
                  <Input
                    id="reference_name"
                    value={formData.reference_name}
                    onChange={(e) => handleChange("reference_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reference_phone">Reference Phone</Label>
                  <Input
                    id="reference_phone"
                    value={formData.reference_phone}
                    onChange={(e) => handleChange("reference_phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reference_relationship">Relationship</Label>
                  <Input
                    id="reference_relationship"
                    placeholder="e.g., Previous Landlord"
                    value={formData.reference_relationship}
                    onChange={(e) => handleChange("reference_relationship", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="number_of_occupants">Number of Occupants</Label>
                <Input
                  id="number_of_occupants"
                  type="number"
                  min="1"
                  value={formData.number_of_occupants}
                  onChange={(e) => handleChange("number_of_occupants", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_pets"
                  checked={formData.has_pets}
                  onCheckedChange={(checked) => handleChange("has_pets", checked)}
                />
                <Label htmlFor="has_pets">I have pets</Label>
              </div>
              {formData.has_pets && (
                <div>
                  <Label htmlFor="pet_details">Pet Details</Label>
                  <Input
                    id="pet_details"
                    placeholder="Type, breed, size"
                    value={formData.pet_details}
                    onChange={(e) => handleChange("pet_details", e.target.value)}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="additional_notes">Additional Notes</Label>
                <Textarea
                  id="additional_notes"
                  rows={4}
                  placeholder="Any additional information you'd like to share"
                  value={formData.additional_notes}
                  onChange={(e) => handleChange("additional_notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Upload required documents (Max 20MB per file)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="id_document">ID Document (NID/Passport)</Label>
                <div className="mt-2">
                  {idDocument ? (
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">{idDocument.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIdDocument(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                      </div>
                      <input
                        id="id_document"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="income_proof">Income Proof (Payslip/Bank Statement)</Label>
                <div className="mt-2">
                  {incomeProof ? (
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">{incomeProof.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIncomeProof(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                      </div>
                      <input
                        id="income_proof"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setIncomeProof(e.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Check Authorization */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="background_check"
                  checked={formData.background_check_authorized}
                  onCheckedChange={(checked) => handleChange("background_check_authorized", checked)}
                  required
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="background_check" className="cursor-pointer">
                    I authorize HavenHub to conduct a background check *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This includes verification of employment, rental history, and creditworthiness
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}