import React from 'react';

const PromoBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white py-1 md:py-2 overflow-hidden block">
      <div className="animate-marquee whitespace-nowrap text-xs md:text-sm">
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          🚚 FREE SHIPPING on orders over $1,000
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          🔥 Use code FALLMOTOR30 - Fall Sale ends November 30th!
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          💰 Save up to 30% on selected items
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          📞 Request free quote today with FALLMOTOR30
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          🚚 FREE SHIPPING on orders over $1,000
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          🔥 Use code FALLMOTOR30 - Fall Sale ends November 30th!
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          💰 Save up to 30% on selected items
        </span>
        <span className="mx-4 md:mx-8 text-xs md:text-sm font-medium">
          📞 Request free quote today with FALLMOTOR30
        </span>
      </div>
    </div>
  );
};

export default PromoBanner;