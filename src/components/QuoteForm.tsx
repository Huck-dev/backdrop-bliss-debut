
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Search, Truck, MapPin, ArrowRight, Mail, Phone, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuoteForm = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    console.log('=== QUOTE FORM SUBMIT START ===');
    // Validate required fields
    if (!pickupAddress || !deliveryAddress || !customerName || !customerEmail) {
      console.log('Validation failed - missing required fields');
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Sending quote request to edge function...');

    try {
      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: {
          customerName,
          customerEmail,
          customerPhone,
          pickupAddress,
          deliveryAddress,
          preferredDate: selectedDate ? format(selectedDate, "PPP") : null,
          vehicleType,
          additionalComments,
        }
      });

      console.log('Edge function response:', { data, error });

      if (error) throw error;

      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you with a quote within 24 hours",
      });

      // Reset form
      setPickupAddress("");
      setDeliveryAddress("");
      setSelectedDate(undefined);
      setVehicleType("");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setAdditionalComments("");
      console.log("Form reset successfully");

    } catch (error) {
      console.error('Error sending quote request:', error);
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-700/50 backdrop-blur-md rounded-lg p-6 border border-slate-600">
      {/* Contact Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Customer Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>Name *</span>
          </div>
          <Input
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            required
          />
        </div>

        {/* Customer Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Mail className="w-4 h-4" />
            <span>Email *</span>
          </div>
          <Input
            type="email"
            placeholder="your@email.com"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            required
          />
        </div>

        {/* Customer Phone */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Phone className="w-4 h-4" />
            <span>Phone</span>
          </div>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
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
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Truck className="w-4 h-4" />
            <span>Vehicle Details (Year, Make, Model)</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 2023 Tesla Model S"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 flex-1"
            />
          </div>
        </div>
      </div>
      
      {/* Additional Comments Section */}
      <div className="mt-6">
        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Additional Comments</span>
        </div>
        <Textarea
          placeholder="Any special requirements, vehicle details, or additional information..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 min-h-[100px]"
        />
      </div>
      
      {/* Get Quote Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              <span>Get Quote</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuoteForm;
