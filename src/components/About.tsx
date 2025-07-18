
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, MapPin } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, number: "10+", label: "Years Experience" },
    { icon: Users, number: "5000+", label: "Happy Clients" },
    { icon: CheckCircle, number: "99.9%", label: "Safe Deliveries" },
    { icon: MapPin, number: "50", label: "States Covered" }
  ];

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Exotic Hauls?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                With over a decade of experience in specialized auto transport, we understand that your 
                vehicle isn't just transportation—it's an investment, a passion, and often a piece of art.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our team of certified professionals uses state-of-the-art equipment and proven methods 
                to ensure your vehicle arrives in pristine condition, exactly as it was when it left your hands.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "Fully licensed and insured transport services",
                "Real-time tracking and updates throughout transport",
                "Comprehensive pre and post-transport inspections",
                "24/7 customer support and communication"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More About Us
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-slate-900" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
