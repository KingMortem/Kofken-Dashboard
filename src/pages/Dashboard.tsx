import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import OrderDetails from "@/components/dashboard/OrderDetails";
import NotificationStatus from "@/components/dashboard/NotificationStatus";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-wheat-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-crust-900 mb-2">
                Welcome back, Sarah!
              </h1>
              <p className="text-crust-600">
                Here's what's happening at Golden Crust Bakery today.
              </p>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Orders section - Takes up 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <OrderDetails />
              </div>

              {/* Notifications and status - Takes up 1 column on xl screens */}
              <div className="xl:col-span-1">
                <NotificationStatus />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
