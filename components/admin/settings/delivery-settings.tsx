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
import { Slider } from "@/components/ui/slider";
import { Trash2, Plus, MapPin, Clock } from "lucide-react";
export default function DeliverySettings() {
  const [settings, setSettings] = useState({
    enableDelivery: true,
    defaultDeliveryFee: 95,
    freeDeliveryThreshold: 2500,
    maxDeliveryDistance: 10,
    estimatedDeliveryTime: 30,
    showDeliveryTracking: true,
  });

  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Zone 1 (0-2 miles)",
      fee: 95,
      minOrder: 500,
      estimatedTime: "20-30",
    },
    {
      id: 2,
      name: "Zone 2 (2-5 miles)",
      fee: 125,
      minOrder: 900,
      estimatedTime: "30-45",
    },
    {
      id: 3,
      name: "Zone 3 (5-10 miles)",
      fee: 190,
      minOrder: 1700,
      estimatedTime: "45-60",
    },
  ]);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setSettings((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleZoneChange = (
    id: number,
    field: string,
    value: string | number
  ) => {
    setZones((zones) =>
      zones.map((zone) => (zone.id === id ? { ...zone, [field]: value } : zone))
    );
  };

  const addZone = () => {
    const newId = Math.max(...zones.map((z) => z.id), 0) + 1;
    setZones([
      ...zones,
      {
        id: newId,
        name: `Zone ${newId}`,
        fee: 0,
        minOrder: 0,
        estimatedTime: "30-45",
      },
    ]);
  };

  const removeZone = (id: number) => {
    setZones(zones.filter((zone) => zone.id !== id));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving delivery settings:", { settings, zones });
    // Show success message
    alert("Delivery settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
          <CardDescription>
            Configure your cafe's delivery settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="enable-delivery">Enable Delivery</Label>
              <p className="text-sm text-gray-400">
                Allow customers to order delivery
              </p>
            </div>
            <Switch
              id="enable-delivery"
              checked={settings.enableDelivery}
              onCheckedChange={(checked) =>
                handleSwitchChange("enableDelivery", checked)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="defaultDeliveryFee">Default Delivery Fee</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <span className="h-4 w-4 text-white">Rs</span>
                </span>
                <Input
                  id="defaultDeliveryFee"
                  name="defaultDeliveryFee"
                  type="number"
                  min="0"
                  step="10"
                  value={settings.defaultDeliveryFee}
                  onChange={handleSettingChange}
                  className="rounded-l-none"
                  disabled={!settings.enableDelivery}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="freeDeliveryThreshold">
                Free Delivery Threshold
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <span className="h-4 w-4 text-white">Rs</span>
                </span>
                <Input
                  id="freeDeliveryThreshold"
                  name="freeDeliveryThreshold"
                  type="number"
                  min="0"
                  step="10"
                  value={settings.freeDeliveryThreshold}
                  onChange={handleSettingChange}
                  className="rounded-l-none"
                  disabled={!settings.enableDelivery}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="maxDeliveryDistance">
                  Max Delivery Distance (miles): {settings.maxDeliveryDistance}
                </Label>
              </div>
              <Slider
                id="maxDeliveryDistance"
                min={1}
                max={20}
                step={1}
                value={[settings.maxDeliveryDistance]}
                onValueChange={(value) =>
                  handleSliderChange("maxDeliveryDistance", value)
                }
                disabled={!settings.enableDelivery}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDeliveryTime">
                Estimated Delivery Time (minutes)
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  <Clock className="h-4 w-4 text-white" />
                </span>
                <Input
                  id="estimatedDeliveryTime"
                  name="estimatedDeliveryTime"
                  type="number"
                  min="1"
                  value={settings.estimatedDeliveryTime}
                  onChange={handleSettingChange}
                  className="rounded-l-none"
                  disabled={!settings.enableDelivery}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Delivery Zones</CardTitle>
            <CardDescription>
              Configure delivery zones with different fees and minimum orders
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={addZone}
            disabled={!settings.enableDelivery}
          >
            <Plus className="h-4 w-4 text-white mr-2" /> Add Zone
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-700"
              >
                <div className="col-span-12 md:col-span-3 space-y-1">
                  <Label htmlFor={`zone-${zone.id}-name`}>Zone Name</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                      <MapPin className="h-4 w-4 text-white" />
                    </span>
                    <Input
                      id={`zone-${zone.id}-name`}
                      value={zone.name}
                      onChange={(e) =>
                        handleZoneChange(zone.id, "name", e.target.value)
                      }
                      className="rounded-l-none"
                      disabled={!settings.enableDelivery}
                    />
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 space-y-1">
                  <Label htmlFor={`zone-${zone.id}-fee`}>Delivery Fee</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                      <span className="h-4 w-4 text-white">Rs</span>
                    </span>
                    <Input
                      id={`zone-${zone.id}-fee`}
                      type="number"
                      min="0"
                      step="20"
                      value={zone.fee}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "fee",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      className="rounded-l-none"
                      disabled={!settings.enableDelivery}
                    />
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 space-y-1">
                  <Label htmlFor={`zone-${zone.id}-min`}>Min. Order </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                      <span className="h-4 w-4 text-white">Rs</span>
                    </span>
                    <Input
                      id={`zone-${zone.id}-min`}
                      type="number"
                      min="0"
                      step="20"
                      value={zone.minOrder}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "minOrder",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      className="rounded-l-none"
                      disabled={!settings.enableDelivery}
                    />
                  </div>
                </div>

                <div className="col-span-10 md:col-span-3 space-y-1">
                  <Label htmlFor={`zone-${zone.id}-time`}>
                    Est. Time (min)
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                      <Clock className="h-4 w-4 text-white" />
                    </span>
                    <Input
                      id={`zone-${zone.id}-time`}
                      value={zone.estimatedTime}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "estimatedTime",
                          e.target.value
                        )
                      }
                      className="rounded-l-none"
                      disabled={!settings.enableDelivery}
                    />
                  </div>
                </div>

                <div className="col-span-2 md:col-span-2 flex justify-end">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeZone(zone.id)}
                    disabled={!settings.enableDelivery || zones.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </Button>
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
