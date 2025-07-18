
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Star, Truck } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Enclosed Transport",
      description: "Premium enclosed trailers protect your vehicle from weather and road debris during transport.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Star,
      title: "Exotic & Luxury Cars",
      description: "Specialized handling for supercars, classics, and high-value vehicles with expert care.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Expedited Delivery",
      description: "Time-sensitive transport solutions with guaranteed pickup and delivery windows.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Truck,
      title: "Door-to-Door Service",
      description: "Convenient pickup and delivery directly to your specified locations nationwide.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-32 px-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-transparent to-slate-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive auto transport solutions tailored to meet the unique needs of luxury and exotic vehicle owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-700/50 shadow-lg bg-slate-800/60 backdrop-blur-lg hover:bg-slate-700/60 hover:border-slate-600/50"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-slate-100 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center leading-relaxed group-hover:text-slate-200 transition-colors">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
