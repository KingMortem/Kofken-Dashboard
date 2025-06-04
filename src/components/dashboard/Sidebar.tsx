import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  History,
  CreditCard,
  Menu,
  X,
  Croissant,
} from "lucide-react";

const navigation = [
  {
    name: "Orders",
    href: "/dashboard",
    icon: ShoppingCart,
    current: true,
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    current: false,
  },
  {
    name: "Order History",
    href: "/dashboard/history",
    icon: History,
    current: false,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    current: false,
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-wheat-50 to-wheat-100 border-r border-wheat-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-wheat-200">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-golden-500 rounded-lg">
              <Croissant className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-crust-800">Kofken</h1>
              <p className="text-sm text-crust-600">Bakery Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-crust-600 hover:text-crust-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {updatedNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.current
                    ? "bg-golden-500 text-white shadow-md"
                    : "text-crust-700 hover:bg-wheat-200 hover:text-crust-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-wheat-200">
          <div className="bg-wheat-200 rounded-lg p-3">
            <p className="text-xs text-crust-600 font-medium">Daily Stats</p>
            <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-crust-500">Orders:</span>
                <span className="ml-1 font-semibold text-golden-600">47</span>
              </div>
              <div>
                <span className="text-crust-500">Revenue:</span>
                <span className="ml-1 font-semibold text-golden-600">
                  $1,248
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
