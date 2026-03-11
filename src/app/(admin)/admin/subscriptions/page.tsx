"use client";

import { useState } from "react";
import { IndianRupee, TrendingUp, Users, Crown } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { StatCard } from "@/components/domain/stat-card";
import { Badge } from "@/components/ui";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const PLAN_LABELS: Record<string, string> = {
  premium_3: "Premium 3M",
  premium_6: "Premium 6M",
  premium_12: "Premium 12M",
};

export default function AdminSubscriptionsPage() {
  const { subscriptions, stats } = useAdminStore();
  const [planFilter, setPlanFilter] = useState<string>("all");

  const filtered =
    planFilter === "all"
      ? subscriptions
      : subscriptions.filter((s) => s.plan === planFilter);

  const totalRevenue = subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const activeCount = subscriptions.filter((s) => s.status === "active").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Subscriptions</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Monitor revenue and subscription activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={IndianRupee}
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          iconClassName="bg-violet-50 text-violet-600"
        />
        <StatCard
          icon={Crown}
          label="Active Subscribers"
          value={activeCount}
          iconClassName="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Monthly Revenue"
          value={`₹${stats.monthlyRevenue.toLocaleString("en-IN")}`}
          trend={{ value: "8% vs last month", positive: true }}
          iconClassName="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "premium_3", "premium_6", "premium_12"].map((plan) => (
          <button
            key={plan}
            onClick={() => setPlanFilter(plan)}
            className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors ${
              planFilter === plan
                ? "bg-rose-50 text-rose-700 border border-rose-200"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {plan === "all" ? "All Plans" : PLAN_LABELS[plan]}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="hidden sm:table-cell">Start Date</TableHead>
            <TableHead className="hidden sm:table-cell">End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Amount</TableHead>
            <TableHead className="hidden lg:table-cell">Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="font-medium text-neutral-900">
                {sub.userName}
              </TableCell>
              <TableCell>
                <Badge variant="primary" size="sm">
                  {PLAN_LABELS[sub.plan]}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-neutral-500">
                {new Date(sub.startDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-neutral-500">
                {new Date(sub.endDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    sub.status === "active"
                      ? "success"
                      : sub.status === "expired"
                        ? "default"
                        : "error"
                  }
                  size="sm"
                >
                  {sub.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell font-medium">
                ₹{sub.amount.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-neutral-500">
                {sub.paymentMethod}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
