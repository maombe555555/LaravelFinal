"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSystem, NotificationBell } from "@/components/notification-system"
import {
  Droplets,
  AlertTriangle,
  Thermometer,
  Activity,
  LogOut,
  TrendingUp,
  Download,
  Settings,
  User,
  MessageSquare,
} from "lucide-react"

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "client") {
        router.push("/")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock real-time data
  const currentData = {
    ph: 7.2,
    chloride: 45,
    temperature: 22.5,
    waterLevel: 85,
    dissolvedParticles: 120,
  }

  // Historical data for display
  const historicalData = [
    { time: "00:00", ph: 7.1, chloride: 42, temperature: 21.8 },
    { time: "04:00", ph: 7.2, chloride: 44, temperature: 22.1 },
    { time: "08:00", ph: 7.0, chloride: 46, temperature: 22.5 },
    { time: "12:00", ph: 7.2, chloride: 45, temperature: 23.2 },
    { time: "16:00", ph: 7.1, chloride: 43, temperature: 22.8 },
    { time: "20:00", ph: 7.2, chloride: 45, temperature: 22.5 },
  ]

  const alerts = [
    { id: 1, type: "Warning", message: "Chloride levels slightly elevated", time: "2 hours ago", severity: "medium" },
    { id: 2, type: "Info", message: "Routine maintenance scheduled", time: "1 day ago", severity: "low" },
    { id: 3, type: "Normal", message: "All parameters within normal range", time: "3 hours ago", severity: "low" },
  ]

  const getStatusColor = (value: number, parameter: string) => {
    switch (parameter) {
      case "ph":
        return value >= 6.5 && value <= 8.5 ? "text-green-600" : "text-red-600"
      case "chloride":
        return value <= 50 ? "text-green-600" : value <= 70 ? "text-yellow-600" : "text-red-600"
      case "temperature":
        return value >= 20 && value <= 25 ? "text-green-600" : "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (value: number, parameter: string) => {
    switch (parameter) {
      case "ph":
        return value >= 6.5 && value <= 8.5 ? "Normal" : "Alert"
      case "chloride":
        return value <= 50 ? "Normal" : value <= 70 ? "Warning" : "Critical"
      case "temperature":
        return value >= 20 && value <= 25 ? "Normal" : "Warning"
      default:
        return "Normal"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Water Tank</h1>
                <p className="text-sm text-gray-500">Tank Monitoring Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <NotificationBell currentUser={user} />
                <span className="ml-2">Notifications</span>
              </Button>
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Monitoring Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">pH Level</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(currentData.ph, "ph")}`}>{currentData.ph}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Range: 6.5-8.5</p>
                <Badge variant={getStatusBadge(currentData.ph, "ph") === "Normal" ? "default" : "destructive"}>
                  {getStatusBadge(currentData.ph, "ph")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chloride Level</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(currentData.chloride, "chloride")}`}>
                {currentData.chloride} ppm
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Max: 50 ppm</p>
                <Badge
                  variant={getStatusBadge(currentData.chloride, "chloride") === "Normal" ? "default" : "destructive"}
                >
                  {getStatusBadge(currentData.chloride, "chloride")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(currentData.temperature, "temperature")}`}>
                {currentData.temperature}°C
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Optimal: 20-25°C</p>
                <Badge
                  variant={
                    getStatusBadge(currentData.temperature, "temperature") === "Normal" ? "default" : "secondary"
                  }
                >
                  {getStatusBadge(currentData.temperature, "temperature")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Level</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{currentData.waterLevel}%</div>
              <Progress value={currentData.waterLevel} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Tank capacity</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList>
            <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Trends</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Water Quality Overview</CardTitle>
                  <CardDescription>Current water quality status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-green-800">Safe Water Quality</h3>
                        <p className="text-sm text-green-600">All parameters within normal range</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">75%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-yellow-800">Moderate Risk</h3>
                        <p className="text-sm text-yellow-600">Some parameters need attention</p>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">20%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-red-800">Unsafe</h3>
                        <p className="text-sm text-red-600">Immediate action required</p>
                      </div>
                      <div className="text-2xl font-bold text-red-600">5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Parameters</CardTitle>
                  <CardDescription>Live readings from your water tank</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">pH Level</div>
                      <div className="text-2xl font-bold text-blue-600">{currentData.ph}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Chloride</div>
                      <div className="text-2xl font-bold text-green-600">{currentData.chloride} ppm</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600">Temperature</div>
                      <div className="text-2xl font-bold text-orange-600">{currentData.temperature}°C</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Dissolved Particles</div>
                      <div className="text-2xl font-bold text-purple-600">{currentData.dissolvedParticles} mg/L</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Historical Trends</CardTitle>
                    <CardDescription>24-hour parameter trends</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Readings</h3>
                  <div className="space-y-2">
                    {historicalData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{data.time}</span>
                        <div className="flex gap-4 text-sm">
                          <span>pH: {data.ph}</span>
                          <span>Chloride: {data.chloride}ppm</span>
                          <span>Temp: {data.temperature}°C</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts & Notifications</CardTitle>
                <CardDescription>Stay informed about your water tank status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div
                        className={`p-2 rounded-full ${alert.severity === "medium" ? "bg-yellow-100" : "bg-blue-100"}`}
                      >
                        <AlertTriangle
                          className={`h-4 w-4 ${alert.severity === "medium" ? "text-yellow-600" : "text-blue-600"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{alert.type}</span>
                          <Badge variant={alert.severity === "medium" ? "secondary" : "default"}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <NotificationSystem currentUser={user} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Badge variant="default">Client</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <p className="text-gray-900">Client</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tank Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Tank ID</label>
                        <p className="text-gray-900">TANK-001</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">Main Building</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Capacity</label>
                        <p className="text-gray-900">1000 Liters</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
