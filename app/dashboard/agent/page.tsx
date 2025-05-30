"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Droplets,
  AlertTriangle,
  Search,
  Plus,
  LogOut,
  Edit,
  Trash2,
  Eye,
  Wrench,
  MessageSquare,
} from "lucide-react"
import { NotificationSystem, NotificationBell } from "@/components/notification-system"

interface Client {
  id: string
  name: string
  email: string
  tanks: number
  status: "Active" | "Inactive" | "Maintenance"
  lastContact: string
  avatar: string
}

export default function AgentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "ABC Manufacturing",
      email: "contact@abc.com",
      tanks: 3,
      status: "Active",
      lastContact: "2024-01-28",
      avatar: "A",
    },
    {
      id: "2",
      name: "XYZ Industries",
      email: "info@xyz.com",
      tanks: 2,
      status: "Active",
      lastContact: "2024-01-27",
      avatar: "X",
    },
    {
      id: "3",
      name: "Tech Solutions Ltd",
      email: "admin@tech.com",
      tanks: 1,
      status: "Maintenance",
      lastContact: "2024-01-25",
      avatar: "T",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    tanks: 1,
    password: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "agent") {
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

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      const client: Client = {
        id: Date.now().toString(),
        name: newClient.name,
        email: newClient.email,
        tanks: newClient.tanks,
        status: "Active",
        lastContact: new Date().toISOString().split("T")[0],
        avatar: newClient.name.charAt(0).toUpperCase(),
      }
      setClients([...clients, client])
      setNewClient({ name: "", email: "", tanks: 1, password: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditClient = () => {
    if (editingClient) {
      setClients(clients.map((c) => (c.id === editingClient.id ? editingClient : c)))
      setIsEditDialogOpen(false)
      setEditingClient(null)
    }
  }

  const handleDeleteClient = (clientId: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((c) => c.id !== clientId))
    }
  }

  const stats = {
    totalClients: clients.length,
    alertsSent: 8,
    activeTanks: clients.reduce((sum, client) => sum + client.tanks, 0),
    maintenanceRequests: 5,
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
                <p className="text-sm text-gray-500">Agent Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" size="sm">
                <NotificationBell currentUser={user} />
                <span className="ml-2">Notifications</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Sent</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.alertsSent}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tanks</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTanks}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.maintenanceRequests}</div>
              <p className="text-xs text-muted-foreground">Pending requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clients">Client Management</TabsTrigger>
            <TabsTrigger value="tanks">Tank Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>Manage your assigned clients</CardDescription>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Client
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Client Name</Label>
                          <Input
                            id="name"
                            value={newClient.name}
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            placeholder="Enter client name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newClient.email}
                            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tanks">Number of Tanks</Label>
                          <Input
                            id="tanks"
                            type="number"
                            min="1"
                            value={newClient.tanks}
                            onChange={(e) =>
                              setNewClient({ ...newClient, tanks: Number.parseInt(e.target.value) || 1 })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newClient.password}
                            onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button onClick={handleAddClient} className="flex-1">
                            Add Client
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input placeholder="Search clients..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tanks</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {client.avatar}
                            </div>
                            <span className="font-medium">{client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.tanks}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              client.status === "Active"
                                ? "default"
                                : client.status === "Maintenance"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{client.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingClient(client)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Client</DialogTitle>
                                </DialogHeader>
                                {editingClient && (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Client Name</Label>
                                      <Input
                                        id="edit-name"
                                        value={editingClient.name}
                                        onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-email">Email</Label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={editingClient.email}
                                        onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-tanks">Number of Tanks</Label>
                                      <Input
                                        id="edit-tanks"
                                        type="number"
                                        min="1"
                                        value={editingClient.tanks}
                                        onChange={(e) =>
                                          setEditingClient({
                                            ...editingClient,
                                            tanks: Number.parseInt(e.target.value) || 1,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-status">Status</Label>
                                      <Select
                                        value={editingClient.status}
                                        onValueChange={(value: any) =>
                                          setEditingClient({ ...editingClient, status: value })
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Active">Active</SelectItem>
                                          <SelectItem value="Inactive">Inactive</SelectItem>
                                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="flex-1"
                                      >
                                        Cancel
                                      </Button>
                                      <Button onClick={handleEditClient} className="flex-1">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteClient(client.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tanks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tank Monitoring</CardTitle>
                <CardDescription>Monitor water quality parameters for all client tanks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">Tank monitoring data will be displayed here</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Analytics</CardTitle>
                <CardDescription>Analytics and insights for your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">Analytics charts will be displayed here</div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages" className="space-y-6">
            <NotificationSystem currentUser={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
