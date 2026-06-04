import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17008834849/conversion',
      });
    }
    
    // Basic SEO for a hidden page
    document.title = "Thank You | Urban Blinds";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}/thank-you`;
    document.head.appendChild(canonical);

    const timer = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 8000);

    return () => {
      document.head.removeChild(robots);
      document.head.removeChild(canonical);
      window.clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-xl mx-auto bg-white border border-border rounded-xl shadow-sm p-10 text-center">
            <h1 className="heading-md mb-3">Thank you! We received your request.</h1>
            <p className="text-muted-foreground mb-8">
              Our team will contact you shortly. If you need urgent assistance, call us using the numbers on our homepage.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button asChild size="lg">
                <Link to="/">Back to Home</Link>
              </Button>
              <p className="text-xs text-muted-foreground">You’ll be redirected to the homepage in 8 seconds.</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild variant="outline">
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/consultation">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
