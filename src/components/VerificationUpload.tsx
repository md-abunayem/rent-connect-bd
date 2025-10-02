import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { VerificationBadge } from "./VerificationBadge";

type DocumentType = "national_id" | "passport" | "driving_license" | "utility_bill" | "student_id" | "employment_letter";

interface VerificationUploadProps {
  userId: string;
  userType: "landlord" | "tenant";
  onUploadComplete?: () => void;
}

interface Document {
  id: string;
  document_type: DocumentType;
  status: "verified" | "pending" | "rejected" | "not_started";
  rejection_reason?: string;
}

export const VerificationUpload = ({ userId, userType, onUploadComplete }: VerificationUploadProps) => {
  const [selectedType, setSelectedType] = useState<DocumentType>("national_id");
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: "national_id", label: "National ID Card" },
    { value: "passport", label: "Passport" },
    { value: "driving_license", label: "Driving License" },
    { value: "utility_bill", label: "Utility Bill" },
    { value: "student_id", label: "Student ID" },
    { value: "employment_letter", label: "Employment Letter" },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5242880) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${selectedType}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("verification-documents")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("verification-documents")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("verification_documents")
        .upsert({
          user_id: userId,
          document_type: selectedType,
          file_url: publicUrl,
          status: "pending",
        });

      if (dbError) throw dbError;

      toast.success("Document uploaded successfully!");
      onUploadComplete?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Identity Verification
        </CardTitle>
        <CardDescription>
          Upload your identification documents for verification. This helps build trust in the community.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-type">Document Type</Label>
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as DocumentType)}>
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload Document</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={uploading}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={handleFileUpload}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Accepted formats: JPG, PNG, PDF (Max 5MB)
          </p>
        </div>

        <div className="p-4 bg-secondary/20 rounded-lg space-y-2">
          <h4 className="font-medium text-sm">Why verify?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Build trust with {userType === "landlord" ? "tenants" : "landlords"}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Get priority in search results</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Access to verified-only listings</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
