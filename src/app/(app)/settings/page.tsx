"use client";

import { Button, Input, Card, Switch, Tabs, TabsList, TabsTrigger, TabsContent, RadioGroup } from "@/components/ui";
import { User, Shield, Bell, CreditCard, HelpCircle, AlertTriangle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">{t.settings.title}</h1>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account"><User className="h-4 w-4" /> {t.settings.accountTab}</TabsTrigger>
          <TabsTrigger value="privacy"><Shield className="h-4 w-4" /> {t.settings.privacyTab}</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4" /> {t.settings.notificationsTab}</TabsTrigger>
          <TabsTrigger value="subscription"><CreditCard className="h-4 w-4" /> {t.settings.subscriptionTab}</TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent value="account">
          <Card variant="flat" padding="lg" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-neutral-200" />
              <Button variant="secondary" size="sm">{t.settings.changePhoto}</Button>
            </div>
            <Input label={t.profile.fullName} defaultValue="Priya Shankar" />
            <Input label={t.settings.phone} defaultValue="+91 98XXXXX34" disabled hint={t.profile.contactSupport} />
            <Input label={t.settings.email} defaultValue="priya@email.com" />
            <Input label={t.settings.password} type="password" defaultValue="••••••••" />
            <Button variant="primary" size="md">{t.common.save}</Button>
          </Card>

          <Card variant="flat" padding="lg" className="mt-6">
            <h3 className="text-base font-semibold text-neutral-900 mb-4">{t.settings.linkedParent}</h3>
            <p className="text-sm text-neutral-500">{t.settings.noParentLinked}</p>
            <Button variant="secondary" size="sm" className="mt-3">{t.settings.inviteParent}</Button>
          </Card>

          <Card variant="flat" padding="lg" className="mt-6 border-error/20">
            <h3 className="text-base font-semibold text-error flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {t.settings.dangerZone}
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="ghost" size="sm">{t.settings.deactivateProfile}</Button>
              <Button variant="destructive" size="sm">{t.settings.deleteAccount}</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy">
          <Card variant="flat" padding="lg" className="space-y-6">
            <RadioGroup
              label={t.settings.profileVisibility}
              options={[
                { value: "all", label: t.settings.visibleAll },
                { value: "premium", label: t.settings.visiblePremium },
                { value: "hidden", label: t.settings.visibleHidden },
              ]}
              defaultValue="all"
            />

            <RadioGroup
              label={t.settings.photoPrivacy}
              options={[
                { value: "all", label: t.settings.photoAll },
                { value: "accepted", label: t.settings.photoAccepted },
                { value: "protected", label: t.settings.photoProtected },
              ]}
              defaultValue="all"
            />

            <Switch
              label={t.settings.showContact}
              defaultChecked
            />
            <Switch
              label={t.settings.showHoroscope}
              defaultChecked
            />
            <Switch
              label={t.settings.showOnline}
              defaultChecked
            />

            <div>
              <Button variant="ghost" size="sm">{t.settings.manageBlocked}</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card variant="flat" padding="lg" className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">{t.settings.emailNotifications}</h3>
            <Switch label={t.settings.newMatches} defaultChecked />
            <Switch label={t.settings.interestsReceived} defaultChecked />
            <Switch label={t.settings.interestAccepted} defaultChecked />
            <Switch label={t.settings.newMessages} defaultChecked />
            <Switch label={t.settings.profileViews} />
            <Switch label={t.settings.weeklyDigest} defaultChecked />
          </Card>

          <Card variant="flat" padding="lg" className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">{t.settings.pushNotifications}</h3>
            <Switch label={t.nav.interests} defaultChecked />
            <Switch label={t.nav.messages} defaultChecked />
            <Switch label={t.settings.matchAlerts} defaultChecked />
          </Card>
        </TabsContent>

        {/* Subscription */}
        <TabsContent value="subscription">
          <Card variant="flat" padding="lg">
            <h3 className="text-base font-semibold text-neutral-900">{t.settings.currentPlan}</h3>
            <p className="text-sm text-neutral-500 mt-1">{t.settings.onFreePlan} <strong>{t.common.free}</strong> {t.settings.plan}.</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500">{t.settings.dailyMatchesLimit}</p>
                <p className="font-medium text-neutral-800">10 {t.settings.perDay}</p>
              </div>
              <div>
                <p className="text-neutral-500">{t.settings.expressInterestLimit}</p>
                <p className="font-medium text-neutral-800">5 {t.settings.perDay}</p>
              </div>
              <div>
                <p className="text-neutral-500">{t.settings.chatAccess}</p>
                <p className="font-medium text-error">{t.settings.notAvailable}</p>
              </div>
              <div>
                <p className="text-neutral-500">{t.settings.contactDetails}</p>
                <p className="font-medium text-error">{t.settings.hidden}</p>
              </div>
            </div>
            <Button variant="premium" size="md" className="mt-6" asChild>
              <a href="/premium">{t.nav.upgradePremium}</a>
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
