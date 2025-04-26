import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Clock, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import RiderAssignedOrders from "@/components/rider/rider-assigned-orders";
import RiderDeliveryMap from "@/components/rider/rider-delivery-map";

export default function RiderDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rider Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, Ahmed! Here's your delivery overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          >
            Go Online
          </Button>
          <Link href="/rider/map">
            <Button className="bg-amber-800 hover:bg-amber-900">
              View Delivery Map
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-amber-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Currently assigned to you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Deliveries
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Completed today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Distance
            </CardTitle>
            <MapPin className="h-4 w-4 text-amber-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 km</div>
            <p className="text-xs text-gray-500">Traveled today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-gray-500">Based on 120 deliveries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Assigned Orders</CardTitle>
            <CardDescription>Orders currently assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <RiderAssignedOrders />
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Delivery Map</CardTitle>
            <CardDescription>Your current delivery locations</CardDescription>
          </CardHeader>
          <CardContent>
            <RiderDeliveryMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
