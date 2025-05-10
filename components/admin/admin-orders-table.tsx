"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Bell } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

// Sample order data
const recentOrders = [
  {
    id: "ORD-1235",
    customer: "Sarah Ahmed",
    date: "Just now",
    status: "pending",
    items: ["1x Signature Latte", "1x Club Sandwich"],
    total: 1200,
    isNew: true,
  },
  {
    id: "ORD-1234",
    customer: "Ali Hassan",
    date: "15 minutes ago",
    status: "making",
    items: ["1x Signature Latte", "1x Avocado Toast"],
    total: 1100,
    isNew: false,
  },
  {
    id: "ORD-1233",
    customer: "Fatima Khan",
    date: "1 hour ago",
    status: "out_for_delivery",
    items: ["1x Club Sandwich", "1x Iced Americano"],
    total: 1100,
    isNew: false,
  },
  {
    id: "ORD-1232",
    customer: "Usman Ali",
    date: "2 hours ago",
    status: "delivered",
    items: ["2x Cappuccino", "1x Chocolate Fondant"],
    total: 1350,
    isNew: false,
  },
];

export default function AdminOrdersTable() {
  const [orders, setOrders] = useState(recentOrders);
  const { toast } = useToast();

  // Simulate receiving a new order via WebSocket
  useEffect(() => {
    const timer = setTimeout(() => {
      const newOrder = {
        id: "ORD-1236",
        customer: "Ayesha Malik",
        date: "Just now",
        status: "pending",
        items: ["2x Chai Tea Latte", "1x Pancake Stack"],
        total: 1310,
        isNew: true,
      };

      setOrders((prev) => [newOrder, ...prev.slice(0, 3)]);

      // Show notification
      toast({
        title: "New Order Received!",
        description: `Order #${newOrder.id} from ${newOrder.customer}`,
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, [toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500"
          >
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Approved
          </Badge>
        );
      case "making":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Making
          </Badge>
        );
      case "ready":
        return (
          <Badge
            variant="outline"
            className="text-purple-500 border-purple-500"
          >
            Ready
          </Badge>
        );
      case "out_for_delivery":
        return (
          <Badge
            variant="outline"
            className="text-indigo-500 border-indigo-500"
          >
            Out for Delivery
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Delivered
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className={order.isNew ? "bg-amber-50" : ""}
            >
              <TableCell className="font-medium flex items-center">
                {order.isNew && (
                  <Bell className="h-4 w-4 text-amber-800 mr-1 animate-pulse" />
                )}
                {order.id}
              </TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>Rs. {order.total}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/orders/${order.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
