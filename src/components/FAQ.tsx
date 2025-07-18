
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Exotic Hauls provide?",
      answer: "Transport for exotic high end vehicles in a fully enclosed trailer."
    },
    {
      question: "What information is required to obtain a quote to ship my vehicle?",
      answer: "Pickup location and final destination, Vehicle make and model, Vehicle length, width, height"
    },
    {
      question: "What regions and countries does Exotic Hauls serve?",
      answer: "We cover Canada, coast to coast."
    },
    {
      question: "Does Exotic Hauls offer insurance for vehicles being transported?",
      answer: "We are fully insured for $200,000 Cargo. Insurance can be increased for more expensive vehicles on request."
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get answers to common questions about our premium vehicle transport services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-slate-700/50 backdrop-blur-sm rounded-lg border-slate-600 px-6"
            >
              <AccordionTrigger className="text-white hover:text-slate-200 text-left py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 pb-6">
                {faq.answer.includes(',') ? (
                  <ul className="space-y-2">
                    {faq.answer.split(',').map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
