import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAdsTag = () => {
  const location = useLocation();

  useEffect(() => {
    // Create the first script element
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17008834849';
    
    // Create the second script element
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17008834849');
    `;
    
    // Append scripts to document head
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    // Track page-specific conversions
    const trackPageConversion = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        if (location.pathname === '/consultation') {
          // Consultation page load conversion
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17008834849/mN0pCMv40_0YELiQmqUp',
          });
        }
      }
    };

    // Track conversion on initial load
    trackPageConversion();
    
    // For Chrome's Autofill feature
    if (typeof window !== 'undefined') {
      // Add Google's autofill client hint meta tag
      const metaTag = document.createElement('meta');
      metaTag.name = 'google';
      metaTag.content = 'notranslate';
      document.head.appendChild(metaTag);

      // Add Google Password Manager hint
      const autocompleteMeta = document.createElement('meta');
      autocompleteMeta.name = 'google-signin-client_id';
      autocompleteMeta.content = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID if needed
      document.head.appendChild(autocompleteMeta);
    }
    
    // Cleanup
    return () => {
      document.head.querySelectorAll('meta[name="google"]').forEach(tag => tag.remove());
      document.head.querySelectorAll('meta[name="google-signin-client_id"]').forEach(tag => tag.remove());
    };
  }, [location.pathname]);
  
  return null;
};

export default GoogleAdsTag;
