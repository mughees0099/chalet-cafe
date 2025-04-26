"use client"

import { io } from "socket.io-client"

// In a real app, this would connect to your actual Socket.io server
export const socket = io("https://api.chaletcafe.pk", {
  autoConnect: false,
})

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

export const subscribeToOrders = (callback: (order: any) => void) => {
  socket.on("new-order", callback)
  return () => {
    socket.off("new-order", callback)
  }
}

export const subscribeToOrderUpdates = (orderId: string, callback: (update: any) => void) => {
  socket.on(`order-update-${orderId}`, callback)
  return () => {
    socket.off(`order-update-${orderId}`, callback)
  }
}

export const updateOrderStatus = (orderId: string, status: string) => {
  socket.emit("update-order-status", { orderId, status })
}

export const sendChatMessage = (orderId: string, message: string, sender: string) => {
  socket.emit("chat-message", { orderId, message, sender })
}

export const subscribeToChatMessages = (orderId: string, callback: (message: any) => void) => {
  socket.on(`chat-message-${orderId}`, callback)
  return () => {
    socket.off(`chat-message-${orderId}`, callback)
  }
}
