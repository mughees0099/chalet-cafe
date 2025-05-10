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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Clock, MapPin, Phone, Mail, Globe } from "lucide-react";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    cafeName: "Chalet Cafe",
    description:
      "A cozy cafe serving delicious Pakistani and international cuisine in a warm, inviting atmosphere.",
    phone: "+92 316 5569006",
    email: "farisak018@gmail.com",
    address:
      "Main Nazim-ud-din Road F-7/1, Opposite Islamabad Stock Exchange Tower, Islamabad, Pakistan",
    website: "https://chalet-cafe.vercel.app/",
    isOpen: true,
    openingHours: {
      monday: { open: "10:00", close: "22:00", isOpen: true },
      tuesday: { open: "10:00", close: "22:00", isOpen: true },
      wednesday: { open: "10:00", close: "22:00", isOpen: true },
      thursday: { open: "10:00", close: "22:00", isOpen: true },
      friday: { open: "14:00", close: "23:00", isOpen: true },
      saturday: { open: "10:00", close: "23:00", isOpen: true },
      sunday: { open: "10:00", close: "22:00", isOpen: true },
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, isOpen: checked }));
  };

  const handleTimeChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [type]: value,
        },
      },
    }));
  };

  const handleDayToggle = (day: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          isOpen: checked,
        },
      },
    }));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving settings:", settings);
    // Show success message
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cafe Information</CardTitle>
          <CardDescription>
            Update your cafe's basic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cafeName">Cafe Name</Label>
              <Input
                id="cafeName"
                name="cafeName"
                value={settings.cafeName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Globe className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="website"
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Phone className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="phone"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Mail className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                <MapPin className="h-4 w-4 text-white" />
              </span>
              <Input
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="rounded-l-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={settings.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>Set your cafe's operating hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="cafe-status"
                checked={settings.isOpen}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="cafe-status">
                Cafe is currently {settings.isOpen ? "Open" : "Closed"}
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.openingHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3 md:col-span-2">
                  <Label className="capitalize">{day}</Label>
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  <Switch
                    id={`${day}-toggle`}
                    checked={hours.isOpen}
                    onCheckedChange={(checked) => handleDayToggle(day, checked)}
                  />
                </div>
                <div className="col-span-7 md:col-span-9 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleTimeChange(day, "open", e.target.value)
                      }
                      disabled={!hours.isOpen}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleTimeChange(day, "close", e.target.value)
                      }
                      disabled={!hours.isOpen}
                    />
                  </div>
                </div>
              </div>
            ))}
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
