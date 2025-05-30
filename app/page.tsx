"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, BarChart3, Bell, Smartphone, ArrowRight, CheckCircle, Users, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Monitor water quality parameters with advanced analytics and reporting capabilities.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive instant notifications for water quality issues and system maintenance needs.",
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Access your water monitoring system from anywhere with our mobile-responsive platform.",
    },
  ]

  const benefits = [
    "Real-time water quality monitoring",
    "Automated alert system",
    "Historical data analysis",
    "Multi-user role management",
    "Mobile-responsive design",
    "Comprehensive reporting",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <a href="#" className="text-blue-600 font-medium">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <Button onClick={() => router.push("/login")}>Login</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Water Tank Monitoring</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            IoT-powered smart water tank monitoring is a revolutionary tool that enhances efficiency, reliability, and
            sustainability. By offering real-time tracking, smart alerts, mobile access, and data-driven insights, this
            system empowers users to optimize water usage, reduce waste, and ensure a continuous supply. Embracing this
            technology is a step toward better resource management, benefiting individuals, businesses, and the
            environment.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            onClick={() => router.push("/login")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our smart water tank system can transform your water management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Smart Water Tank Monitoring?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive water monitoring solution provides everything you need to ensure optimal water quality
                and efficient resource management.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-600">Active Users</p>
              </Card>
              <Card className="p-6 text-center">
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
                <p className="text-gray-600">Tanks Monitored</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">99.9%</h3>
                <p className="text-gray-600">Uptime</p>
              </Card>
              <Card className="p-6 text-center">
                <Bell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                <p className="text-gray-600">Monitoring</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Smart Water Tank for their water monitoring needs.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            onClick={() => router.push("/login")}
          >
            Start Monitoring Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-full">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Smart Water Tank</span>
              </div>
              <p className="text-gray-400">
                Revolutionary IoT-powered water monitoring solution for efficient resource management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smart Water Tank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
