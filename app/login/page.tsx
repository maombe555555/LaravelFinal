"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Droplets, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "admin",
    rememberMe: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      const { email, password, role } = loginData

      // Mock authentication logic
      const validCredentials = [
        { email: "admin@watertank.com", password: "admin123", role: "admin", name: "Admin User" },
        { email: "agent@watertank.com", password: "agent123", role: "agent", name: "Agent Smith" },
        { email: "client@watertank.com", password: "client123", role: "client", name: "John Client" },
      ]

      const user = validCredentials.find(
        (cred) => cred.email === email && cred.password === password && cred.role === role,
      )

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            role: user.role,
            name: user.name,
            id: `${user.role}-1`,
          }),
        )
        router.push("/loading?redirect=" + user.role)
      } else {
        setError("Invalid credentials or role mismatch")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with logo and navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-full">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Smart Water Tank</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <Button variant="default" size="sm">
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button variant="outline" className="mb-6" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg p-8 text-center text-white">
            <div className="w-20 h-20 bg-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Droplets className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-lg font-semibold">WELCOME BACK TO SMART WATER TANK</h2>
          </div>

          {/* Login Form */}
          <Card className="rounded-t-none border-t-0">
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-12 bg-gray-50 border-gray-200"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="h-12 bg-gray-50 border-gray-200"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">Login As</Label>
                  <RadioGroup
                    value={loginData.role}
                    onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin" className="text-gray-600">
                        ADMIN
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agent" id="agent" />
                      <Label htmlFor="agent" className="text-gray-600">
                        AGENT
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="client" id="client" />
                      <Label htmlFor="client" className="text-gray-600">
                        CLIENT
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="remember" className="text-gray-600">
                    Remember Me
                  </Label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
