"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Send, MessageSquare, User, Clock, AlertCircle } from "lucide-react"

interface Message {
  id: string
  from: string
  fromRole: string
  fromName: string
  to: string
  toRole: string
  toName: string
  subject: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  type: "message" | "alert" | "notification"
}

interface NotificationSystemProps {
  currentUser: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function NotificationSystem({ currentUser }: NotificationSystemProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    to: "",
    toRole: "",
    subject: "",
    message: "",
    priority: "medium" as "low" | "medium" | "high",
    type: "message" as "message" | "alert" | "notification",
  })

  // Available users based on current user role
  const getAvailableUsers = () => {
    const allUsers = [
      { id: "admin-1", name: "Admin User", email: "admin@watertank.com", role: "admin" },
      { id: "agent-1", name: "Agent Smith", email: "agent@watertank.com", role: "agent" },
      { id: "agent-2", name: "Agent Johnson", email: "agent2@watertank.com", role: "agent" },
      { id: "client-1", name: "John Client", email: "client@watertank.com", role: "client" },
      { id: "client-2", name: "ABC Manufacturing", email: "contact@abc.com", role: "client" },
      { id: "client-3", name: "XYZ Industries", email: "info@xyz.com", role: "client" },
    ]

    // Filter out current user
    return allUsers.filter((user) => user.id !== currentUser.id)
  }

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("waterTankMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initialize with some sample messages
      const sampleMessages: Message[] = [
        {
          id: "1",
          from: "admin-1",
          fromRole: "admin",
          fromName: "Admin User",
          to: currentUser.id,
          toRole: currentUser.role,
          toName: currentUser.name,
          subject: "Welcome to Smart Water Tank",
          message: "Welcome to our water monitoring system. If you have any questions, feel free to reach out.",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          read: false,
          priority: "medium",
          type: "notification",
        },
        {
          id: "2",
          from: "agent-1",
          fromRole: "agent",
          fromName: "Agent Smith",
          to: currentUser.id,
          toRole: currentUser.role,
          toName: currentUser.name,
          subject: "Tank Maintenance Scheduled",
          message: "Your tank maintenance has been scheduled for next week. We'll send you a reminder.",
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          read: false,
          priority: "high",
          type: "alert",
        },
      ]
      setMessages(sampleMessages)
      localStorage.setItem("waterTankMessages", JSON.stringify(sampleMessages))
    }
  }, [currentUser])

  const saveMessages = (updatedMessages: Message[]) => {
    setMessages(updatedMessages)
    localStorage.setItem("waterTankMessages", JSON.stringify(updatedMessages))
  }

  const sendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.message) return

    const selectedUser = getAvailableUsers().find((user) => user.id === newMessage.to)
    if (!selectedUser) return

    const message: Message = {
      id: Date.now().toString(),
      from: currentUser.id,
      fromRole: currentUser.role,
      fromName: currentUser.name,
      to: newMessage.to,
      toRole: selectedUser.role,
      toName: selectedUser.name,
      subject: newMessage.subject,
      message: newMessage.message,
      timestamp: new Date().toISOString(),
      read: false,
      priority: newMessage.priority,
      type: newMessage.type,
    }

    const updatedMessages = [...messages, message]
    saveMessages(updatedMessages)

    // Reset form
    setNewMessage({
      to: "",
      toRole: "",
      subject: "",
      message: "",
      priority: "medium",
      type: "message",
    })
    setIsComposeOpen(false)
  }

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    saveMessages(updatedMessages)
  }

  const getReceivedMessages = () => {
    return messages.filter((msg) => msg.to === currentUser.id)
  }

  const getSentMessages = () => {
    return messages.filter((msg) => msg.from === currentUser.id)
  }

  const getUnreadCount = () => {
    return getReceivedMessages().filter((msg) => !msg.read).length
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      case "notification":
        return <Bell className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Notifications & Messages</h2>
          {getUnreadCount() > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {getUnreadCount()}
            </Badge>
          )}
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Send To</Label>
                <Select
                  value={newMessage.to}
                  onValueChange={(value) => {
                    const user = getAvailableUsers().find((u) => u.id === value)
                    setNewMessage({ ...newMessage, to: value, toRole: user?.role || "" })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableUsers().map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Message Type</Label>
                <Select
                  value={newMessage.type}
                  onValueChange={(value: any) => setNewMessage({ ...newMessage, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="message">Message</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newMessage.priority}
                  onValueChange={(value: any) => setNewMessage({ ...newMessage, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  placeholder="Enter your message"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={sendMessage} className="flex-1">
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages Tabs */}
      <Tabs defaultValue="received" className="space-y-6">
        <TabsList>
          <TabsTrigger value="received" className="relative">
            Received Messages
            {getUnreadCount() > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-full text-xs">
                {getUnreadCount()}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent">Sent Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {getReceivedMessages().length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages received yet</p>
              </CardContent>
            </Card>
          ) : (
            getReceivedMessages()
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all ${!message.read ? "border-blue-200 bg-blue-50" : ""}`}
                  onClick={() => markAsRead(message.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{message.fromName}</span>
                            <Badge variant="outline" className="text-xs">
                              {message.fromRole}
                            </Badge>
                            {getTypeIcon(message.type)}
                            <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                              {message.priority}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                          <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </div>
                      {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {getSentMessages().length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages sent yet</p>
              </CardContent>
            </Card>
          ) : (
            getSentMessages()
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Send className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-600">To:</span>
                          <span className="font-medium text-gray-900">{message.toName}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.toRole}
                          </Badge>
                          {getTypeIcon(message.type)}
                          <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>{message.priority}</Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                        <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function NotificationBell({ currentUser }: NotificationSystemProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const updateUnreadCount = () => {
      const savedMessages = localStorage.getItem("waterTankMessages")
      if (savedMessages) {
        const messages: Message[] = JSON.parse(savedMessages)
        const unread = messages.filter((msg) => msg.to === currentUser.id && !msg.read).length
        setUnreadCount(unread)
      }
    }

    updateUnreadCount()

    // Listen for storage changes
    const handleStorageChange = () => {
      updateUnreadCount()
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check periodically for updates
    const interval = setInterval(updateUnreadCount, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [currentUser.id])

  return (
    <div className="relative">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </div>
  )
}
