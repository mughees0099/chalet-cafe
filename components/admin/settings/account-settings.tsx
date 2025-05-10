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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, User, Lock, Shield, Mail, UserPlus } from "lucide-react";

export default function AccountSettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    passwordExpiry: "90",
  });

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Farisa Abbasi",
      email: "farisa@chaletcafe.com",
      role: "owner",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
    {
      id: 2,
      name: "Mahnoor Waseef",
      email: "mahnoor@chaletcafe.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
    {
      id: 3,
      name: "Alexa Smith",
      email: "alexa@chaletcafe.com",
      role: "manager",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
  ]);

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "manager",
    password: "",
    confirmPassword: "",
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminStatusToggle = (id: number, active: boolean) => {
    setAdmins((admins) =>
      admins.map((admin) => (admin.id === id ? { ...admin, active } : admin))
    );
  };

  const handleAdminRoleChange = (id: number, role: string) => {
    setAdmins((admins) =>
      admins.map((admin) => (admin.id === id ? { ...admin, role } : admin))
    );
  };

  const handleNewAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewAdminRoleChange = (role: string) => {
    setNewAdmin((prev) => ({ ...prev, role }));
  };

  const addAdmin = () => {
    // Validate form
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      alert("Please fill in all required fields");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Add new admin
    const newId = Math.max(...admins.map((a) => a.id), 0) + 1;
    setAdmins([
      ...admins,
      {
        id: newId,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        avatar: "/placeholder.svg?height=40&width=40",
        active: true,
      },
    ]);

    // Reset form
    setNewAdmin({
      name: "",
      email: "",
      role: "manager",
      password: "",
      confirmPassword: "",
    });
    setShowAddAdmin(false);
  };

  const removeAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving account settings:", { settings, admins });
    // Show success message
    alert("Account settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure security settings for admin accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor-auth" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Two-Factor Authentication
              </Label>
              <p className="text-sm text-gray-400">
                Require 2FA for all admin accounts
              </p>
            </div>
            <Switch
              id="two-factor-auth"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) =>
                handleSwitchChange("twoFactorAuth", checked)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                name="sessionTimeout"
                type="number"
                min="5"
                value={settings.sessionTimeout}
                onChange={handleSettingChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                name="maxLoginAttempts"
                type="number"
                min="1"
                value={settings.maxLoginAttempts}
                onChange={handleSettingChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                name="passwordExpiry"
                type="number"
                min="0"
                value={settings.passwordExpiry}
                onChange={handleSettingChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Admin Accounts</CardTitle>
            <CardDescription>
              Manage admin users and their permissions
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAddAdmin(true)}
            disabled={showAddAdmin}
          >
            <UserPlus className="h-4 w-4 mr-2" /> Add Admin
          </Button>
        </CardHeader>
        <CardContent>
          {showAddAdmin && (
            <Card className="mb-6 border border-amber-600">
              <CardHeader>
                <CardTitle>Add New Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-admin-name">Name</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                        <User className="h-4 w-4" />
                      </span>
                      <Input
                        id="new-admin-name"
                        name="name"
                        value={newAdmin.name}
                        onChange={handleNewAdminChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-admin-email">Email</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="new-admin-email"
                        name="email"
                        type="email"
                        value={newAdmin.email}
                        onChange={handleNewAdminChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-admin-role">Role</Label>
                  <Select
                    value={newAdmin.role}
                    onValueChange={(value) => handleNewAdminRoleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-admin-password">Password</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <Input
                        id="new-admin-password"
                        name="password"
                        type="password"
                        value={newAdmin.password}
                        onChange={handleNewAdminChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-admin-confirm-password">
                      Confirm Password
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <Input
                        id="new-admin-confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={newAdmin.confirmPassword}
                        onChange={handleNewAdminChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowAddAdmin(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addAdmin}>Add Admin</Button>
              </CardFooter>
            </Card>
          )}

          <div className="space-y-4">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between py-3 border-b border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={admin.avatar || "/placeholder.svg"}
                      alt={admin.name}
                    />
                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-400">{admin.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Select
                    value={admin.role}
                    onValueChange={(value) =>
                      handleAdminRoleChange(admin.id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>

                  <Switch
                    id={`admin-${admin.id}-status`}
                    checked={admin.active}
                    onCheckedChange={(checked) =>
                      handleAdminStatusToggle(admin.id, checked)
                    }
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAdmin(admin.id)}
                    disabled={admin.role === "owner" || admins.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
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
