import type { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Chalet Cafe Islamabad",
  description: "Login to your Chalet Cafe account",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
