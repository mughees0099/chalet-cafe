"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import { loginUser } from "./auth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const identifier = loginMethod === "email" ? email : phone;
      const response = await loginUser(identifier, password);
      if (!response.success) {
        toast.error("Invalid credentials");
        return;
      }
      const user = response.user;
      const userRole = user.role;
      setUserRole(userRole);

      toast.success("Login successful!");

      localStorage.setItem("mail", user.email);

      switch (userRole) {
        case "admin":
          router.push("/admin");
          break;

        default:
          router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Tabs
          defaultValue="email"
          value={loginMethod}
          onValueChange={setLoginMethod}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-2 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={loginMethod === "email"}
            />
          </TabsContent>

          <TabsContent value="phone" className="space-y-2 mt-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+92 300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={loginMethod === "phone"}
            />
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-amber-800 hover:text-amber-900"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center border rounded-md">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative"
              required
            />

            <Button
              type="button"
              variant="link"
              className="text-sm text-amber-800 hover:text-amber-900"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff /> : <EyeIcon />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-800 hover:bg-amber-900"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-amber-800 hover:text-amber-900 font-medium"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
