import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Save,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  GlobeLock,
  KeyRound,
  Lock,
  AlertOctagon,
  CreditCard,
  Landmark,
  Rocket,
  GlobeIcon,
  Languages,
  Users,
  BellRing
} from 'lucide-react';

const Settings = () => {
  const [siteName, setSiteName] = useState('North Gascar Tours');
  const [siteEmail, setSiteEmail] = useState('info@northgascartours.com');
  const [sitePhone, setSitePhone] = useState('+261 32 00 000 00');
  const [siteAddress, setSiteAddress] = useState('Lot II M 85 AK Antsakaviro, 101 Antananarivo');
  const [siteDescription, setSiteDescription] = useState('Explore Madagascar with North Gascar Tours. We offer unforgettable tours and adventures.');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Africa/Antananarivo');
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [emailVerificationEnabled, setEmailVerificationEnabled] = useState(false);
  const [defaultUserRole, setDefaultUserRole] = useState('user');
  const [paymentGateway, setPaymentGateway] = useState('paypal');
  const [paypalClientID, setPaypalClientID] = useState('');
  const [paypalSecret, setPaypalSecret] = useState('');
  const [stripeKey, setStripeKey] = useState('');
  const [stripeSecret, setStripeSecret] = useState('');
  const [socialLoginEnabled, setSocialLoginEnabled] = useState(true);
  const [facebookAppID, setFacebookAppID] = useState('');
  const [facebookAppSecret, setFacebookAppSecret] = useState('');
  const [googleClientID, setGoogleClientID] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [notificationSoundsEnabled, setNotificationSoundsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);

  const handleSaveGeneralSettings = () => {
    toast.success('General settings saved!');
  };

  const handleSaveSecuritySettings = () => {
    toast.success('Security settings saved!');
  };

  const handleSavePaymentSettings = () => {
    toast.success('Payment settings saved!');
  };

  const handleSaveSocialLoginSettings = () => {
    toast.success('Social Login settings saved!');
  };

  const handleSaveNotificationSettings = () => {
    toast.success('Notification settings saved!');
  };

  const handleResetSettings = () => {
    toast.warning('Settings have been reset to default!');
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your website settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="socialLogin">Social Login</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="siteEmail">Site Email</Label>
                  <Input id="siteEmail" type="email" value={siteEmail} onChange={(e) => setSiteEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="sitePhone">Site Phone</Label>
                  <Input id="sitePhone" value={sitePhone} onChange={(e) => setSitePhone(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="siteAddress">Site Address</Label>
                  <Textarea id="siteAddress" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea id="siteDescription" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="MGA">MGA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Malagasy">Malagasy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="registrationEnabled" className="flex items-center">
                    <GlobeLock className="mr-2 h-4 w-4" />
                    Registration Enabled
                  </Label>
                  <Switch
                    id="registrationEnabled"
                    checked={registrationEnabled}
                    onCheckedChange={(checked) => setRegistrationEnabled(checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailVerificationEnabled" className="flex items-center">
                    <KeyRound className="mr-2 h-4 w-4" />
                    Email Verification Enabled
                  </Label>
                  <Switch
                    id="emailVerificationEnabled"
                    checked={emailVerificationEnabled}
                    onCheckedChange={(checked) => setEmailVerificationEnabled(checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="defaultUserRole">Default User Role</Label>
                  <Select value={defaultUserRole} onValueChange={setDefaultUserRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    <AlertOctagon className="mr-1 inline-block h-4 w-4" />
                    Setting the default user role to "admin" is not recommended for security reasons.
                  </p>
                </div>
              </div>
              <Button onClick={handleSaveSecuritySettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </TabsContent>
            <TabsContent value="payment" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="paymentGateway">Payment Gateway</Label>
                  <Select value={paymentGateway} onValueChange={setPaymentGateway}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {paymentGateway === 'paypal' && (
                  <>
                    <div>
                      <Label htmlFor="paypalClientID">PayPal Client ID</Label>
                      <Input id="paypalClientID" value={paypalClientID} onChange={(e) => setPaypalClientID(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="paypalSecret">PayPal Secret</Label>
                      <Input id="paypalSecret" type="password" value={paypalSecret} onChange={(e) => setPaypalSecret(e.target.value)} />
                    </div>
                  </>
                )}
                {paymentGateway === 'stripe' && (
                  <>
                    <div>
                      <Label htmlFor="stripeKey">Stripe Key</Label>
                      <Input id="stripeKey" value={stripeKey} onChange={(e) => setStripeKey(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecret">Stripe Secret</Label>
                      <Input id="stripeSecret" type="password" value={stripeSecret} onChange={(e) => setStripeSecret(e.target.value)} />
                    </div>
                  </>
                )}
              </div>
              <Button onClick={handleSavePaymentSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </TabsContent>
            <TabsContent value="socialLogin" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="socialLoginEnabled" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Social Login Enabled
                  </Label>
                  <Switch
                    id="socialLoginEnabled"
                    checked={socialLoginEnabled}
                    onCheckedChange={(checked) => setSocialLoginEnabled(checked)}
                  />
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Facebook</h4>
                  <div>
                    <Label htmlFor="facebookAppID">Facebook App ID</Label>
                    <Input id="facebookAppID" value={facebookAppID} onChange={(e) => setFacebookAppID(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="facebookAppSecret">Facebook App Secret</Label>
                    <Input id="facebookAppSecret" type="password" value={facebookAppSecret} onChange={(e) => setFacebookAppSecret(e.target.value)} />
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Google</h4>
                  <div>
                    <Label htmlFor="googleClientID">Google Client ID</Label>
                    <Input id="googleClientID" value={googleClientID} onChange={(e) => setGoogleClientID(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="googleClientSecret">Google Client Secret</Label>
                    <Input id="googleClientSecret" type="password" value={googleClientSecret} onChange={(e) => setGoogleClientSecret(e.target.value)} />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveSocialLoginSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificationSoundsEnabled" className="flex items-center">
                    <BellRing className="mr-2 h-4 w-4" />
                    Notification Sounds
                  </Label>
                  <Switch
                    id="notificationSoundsEnabled"
                    checked={notificationSoundsEnabled}
                    onCheckedChange={(checked) => setNotificationSoundsEnabled(checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotificationsEnabled" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Notifications
                  </Label>
                  <Switch
                    id="emailNotificationsEnabled"
                    checked={emailNotificationsEnabled}
                    onCheckedChange={(checked) => setEmailNotificationsEnabled(checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotificationsEnabled" className="flex items-center">
                    <Rocket className="mr-2 h-4 w-4" />
                    Push Notifications
                  </Label>
                  <Switch
                    id="pushNotificationsEnabled"
                    checked={pushNotificationsEnabled}
                    onCheckedChange={(checked) => setPushNotificationsEnabled(checked)}
                  />
                </div>
              </div>
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleResetSettings}>
            <Trash2 className="mr-2 h-4 w-4" />
            Reset Settings
          </Button>
          <Button variant="secondary">
            <RefreshCw className="mr-2 h-4 w-4" />
            Restore Defaults
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
