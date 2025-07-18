
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, MapPin } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, number: "10+", label: "Years Experience", gradient: "from-yellow-500 to-orange-500" },
    { icon: Users, number: "5000+", label: "Happy Clients", gradient: "from-blue-500 to-purple-500" },
    { icon: CheckCircle, number: "99.9%", label: "Safe Deliveries", gradient: "from-emerald-500 to-green-500" },
    { icon: MapPin, number: "50", label: "States Covered", gradient: "from-red-500 to-pink-500" }
  ];

  const features = [
    "Fully licensed and insured transport services",
    "Real-time tracking and updates throughout transport",
    "Comprehensive pre and post-transport inspections",
    "24/7 customer support and communication"
  ];

  return (
    <section className="py-32 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Why Choose Exotic Hauls?
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                With over a decade of experience in specialized auto transport, we understand that your 
                vehicle isn't just transportation—it's an investment, a passion, and often a piece of art.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our team of certified professionals uses state-of-the-art equipment and proven methods 
                to ensure your vehicle arrives in pristine condition, exactly as it was when it left your hands.
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-200 text-lg leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/25 border-0"
            >
              Learn More About Us
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-700/50 hover:border-slate-600/50"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors">{stat.number}</div>
                <div className="text-slate-300 font-medium text-lg group-hover:text-slate-200 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
