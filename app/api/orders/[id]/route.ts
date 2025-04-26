import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Mock data - in a real app, this would query your database
  const order = {
    id,
    customer: {
      id: "CUST-001",
      name: "Ali Hassan",
      email: "ali@example.com",
      phone: "+92 300 1234567",
    },
    items: [
      { name: "Signature Latte", quantity: 1, price: 450 },
      { name: "Avocado Toast", quantity: 1, price: 650 },
    ],
    total: 1100,
    status: "making",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deliveryAddress: "123 Main Street, F-7, Islamabad",
    paymentMethod: "COD",
    rider: {
      id: "RIDER-001",
      name: "Ahmed Khan",
    },
  }

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json({ order })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // In a real app, this would update your database
    const updatedOrder = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
