import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Croissant, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wheat-100 to-golden-200">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-golden-500 rounded-full mb-4">
            <Croissant className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-crust-900 mb-2">
            Golden Crust Bakery
          </h1>
          <p className="text-crust-700 text-lg">
            Your bakery management dashboard awaits
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/dashboard">
            <Button
              size="lg"
              className="w-full bg-golden-600 hover:bg-golden-700 text-white flex items-center justify-center space-x-2"
            >
              <span>Enter Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-3 text-sm text-crust-600">
            <div className="bg-white/60 rounded-lg p-3">
              <div className="font-semibold text-golden-600">47</div>
              <div>Orders Today</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="font-semibold text-golden-600">$1,248</div>
              <div>Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
