"use client";

import { useState } from "react";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Save,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Button,
  Switch,
  Badge,
} from "@/components/ui";
import { useAdminStore } from "@/store/admin-store";

export default function AdminSettingsPage() {
  const admin = useAdminStore((s) => s.admin);
  const [appName, setAppName] = useState("Thirumangalyam");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Configure your admin panel and site settings
        </p>
      </div>

      <div className="grid gap-6">
        {/* Site Configuration */}
        <Card variant="flat" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-rose-500" />
              Site Configuration
            </CardTitle>
            <CardDescription>General application settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <Input
                label="Application Name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-neutral-200 p-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">Maintenance Mode</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Temporarily disable the site for users
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Admin Account */}
        <Card variant="flat" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-rose-500" />
              Admin Account
            </CardTitle>
            <CardDescription>Your admin profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <Input label="Name" value={admin.name} readOnly />
              <Input label="Email" value={admin.email} readOnly />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-600">Role:</span>
                <Badge variant="primary" size="md">
                  {admin.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-600">Last Login:</span>
                <span className="text-sm text-neutral-700">
                  {new Date(admin.lastLogin).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">
              Change Password
            </Button>
          </CardFooter>
        </Card>

        {/* Notifications */}
        <Card variant="flat" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-rose-500" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-w-md">
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-neutral-200 p-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">Email Notifications</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Receive daily summary emails
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-neutral-200 p-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">Report Alerts</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Instant alerts for new user reports
                  </p>
                </div>
                <Switch
                  checked={reportAlerts}
                  onCheckedChange={setReportAlerts}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
              <Save className="h-4 w-4" />
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
