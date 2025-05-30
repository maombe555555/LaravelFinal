"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
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
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/about" className="text-blue-600 font-medium">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <Button variant="default" size="sm" onClick={() => router.push("/")}>
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="outline" className="mb-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">About Smart Water Tank</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our journey, our mission, and the values that drive us to revolutionize water management.
          </p>
        </div>

        {/* Our Story Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-6">
                Founded on the principle of sustainable resource management, Smart Water Tank has grown from a simple
                idea into a leading provider of intelligent water solutions.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Smart Water Tank was founded with a simple mission: to revolutionize how we manage water resources. We
              believe that access to clean water and efficient water management is essential for sustainable living. Our
              journey began with a small team passionate about technology and environmental conservation, aiming to
              create a system that empowers users with real-time data and control over their water assets.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Vision Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Mission & Vision</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600">
                Our guiding principles that shape our goals and the impact we strive to make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide innovative, reliable, and sustainable water monitoring solutions that empower individuals
                  and organizations to optimize their water usage, reduce waste, and ensure water quality for a better
                  tomorrow.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-600 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be the global leader in smart water management technology, creating a world where every drop of
                  water is monitored, managed, and conserved efficiently for future generations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Continuously advancing technology to provide cutting-edge water monitoring solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Committed to environmental conservation and sustainable water management practices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-600">
                  Ensuring dependable and accurate monitoring systems that users can trust.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of users who trust Smart Water Tank for their water monitoring needs.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/")}>
            Start Monitoring Today
          </Button>
        </div>
      </div>
    </div>
  )
}
