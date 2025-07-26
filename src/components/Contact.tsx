
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import QuoteForm from "./QuoteForm";

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
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get Your Quote</h3>
              <QuoteForm />
            </div>
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
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
