// API utility functions for making requests to the backend

export async function fetchMenu() {
  // In a real app, this would fetch from your API
  return fetch("/api/menu").then((res) => res.json())
}

export async function placeOrder(orderData: any) {
  return fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  }).then((res) => res.json())
}

export async function fetchOrders(userId: string, role: string) {
  return fetch(`/api/orders?userId=${userId}&role=${role}`).then((res) => res.json())
}

export async function fetchOrderDetails(orderId: string) {
  return fetch(`/api/orders/${orderId}`).then((res) => res.json())
}

export async function updateOrder(orderId: string, updateData: any) {
  return fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  }).then((res) => res.json())
}

export async function fetchUserProfile(userId: string) {
  return fetch(`/api/users/${userId}`).then((res) => res.json())
}

export async function updateUserProfile(userId: string, profileData: any) {
  return fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  }).then((res) => res.json())
}

export async function processPayment(paymentData: any) {
  return fetch("/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  }).then((res) => res.json())
}
