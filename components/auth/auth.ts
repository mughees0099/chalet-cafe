"use server";

import mongoose from "mongoose";
import User from "../../models/user";
import DatabaseConnection from "@/config/db";
import bcrypt from "bcrypt";

type UserData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export async function registerUser(userData: UserData) {
  try {
    await DatabaseConnection();

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }],
    });
    if (existingUser) {
      return {
        success: false,
        error:
          existingUser.email === userData.email
            ? "Email already registered"
            : "Phone number already registered",
      };
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);
    userData.password = passwordHash;

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    });

    await newUser.save();
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

export async function loginUser(identifier: string, password: string) {
  try {
    await DatabaseConnection();

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid password" };
    }
    const plainUser = user.toObject();
    delete plainUser.password;
    delete plainUser._id;

    return { success: true, user: plainUser };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function getUser(userEmail: string) {
  try {
    await DatabaseConnection();

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    const plainUser = user.toObject();
    delete plainUser.password;
    delete plainUser._id;
    return { success: true, user: plainUser };
  } catch (error) {
    console.error("Get user error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Get user failed",
    };
  }
}
