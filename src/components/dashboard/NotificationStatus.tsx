import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Package,
  Clock,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  description: string;
  timestamp: string;
  action?: {
    label: string;
    href?: string;
  };
}

interface StatusMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Low Inventory Alert",
    description: "Sourdough bread is running low (5 loaves remaining)",
    timestamp: "5 min ago",
    action: { label: "View Inventory", href: "/dashboard/inventory" },
  },
  {
    id: "2",
    type: "success",
    title: "Daily Target Reached",
    description:
      "Congratulations! You've reached your daily sales target of $1,200",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    type: "info",
    title: "New Order Received",
    description: "Large catering order for tomorrow morning (Order #1240)",
    timestamp: "30 min ago",
    action: { label: "View Order", href: "/dashboard" },
  },
];

const statusMetrics: StatusMetric[] = [
  {
    label: "Today's Revenue",
    value: "$1,248",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Orders Completed",
    value: "47",
    change: "+8%",
    trend: "up",
    icon: CheckCircle,
  },
  {
    label: "Avg. Order Time",
    value: "23 min",
    change: "-5%",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Items in Stock",
    value: "156",
    change: "-12%",
    trend: "down",
    icon: Package,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return CheckCircle;
    case "warning":
      return AlertTriangle;
    case "error":
      return AlertTriangle;
    default:
      return Info;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "success":
      return "border-green-200 bg-green-50";
    case "warning":
      return "border-yellow-200 bg-yellow-50";
    case "error":
      return "border-red-200 bg-red-50";
    default:
      return "border-blue-200 bg-blue-50";
  }
};

export default function NotificationStatus() {
  return (
    <div className="space-y-6">
      {/* Status Metrics */}
      <Card className="border-wheat-200">
        <CardHeader>
          <CardTitle className="text-lg text-crust-900 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-golden-600" />
            <span>Today's Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statusMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="text-center p-3 bg-wheat-50 rounded-lg border border-wheat-200"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-golden-100 rounded-full">
                      <Icon className="h-4 w-4 text-golden-600" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-crust-900">
                    {metric.value}
                  </p>
                  <p className="text-xs text-crust-600 mb-1">{metric.label}</p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      metric.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : metric.trend === "down"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700",
                    )}
                  >
                    {metric.change}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-wheat-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-crust-900">
              Recent Notifications
            </CardTitle>
            <Badge variant="secondary" className="bg-wheat-200 text-crust-700">
              {notifications.length} new
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <Alert
                key={notification.id}
                className={cn(
                  "border-l-4",
                  getNotificationColor(notification.type),
                )}
              >
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <AlertTitle className="text-sm font-medium text-crust-900">
                    {notification.title}
                  </AlertTitle>
                  <AlertDescription className="text-xs text-crust-700 mt-1">
                    {notification.description}
                  </AlertDescription>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-crust-500">
                      {notification.timestamp}
                    </span>
                    {notification.action && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs text-golden-600 hover:text-golden-700"
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </Alert>
            );
          })}

          <div className="text-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="border-wheat-300 text-crust-700 hover:bg-wheat-50"
            >
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-wheat-200">
        <CardHeader>
          <CardTitle className="text-lg text-crust-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex-1 border-golden-300 text-golden-700 hover:bg-golden-50"
            >
              Add New Order
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-golden-300 text-golden-700 hover:bg-golden-50"
            >
              Update Inventory
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-golden-300 text-golden-700 hover:bg-golden-50"
            >
              View Reports
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-golden-300 text-golden-700 hover:bg-golden-50"
            >
              Customer List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
