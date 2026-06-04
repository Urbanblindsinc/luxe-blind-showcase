
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Clock, Sparkles, ArrowRight } from "lucide-react";

const ExclusiveOffer = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-xl">
            <div className="w-12 h-[1px] bg-primary mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
              Exclusive Summer Offer
            </h2>
            <p className="text-lg text-muted-foreground">
              Elevate your home with premium window treatments and enjoy limited-time savings on our most popular collections.
            </p>
          </div>
          <Link
            to="/quote-calculator"
            className="mt-6 md:mt-0 group inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="font-medium">Request a Quote</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-secondary p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display mb-4">
              20% Off Premium Collections
            </h3>
            <p className="text-muted-foreground mb-6">
              For a limited time, enjoy significant savings on our premium roller, zebra, and honeycomb collections.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-secondary p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display mb-4">
              Free In-Home Consultation
            </h3>
            <p className="text-muted-foreground mb-6">
              Schedule a complimentary design consultation with our window treatment specialists at your convenience.
            </p>
            <Link 
              to="/consultation" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-secondary p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display mb-4">
              Complimentary Installation
            </h3>
            <p className="text-muted-foreground mb-6">
              Enjoy professional installation at no extra cost when you purchase any of our premium window treatments.
            </p>
            <Link 
              to="/quote-calculator" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Get Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffer;
