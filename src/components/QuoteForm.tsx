
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, Truck, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const QuoteForm = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState("");

  const handleSubmit = () => {
    // Scroll to contact section when form is submitted
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-4xl mx-auto border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Pickup Address */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Enter Pickup Address</span>
          </div>
          <Input
            placeholder="Type Here"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
          />
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <ArrowRight className="w-4 h-4" />
            <span>Enter Delivery Address</span>
          </div>
          <Input
            placeholder="Type Here"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
          />
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span>When</span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/20 border-white/30 text-white hover:bg-white/30",
                  !selectedDate && "text-white/60"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Vehicle Details & Search Button */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Truck className="w-4 h-4" />
            <span>Details</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Select Vehicle"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 flex-1"
            />
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 h-10 w-12 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
