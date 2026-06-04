
import React from "react";
import { useFormContext } from "react-hook-form";
import { Tag, Check, X } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { contactFields } from "@/utils/quoteConstants";

interface ContactFormProps {
  promoCode: string;
  isValidPromo: boolean | null;
  onPromoCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactForm = ({ promoCode, isValidPromo, onPromoCodeChange }: ContactFormProps) => {
  const form = useFormContext();

  // Mapping for autocomplete attributes
  const getAutocompleteValue = (fieldName: string) => {
    switch (fieldName) {
      case 'name': return 'name';
      case 'email': return 'email';
      case 'phone': return 'tel';
      case 'address': return 'street-address';
      default: return undefined;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contactFields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={`contact.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <field.icon className="h-4 w-4" /> {field.label}
                {field.optional && " (Optional)"}
              </FormLabel>
              <FormControl>
                <Input 
                  type={field.type || "text"} 
                  placeholder={field.placeholder} 
                  autoComplete={getAutocompleteValue(field.name)}
                  {...formField} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="contact.promoCode"
          render={() => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" /> Promotional Code (Optional)
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    placeholder="Enter promo code" 
                    value={promoCode}
                    onChange={onPromoCodeChange}
                    className={`pr-10 ${
                      isValidPromo === true ? 'border-green-500 focus-visible:ring-green-500' : 
                      isValidPromo === false ? 'border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                  />
                </FormControl>
                {isValidPromo !== null && (
                  <div className="absolute right-3 top-3">
                    {isValidPromo ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {isValidPromo === true && (
                <FormDescription className="text-green-600 font-medium">
                  Valid code: 40% OFF all Motorized Blinds!
                </FormDescription>
              )}
              {isValidPromo === false && (
                <FormDescription className="text-red-500">
                  Invalid promo code
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contact.preferredContact"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" />
                    <Label htmlFor="contact-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="contact-phone" />
                    <Label htmlFor="contact-phone">Phone</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContactForm;
