
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dummy product data (in a real app, this would come from an API)
const productsData = [
  {
    id: "aurora-roller-blinds",
    title: "Aurora Roller Blinds",
    category: "Roller Blinds",
    description: "Premium light filtering roller blinds with elegant fabric options that provide the perfect balance of light control and privacy. The Aurora collection features a wide range of colors and textures to complement any interior design.",
    features: [
      "Premium light filtering fabric",
      "Smooth operating mechanism",
      "Child-safe cordless option available",
      "Wide range of designer colors and textures",
      "Custom sizing for perfect fit",
      "Optional motorization available"
    ],
    specs: {
      material: "Premium polyester blend",
      opacity: "Light filtering / Blackout options available",
      mounting: "Inside or outside mount",
      operation: "Chain operation / Cordless / Motorized",
      warranty: "5-year limited warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    colors: ["#F5F5F5", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#ECEFF1", "#CFD8DC", "#B0BEC5"]
  },
  {
    id: "zebra-horizon",
    title: "Zebra Horizon",
    category: "Zebra Blinds",
    description: "Zebra Horizon blinds combine the elegant look of a roller shade with the functional versatility of a horizontal blind. Alternating bands of sheer and solid fabric allow you to control light and visibility with precision.",
    features: [
      "Alternating sheer and solid fabric bands",
      "Precise light and privacy control",
      "Sleek, modern aesthetic",
      "Premium fabric collection",
      "Custom sizing for perfect fit",
      "Optional motorization available"
    ],
    specs: {
      material: "Premium polyester fabric",
      opacity: "Adjustable – from sheer to room darkening",
      mounting: "Inside or outside mount",
      operation: "Chain operation / Motorized",
      warranty: "5-year limited warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607688066-890987f19a92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591129841117-3adfd313a592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#FFFFFF", "#F5F5F5", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#F3E5F5", "#E1BEE7"]
  },
  {
    id: "honeycomb-elegance",
    title: "Honeycomb Elegance",
    category: "Honeycomb Blinds",
    description: "Honeycomb Elegance blinds combine sophisticated style with exceptional energy efficiency. The unique cellular structure traps air to provide insulation, helping to reduce energy costs while creating a refined look for your windows.",
    features: [
      "Superior energy efficiency",
      "Sound absorption properties",
      "Crisp, clean pleats",
      "Light filtering and blackout options",
      "Custom sizing for perfect fit",
      "Optional motorization available"
    ],
    specs: {
      material: "Spun lace and non-woven polyester",
      opacity: "Light filtering / Blackout options available",
      mounting: "Inside or outside mount",
      operation: "Cordless / Continuous cord loop / Motorized",
      warranty: "Lifetime limited warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#FFFFFF", "#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28", "#FFC107", "#FFB300", "#FFA000", "#FF8F00"]
  }
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the product based on the slug
    const foundProduct = productsData.find(p => p.id === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
      
      // Set the first color if it's an array
      if (Array.isArray(foundProduct.colors) && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [slug]);
  
  const handleRequestQuote = () => {
    toast({
      title: "Quote Request Initiated",
      description: "You will be redirected to our quote form.",
    });
    
    // In a real app, you could either redirect or pass the product info to the quote form
    setTimeout(() => {
      window.location.href = "/quote";
    }, 1500);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-primary text-white inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white py-4 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link to="/products" className="ml-1 text-sm text-muted-foreground hover:text-foreground md:ml-2">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link to={`/products/${product.category.toLowerCase().replace(' blinds', '')}`} className="ml-1 text-sm text-muted-foreground hover:text-foreground md:ml-2">
                      {product.category}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="ml-1 text-sm font-medium text-foreground md:ml-2">
                      {product.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Product Detail Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white">
                <img 
                  src={selectedImage} 
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative flex-shrink-0 w-20 h-20 overflow-hidden ${
                      selectedImage === image 
                        ? "ring-2 ring-primary" 
                        : "ring-1 ring-border"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="w-16 h-1 bg-primary mb-6"></div>
              <span className="text-sm text-primary font-medium">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-medium mt-1 mb-6">{product.title}</h1>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
              
              {/* Features */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-6">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Color Selection */}
              {Array.isArray(product.colors) && (
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-6">Available Colors</h2>
                  
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-primary"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {!Array.isArray(product.colors) && (
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-6">Colors</h2>
                  <p className="text-muted-foreground">{product.colors}</p>
                </div>
              )}
              
              {/* Specifications */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-6">Specifications</h2>
                
                <div className="bg-white border border-gray-100 p-6">
                  <dl className="space-y-4">
                    {Object.entries(product.specs).map(([key, value]: [string, any], index: number) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <dt className="font-medium capitalize">{key}</dt>
                        <dd className="text-muted-foreground md:col-span-2">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
                <button
                  onClick={handleRequestQuote}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-white transition-colors hover:bg-primary/90 flex items-center justify-center"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <Link
                  to="/consultation"
                  className="w-full md:w-auto px-8 py-4 border border-gray-200 text-foreground hover:border-primary transition-colors flex items-center justify-center"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <h2 className="text-3xl font-display font-medium mb-12">You May Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productsData.filter(p => p.id !== slug).map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] bg-white overflow-hidden mb-4">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{relatedProduct.title}</h3>
                  <p className="text-sm text-primary">{relatedProduct.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
