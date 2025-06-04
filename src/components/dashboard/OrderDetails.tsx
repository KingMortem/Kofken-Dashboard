import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  MapPin,
  Phone,
  DollarSign,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  orderTime: string;
  estimatedTime: string;
  total: number;
  items: OrderItem[];
  notes?: string;
}

const mockOrders: Order[] = [
  {
    id: "#1234",
    customerName: "Emma Johnson",
    customerPhone: "+1 (555) 123-4567",
    customerAddress: "123 Oak Street, Downtown",
    status: "preparing",
    orderTime: "10:30 AM",
    estimatedTime: "11:15 AM",
    total: 47.5,
    items: [
      {
        id: "1",
        name: "Sourdough Bread",
        quantity: 2,
        price: 8.5,
        category: "Bread",
      },
      {
        id: "2",
        name: "Chocolate Croissant",
        quantity: 4,
        price: 5.25,
        category: "Pastry",
      },
      {
        id: "3",
        name: "Blueberry Muffin",
        quantity: 6,
        price: 3.75,
        category: "Muffin",
      },
    ],
    notes: "Extra crispy bread please",
  },
  {
    id: "#1235",
    customerName: "Michael Chen",
    customerPhone: "+1 (555) 987-6543",
    customerAddress: "456 Pine Avenue, Uptown",
    status: "ready",
    orderTime: "9:45 AM",
    estimatedTime: "10:30 AM",
    total: 23.75,
    items: [
      { id: "4", name: "Baguette", quantity: 2, price: 4.0, category: "Bread" },
      {
        id: "5",
        name: "Almond Danish",
        quantity: 3,
        price: 5.25,
        category: "Pastry",
      },
    ],
  },
  {
    id: "#1236",
    customerName: "Sarah Williams",
    customerPhone: "+1 (555) 456-7890",
    customerAddress: "789 Maple Drive, Suburb",
    status: "pending",
    orderTime: "11:00 AM",
    estimatedTime: "11:45 AM",
    total: 62.25,
    items: [
      {
        id: "6",
        name: 'Wedding Cake (6")',
        quantity: 1,
        price: 45.0,
        category: "Cake",
      },
      {
        id: "7",
        name: "Vanilla Cupcake",
        quantity: 12,
        price: 1.75,
        category: "Cupcake",
      },
    ],
    notes: "Birthday message: Happy 5th Birthday Lucy!",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  preparing: {
    label: "Preparing",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  ready: {
    label: "Ready",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  delivered: {
    label: "Delivered",
    color: "bg-gray-100 text-gray-800",
    icon: Truck,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

export default function OrderDetails() {
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // Here you would typically update the order status via an API call
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-crust-900">Active Orders</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-wheat-200 text-crust-700">
            {mockOrders.length} orders
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {mockOrders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <Card
              key={order.id}
              className="border-wheat-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-crust-900">
                    Order {order.id}
                  </CardTitle>
                  <Badge
                    className={cn("flex items-center space-x-1", status.color)}
                  >
                    <StatusIcon className="h-3 w-3" />
                    <span>{status.label}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Baker Info */}
                <div className="space-y-2">
                  <h5 className="text-lg font-medium text-crust-800">Baker:</h5>
                  <h4 className="text-sm font-semibold text-crust-800">
                    {order.customerName}
                  </h4>
                </div>
                <Separator className="bg-wheat-200" />

                {/* Order Items */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-crust-800">Items:</h5>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-crust-700">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-crust-900">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <>
                    <Separator className="bg-wheat-200" />
                    <div>
                      <h5 className="text-sm font-medium text-crust-800 mb-1">
                        Notes:
                      </h5>
                      <p className="text-sm text-crust-600 italic">
                        {order.notes}
                      </p>
                    </div>
                  </>
                )}

                <Separator className="bg-wheat-200" />

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-crust-600">Order Time:</span>
                    <span className="text-crust-900">{order.orderTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-crust-600">Estimated Ready:</span>
                    <span className="text-crust-900">
                      {order.estimatedTime}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-crust-800">Total:</span>
                    <span className="text-golden-600 flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, "preparing")}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, "ready")}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, "delivered")}
                      className="flex-1 bg-golden-600 hover:bg-golden-700"
                    >
                      Mark Delivered
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-wheat-300 text-crust-700 hover:bg-wheat-50"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
