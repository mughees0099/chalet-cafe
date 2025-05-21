// "use client";

import { getUser } from "../components/auth/auth";

export default async function CheckStatus() {
  if (typeof window === "undefined") {
    return null;
  }
  const check = localStorage.getItem("mail");

  if (check) {
    const user = getUser(check);
    if (user) {
      return await user;
    } else {
      console.log("User is not logged in.");
    }
  } else {
    console.log("No user data found in localStorage.");
  }
}
