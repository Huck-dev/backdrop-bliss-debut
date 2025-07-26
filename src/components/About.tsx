
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, MapPin, Heart, Star } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, number: "2024", label: "Est. Founded" },
    { icon: Heart, number: "100%", label: "Passion Driven" },
    { icon: MapPin, number: "10", label: "Provinces Served" },
    { icon: Star, number: "5★", label: "Google Reviews" }
  ];

  const services = [
    "Enclosed transport for maximum protection",
    "Door-to-door luxury vehicle transport",
    "Coast-to-coast Canadian coverage",
    "White-glove treatment for every vehicle",
    "Specialized handling for exotic cars"
  ];

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About the Owner
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto italic">
            A Canadian business born from passion…
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Story Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Born of a deep love for high-end automotive excellence and a lifelong passion for exotic vehicles, 
                <span className="text-white font-semibold"> Ian Southern</span>, a dedicated entrepreneur and car enthusiast, 
                founded Exotic Hauls in 2024. Recognizing the need for specialized, premium transport services in the 
                Canadian market, they knew their expertise, attention to detail, and genuine passion for luxury vehicles 
                would bring exceptional value to discerning car owners across the country.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                Headquartered in <span className="text-white font-semibold">Drumheller, Alberta</span>, where the stunning 
                badlands meet the prairie sky, at Exotic Hauls, we pride ourselves on being your premier choice for exotic 
                and luxury vehicle transport needs across Canada. Our unique location in the heart of Alberta positions us 
                perfectly to serve clients from coast to coast.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                We offer premium vehicle transport solutions exclusively for exotic car enthusiasts and luxury vehicle 
                owners throughout Canada. From the mountains of British Columbia to the maritime provinces, we ensure 
                your prized vehicles receive the white-glove treatment they deserve.
              </p>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Our Specialized Services</h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-200">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-slate-300 leading-relaxed">
                Our team is committed to delivering an elite, door-to-door luxury vehicle transport experience that sets 
                the standard in the Canadian market. We understand that your vehicle isn't just transportation – it's an 
                investment, a passion, and often a piece of art.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                Contact us today to experience the Exotic Hauls difference and see why we're becoming Canada's trusted 
                choice for luxury vehicle transport.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const contactElement = document.querySelector('#contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Your Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg transition-all duration-300"
                onClick={() => window.open('https://instagram.com/exotic_hauls', '_blank')}
              >
                Follow on Instagram
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg transition-all duration-300"
                onClick={() => window.open('https://www.facebook.com/share/1ApSv88Eqx/', '_blank')}
              >
                Follow on Facebook
              </Button>
            </div>
          </div>
          
          {/* Stats & Location */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-slate-300 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Location Highlight */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 text-center">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Based in Drumheller, AB</h3>
              <p className="text-slate-300 mb-4">
                Where the stunning badlands meet the prairie sky
              </p>
              <p className="text-slate-200 text-sm">
                Strategically positioned to serve all of Canada from coast to coast
              </p>
            </div>
            
            {/* Coverage Area */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Coast-to-Coast Coverage</h3>
              <p className="text-slate-300 text-center text-sm leading-relaxed">
                From BC to Newfoundland and everywhere in between. Our comprehensive service network 
                ensures reliable, secure transport across all Canadian provinces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
