
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setFaqs(data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Fallback to default FAQs if database fails
        setFaqs([
          {
            id: "1",
            question: "What services does Exotic Hauls provide?",
            answer: "Transport for exotic high end vehicles in a fully enclosed trailer.",
            display_order: 1
          },
          {
            id: "2",
            question: "What information is required to obtain a quote to ship my vehicle?",
            answer: "Pickup location and final destination, Vehicle make and model, Vehicle length, width, height",
            display_order: 2
          },
          {
            id: "3",
            question: "What regions and countries does Exotic Hauls serve?",
            answer: "We cover Canada, coast to coast.",
            display_order: 3
          },
          {
            id: "4",
            question: "Does Exotic Hauls offer insurance for vehicles being transported?",
            answer: "We are fully insured for $200000 Cargo. Insurance can be increased for more expensive vehicles on request.",
            display_order: 4
          }
        ]);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about our premium vehicle transport services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-slate-200 rounded-lg shadow-sm px-6"
            >
              <AccordionTrigger className="text-slate-900 hover:text-primary text-left py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-6">
                {faq.answer.includes(',') ? (
                  <ul className="space-y-2">
                    {faq.answer.split(',').map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
