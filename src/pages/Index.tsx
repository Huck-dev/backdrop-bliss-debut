
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
      <section id="services" className="bg-white">
        <Services />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="gallery" className="bg-white">
        <Gallery />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq" className="bg-white">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
