"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Droplets, Database, Shield, Activity, CheckCircle } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { icon: Shield, label: "Authenticating user...", duration: 1000 },
    { icon: Database, label: "Loading system data...", duration: 1500 },
    { icon: Activity, label: "Connecting to sensors...", duration: 1200 },
    { icon: Droplets, label: "Initializing dashboard...", duration: 800 },
    { icon: CheckCircle, label: "Ready!", duration: 500 },
  ]

  useEffect(() => {
    let totalDuration = 0
    let currentDuration = 0

    const totalTime = loadingSteps.reduce((acc, step) => acc + step.duration, 0)

    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        currentDuration += 50
        const stepProgress = Math.min((currentDuration / loadingSteps[currentStep].duration) * 100, 100)
        const overallProgress =
          ((totalDuration +
            (currentDuration / loadingSteps[currentStep].duration) * loadingSteps[currentStep].duration) /
            totalTime) *
          100

        setProgress(overallProgress)

        if (currentDuration >= loadingSteps[currentStep].duration) {
          totalDuration += loadingSteps[currentStep].duration
          currentDuration = 0
          setCurrentStep((prev) => prev + 1)
        }
      } else {
        clearInterval(interval)
        // Redirect based on user role
        setTimeout(() => {
          router.push(`/dashboard/${redirect}`)
        }, 500)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [currentStep, router, redirect])

  const CurrentIcon = currentStep < loadingSteps.length ? loadingSteps[currentStep].icon : CheckCircle

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AquaMonitor</h1>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
              <CurrentIcon className="h-12 w-12 text-blue-600 animate-pulse" />
            </div>

            {/* Animated rings */}
            <div className="absolute inset-0 w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-blue-300 animate-pulse"></div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-gray-600">
              {currentStep < loadingSteps.length ? loadingSteps[currentStep].label : "Complete!"}
            </p>
            <p className="text-xs text-gray-500">{Math.round(progress)}% complete</p>
          </div>

          {/* Loading steps */}
          <div className="space-y-2">
            {loadingSteps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    isCompleted
                      ? "bg-green-50 text-green-700"
                      : isCurrent
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-400"
                  }`}
                >
                  <StepIcon
                    className={`h-4 w-4 ${isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span className="text-sm">{step.label}</span>
                  {isCompleted && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">Initializing your personalized dashboard...</div>
      </div>
    </div>
  )
}
