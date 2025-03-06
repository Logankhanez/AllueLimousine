"use client"

import { useState, useEffect } from "react"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "admin"
  timestamp: Date
}

export interface ChatUser {
  name: string
  email: string
}

export function useChatStorage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [user, setUser] = useState<ChatUser | null>(null)

  // Load messages and user info from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("chat_messages")
    const storedUser = localStorage.getItem("chat_user")

    if (storedMessages) {
      try {
        // Parse stored messages and convert string timestamps back to Date objects
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(parsedMessages)
      } catch (error) {
        console.error("Error parsing stored messages:", error)
        // If there's an error, clear the stored messages
        localStorage.removeItem("chat_messages")
      }
    } else {
      // Set default welcome message if no stored messages
      setMessages([
        {
          id: "welcome",
          text: `Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser vos questions concernant nos services de limousine.`,
          sender: "admin",
          timestamp: new Date(),
        },
      ])
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("chat_user")
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages))
    }
  }, [messages])

  // Save user info to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("chat_user", JSON.stringify(user))
    }
  }, [user])

  const addMessage = (text: string, sender: "user" | "admin") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }

  const setUserInfo = (name: string, email: string) => {
    setUser({ name, email })
  }

  const clearChat = () => {
    localStorage.removeItem("chat_messages")
    setMessages([
      {
        id: "welcome",
        text: `Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser vos questions concernant nos services de limousine.`,
        sender: "admin",
        timestamp: new Date(),
      },
    ])
  }

  return {
    messages,
    user,
    addMessage,
    setUserInfo,
    clearChat,
  }
}

