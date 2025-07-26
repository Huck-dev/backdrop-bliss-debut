
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <DynamicBackground />
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="services" className="bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm">
        <Services />
      </section>
      <section id="about" className="bg-gradient-to-br from-muted/20 via-background to-card/50">
        <About />
      </section>
      <section id="gallery" className="bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm">
        <Gallery />
      </section>
      <section id="testimonials" className="bg-gradient-to-br from-muted/20 via-background to-card/50">
        <Testimonials />
      </section>
      <section id="faq" className="bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm">
        <FAQ />
      </section>
      <section id="contact" className="bg-gradient-to-br from-muted/20 via-background to-card/50">
        <Contact />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
