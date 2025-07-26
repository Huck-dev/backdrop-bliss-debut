
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Star, Truck } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Enclosed Transport",
      description: "Premium enclosed trailers protect your vehicle from weather and road debris during transport."
    },
    {
      icon: Star,
      title: "Exotic & Luxury Cars",
      description: "Specialized handling for supercars, classics, and high-value vehicles with expert care."
    },
    {
      icon: Clock,
      title: "Expedited Delivery",
      description: "Time-sensitive transport solutions with guaranteed pickup and delivery windows."
    },
    {
      icon: Truck,
      title: "Door-to-Door Service",
      description: "Convenient pickup and delivery directly to your specified locations nationwide."
    }
  ];

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive auto transport solutions tailored to meet the unique needs of luxury and exotic vehicle owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200 shadow-lg bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center leading-relaxed">
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
