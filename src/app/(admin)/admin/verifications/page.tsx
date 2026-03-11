"use client";

import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Camera,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import {
  Card,
  CardContent,
  Badge,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui";
import type { VerificationRequest, VerificationRequestStatus } from "@/types/admin";

const STATUS_CONFIG: Record<
  VerificationRequestStatus,
  { icon: typeof Clock; color: string; label: string }
> = {
  pending: { icon: Clock, color: "text-amber-600", label: "Pending Review" },
  approved: { icon: CheckCircle, color: "text-emerald-600", label: "Approved" },
  rejected: { icon: XCircle, color: "text-red-600", label: "Rejected" },
};

const DOC_LABELS: Record<string, string> = {
  aadhaar: "Aadhaar Card",
  passport: "Passport",
  voter_id: "Voter ID",
  driving_license: "Driving License",
};

function VerificationCard({
  request,
  onApprove,
  onReject,
}: {
  request: VerificationRequest;
  onApprove: () => void;
  onReject: (reason: string) => void;
}) {
  const [rejectReason, setRejectReason] = useState("");
  const config = STATUS_CONFIG[request.status];
  const StatusIcon = config.icon;

  return (
    <Card variant="flat" padding="md">
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* User info */}
          <div className="flex items-start gap-3 flex-1">
            <Avatar name={request.userName} size="lg" src={request.userPhotoUrl} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900">{request.userName}</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusIcon className={`h-4 w-4 ${config.color}`} />
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {DOC_LABELS[request.documentType]}
                </span>
                <span className="flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5" />
                  Selfie provided
                </span>
                <span>
                  Submitted{" "}
                  {new Date(request.submittedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {request.rejectionReason && (
                <div className="mt-2 rounded-[var(--radius-md)] bg-red-50 p-2 text-xs text-red-700">
                  Rejection reason: {request.rejectionReason}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {request.status === "pending" && (
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Button
                variant="primary"
                size="sm"
                onClick={onApprove}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Verification</DialogTitle>
                    <DialogDescription>
                      Provide a reason for rejecting {request.userName}&apos;s verification.
                    </DialogDescription>
                  </DialogHeader>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter rejection reason..."
                    className="w-full h-24 rounded-[var(--radius-md)] border border-neutral-300 p-3 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 focus:outline-none resize-none"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost" size="sm">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          onReject(rejectReason || "Does not meet verification criteria");
                          setRejectReason("");
                        }}
                      >
                        Confirm Reject
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminVerificationsPage() {
  const { verificationRequests, approveVerification, rejectVerification } =
    useAdminStore();

  const pending = verificationRequests.filter((v) => v.status === "pending");
  const approved = verificationRequests.filter((v) => v.status === "approved");
  const rejected = verificationRequests.filter((v) => v.status === "rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Verifications</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Review and manage user identity verification requests
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pending.length > 0 && (
              <Badge variant="warning" size="sm" className="ml-2">
                {pending.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pending.length === 0 ? (
            <div className="py-12 text-center">
              <ShieldCheck className="h-12 w-12 mx-auto text-neutral-300" />
              <p className="mt-3 text-sm text-neutral-500">No pending verifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((req) => (
                <VerificationCard
                  key={req.id}
                  request={req}
                  onApprove={() => approveVerification(req.id)}
                  onReject={(reason) => rejectVerification(req.id, reason)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {approved.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-neutral-300" />
              <p className="mt-3 text-sm text-neutral-500">No approved verifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {approved.map((req) => (
                <VerificationCard
                  key={req.id}
                  request={req}
                  onApprove={() => {}}
                  onReject={() => {}}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {rejected.length === 0 ? (
            <div className="py-12 text-center">
              <XCircle className="h-12 w-12 mx-auto text-neutral-300" />
              <p className="mt-3 text-sm text-neutral-500">No rejected verifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rejected.map((req) => (
                <VerificationCard
                  key={req.id}
                  request={req}
                  onApprove={() => {}}
                  onReject={() => {}}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
