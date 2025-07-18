
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transport Your Vehicle?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get in touch with our team for a personalized quote and experience the Exotic Hauls difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Get Your Quote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                  <Input placeholder="Last Name" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Email Address" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                  <Input placeholder="Phone Number" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Pickup Location" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                  <Input placeholder="Delivery Location" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Vehicle Make & Model" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                  <Input placeholder="Vehicle Year" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                </div>
                <Textarea 
                  placeholder="Additional details about your vehicle or transport requirements..." 
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
                />
                <Button 
                  size="lg" 
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div className="text-slate-300">(403) 820-1167</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div className="text-slate-300">exotichaul@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Follow Us</div>
                    <div className="text-slate-300">@exotic_hauls</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Service Area</div>
                    <div className="text-slate-300">Canada-Wide Coverage</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Hours</div>
                    <div className="text-slate-300">24/7 Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-600 to-red-700 border-red-500">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Emergency Transport?</h3>
                <p className="text-red-100 mb-4">Need immediate assistance or have an urgent transport request?</p>
                <Button 
                  className="bg-white text-red-600 hover:bg-red-50 w-full font-semibold transition-all duration-300"
                >
                  Emergency Hotline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
