
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4">
            <img 
              src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
              alt="Exotic Hauls" 
              className="h-16 w-auto"
            />
            <p className="text-slate-400 max-w-md">
              Premium auto transport services for exotic, luxury, and classic vehicles. 
              Where your passion meets our precision.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">Enclosed Transport</li>
              <li className="hover:text-white cursor-pointer transition-colors">Exotic Car Shipping</li>
              <li className="hover:text-white cursor-pointer transition-colors">Classic Car Transport</li>
              <li className="hover:text-white cursor-pointer transition-colors">Expedited Delivery</li>
              <li className="hover:text-white cursor-pointer transition-colors">Door-to-Door Service</li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Our Team</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Reviews</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-slate-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            © 2024 Exotic Hauls. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
