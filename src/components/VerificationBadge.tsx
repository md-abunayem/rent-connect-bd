import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

type VerificationStatus = "verified" | "pending" | "rejected" | "not_started";

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
}

export const VerificationBadge = ({ status, className }: VerificationBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: "Verified",
          variant: "default" as const,
          className: "bg-emerald-500 hover:bg-emerald-600 text-white",
        };
      case "pending":
        return {
          icon: <Clock className="h-3 w-3" />,
          label: "Pending Review",
          variant: "secondary" as const,
          className: "bg-amber-500 hover:bg-amber-600 text-white",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-3 w-3" />,
          label: "Rejected",
          variant: "destructive" as const,
        };
      case "not_started":
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          label: "Not Verified",
          variant: "outline" as const,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className || ""} ${className || ""}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};
