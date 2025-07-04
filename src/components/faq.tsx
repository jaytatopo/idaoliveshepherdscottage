import type { FAQ, GalleryImage } from '@/lib/content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image';

interface FaqContent {
  heading: string;
  subheading: string;
}

interface FaqProps {
  content: FaqContent;
  faqs: FAQ[];
  imageBg?: GalleryImage;
}

export default function Faq({ content, faqs, imageBg }: FaqProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="relative py-12 md:py-20 bg-card">
       {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="question marks pattern"
        />
      )}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">
                {content.heading}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
                {content.subheading}
            </p>
        </div>
        <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <div key={faq.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <AccordionItem value={`item-${faq.id}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-base text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                </div>
            ))}
            </Accordion>
        </div>
      </div>
    </section>
  );
}
