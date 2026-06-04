import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useRegion } from "@/hooks/use-region";
import { sendEmail } from "@/utils/sendEmail";
import { toast } from "sonner";

const ContactUsSection: React.FC = () => {
  const { phones } = useRegion();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      product: formData.get('product') as string,
    };

    try {
      await sendEmail({
        subject: `Contact Form — ${data.name}`,
        from_name: data.name,
        email: data.email,
        phone: data.phone || "—",
        product: data.product || "—",
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center font-display">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>
                  {phones.all.map((phone, index) => (
                    <span key={phone}>
                      {index > 0 && ' | '}
                      <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                        {phone}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:urban.blinds.inc@gmail.com" className="hover:text-primary transition-colors">
                  urban.blinds.inc@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Serving Seattle, Bothell, Bellevue, Redmond, Kirkland, Everett, and surrounding areas</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Mon-Fri: 9AM-6PM | Sat: 10AM-4PM</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="product" className="block text-sm font-medium mb-2">Product Interest</label>
                <select 
                  id="product" 
                  name="product"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a product</option>
                  <option value="zebra-blinds">Zebra Blinds</option>
                  <option value="roller-shades">Roller Shades</option>
                  <option value="honeycomb-shades">Honeycomb Shades</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;