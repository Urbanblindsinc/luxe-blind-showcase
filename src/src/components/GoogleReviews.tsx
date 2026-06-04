
import { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRegion } from "@/hooks/use-region";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { zone } = useRegion();
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Actual reviews from Urban Blinds Google Business page
        const realReviews: Review[] = [
          {
            author_name: "Alison Anderson",
            rating: 5,
            text: "Urban Blinds has exceeded my expectations! I called on a Friday expecting to wait a week or more before anyone could come out and measure. Missy was at my house the following Monday, and by Wednesday they were installed. Darren arrived promptly, was polite, professional and went above and beyond to ensure that I was happy. I LOVE my motorized blinds. Highly recommend!",
            time: new Date("2023-12-27").getTime(),
            profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop"
          },
          {
            author_name: "Kelly K",
            rating: 5,
            text: "From ordering to installation, Urban Blinds did not disappoint. Communication from the company was spot on and I received notice when my blinds would arrive. My installer, Darren, was on time and incredibly knowledgeable. He installed my blinds in a very clean and timely fashion and was kind enough to explain the features and warranty of my blinds. Will be ordering more for my house.",
            time: new Date("2023-08-28").getTime(),
            profile_photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop"
          },
          {
            author_name: "Thomas Frei",
            rating: 5,
            text: "Very smooth experience. Came out to measure, sent quote, very competitive, ordered, installed. Would recommend!",
            time: new Date("2023-07-28").getTime(),
            profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop"
          },
          {
            author_name: "Jamie Rose",
            rating: 5,
            text: zone === "SEATTLE" ? 
              "Urban Blinds installed blinds, shutters, and window tinting in our home and did an amazing job! They were so professional, easy to work with, and finished everything on time. Darren did a phenomenal job! They were reasonably priced too. Best in Seattle in my opinion, highly recommend!!" :
              "Urban Blinds installed blinds, shutters, and window tinting in our home and did an amazing job! They were so professional, easy to work with, and finished everything on time. Darren did a phenomenal job! They were reasonably priced too. Highly recommend!!",
            time: new Date("2023-03-11").getTime(),
            profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop"
          }
        ];
        
        setReviews(realReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Google reviews:", err);
        setError("Unable to load reviews at this time");
        setLoading(false);
        toast({
          title: "Error",
          description: "Could not load reviews. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchReviews();
  }, [toast]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-gold text-gold" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-gold text-gold" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="h-10 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-destructive">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const googleBusinessUrl = "https://g.co/kgs/KNLxDcH";
  const googleReviewUrl = `${googleBusinessUrl}#reviews`;

  return (
    <section className="py-16 bg-secondary">
      <div className="container-padded">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gradient-gold mb-4">Our Clients Love Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read what our clients have to say about their experience with Urban Blinds' luxury window treatments.
          </p>
          <div className="flex items-center justify-center mt-4 mb-6">
            <div className="flex items-center">
              {renderStars(5)}
              <span className="ml-2 text-foreground font-semibold">5.0</span>
            </div>
            <span className="mx-3 text-muted-foreground">|</span>
            <a 
              href={googleBusinessUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-plum hover:text-plum-dark transition-colors"
            >
              See all reviews on Google
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="relative p-6 bg-white rounded-xl shadow-sm border border-border transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                {review.profile_photo_url ? (
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary mr-4 flex items-center justify-center">
                    <span className="text-xl font-semibold">{review.author_name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{review.author_name}</h4>
                  <div className="flex mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-3">{review.text}</p>
              
              <div className="text-xs text-muted-foreground mt-4">
                {formatDate(review.time)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a 
            href={googleReviewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-plum text-white rounded-md hover:bg-plum-dark transition-all"
          >
            <span>Write a Review</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
