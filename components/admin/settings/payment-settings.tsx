"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Banknote, Percent } from "lucide-react";

export default function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "Cash on Delivery", enabled: true, fee: 0 },
    { id: 2, name: "Easypaisa", enabled: true, fee: 1.5 },
    { id: 3, name: "JazzCash", enabled: true, fee: 1.5 },
    { id: 4, name: "Bank Transfer", enabled: false, fee: 0 },
    { id: 5, name: "Credit/Debit Card", enabled: false, fee: 2.5 },
  ]);

  const [settings, setSettings] = useState({
    currency: "PKR",
    taxRate: 17, // Pakistan's standard GST rate
    minOrderAmount: 500,
    easypaisaMerchantId: "EP12345678",
    easypaisaSecretKey: "ep_test_secret_key_***********************",
    jazzcashMerchantId: "JC98765432",
    jazzcashPassword: "jc_test_password_***********************",
  });

  const handleMethodToggle = (id: number, enabled: boolean) => {
    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === id ? { ...method, enabled } : method
      )
    );
  };

  const handleFeeChange = (id: number, fee: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === id
          ? { ...method, fee: Number.parseFloat(fee) || 0 }
          : method
      )
    );
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (value: string) => {
    setSettings((prev) => ({ ...prev, currency: value }));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving payment settings:", { settings, paymentMethods });
    // Show success message
    alert("Payment settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Enable or disable payment methods and set processing fees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`method-${method.id}`}
                    checked={method.enabled}
                    onCheckedChange={(checked) =>
                      handleMethodToggle(method.id, checked)
                    }
                  />
                  <Label
                    htmlFor={`method-${method.id}`}
                    className="font-medium"
                  >
                    {method.name}
                  </Label>
                </div>
                <div className="flex items-center w-32">
                  <span className="mr-2 text-gray-400">
                    <Percent className="h-4 w-4 text-white" />
                  </span>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={method.fee}
                    onChange={(e) => handleFeeChange(method.id, e.target.value)}
                    disabled={!method.enabled}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Payment Settings</CardTitle>
          <CardDescription>Configure currency and tax settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKR">PKR (Rs)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="AED">AED (د.إ)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">GST Rate (%)</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Percent className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  min="0"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={handleSettingChange}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Banknote className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="minOrderAmount"
                  name="minOrderAmount"
                  type="number"
                  min="0"
                  value={settings.minOrderAmount}
                  onChange={handleSettingChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Credentials</CardTitle>
          <CardDescription>
            Configure your payment gateway API keys
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="easypaisaMerchantId">Easypaisa Merchant ID</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <CreditCard className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="easypaisaMerchantId"
                  name="easypaisaMerchantId"
                  value={settings.easypaisaMerchantId}
                  onChange={handleSettingChange}
                  className="rounded-l-none font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="easypaisaSecretKey">Easypaisa Secret Key</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <CreditCard className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="easypaisaSecretKey"
                  name="easypaisaSecretKey"
                  type="password"
                  value={settings.easypaisaSecretKey}
                  onChange={handleSettingChange}
                  className="rounded-l-none font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jazzcashMerchantId">JazzCash Merchant ID</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <CreditCard className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="jazzcashMerchantId"
                  name="jazzcashMerchantId"
                  value={settings.jazzcashMerchantId}
                  onChange={handleSettingChange}
                  className="rounded-l-none font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jazzcashPassword">JazzCash Password</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <CreditCard className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="jazzcashPassword"
                  name="jazzcashPassword"
                  type="password"
                  value={settings.jazzcashPassword}
                  onChange={handleSettingChange}
                  className="rounded-l-none font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
