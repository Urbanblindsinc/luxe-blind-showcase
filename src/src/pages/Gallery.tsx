
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import FeaturedProjects from "@/components/gallery/FeaturedProjects";
import GalleryCTA from "@/components/gallery/GalleryCTA";
import type { ProjectImage } from "@/types/gallery";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Design Gallery | Urban Blinds";
  }, []);

  const galleryImages: ProjectImage[] = [
    // CondoRoom group
    {
      id: 1,
      title: "CondoRoom 1",
      description: "Modern condo living room with light filtering roller blinds",
      image: "/lovable-uploads/a2065a4f-0fd5-43c3-8b85-c755eaf5a3d1.png",
      category: "roller",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "CondoRoom"
    },
    {
      id: 2,
      title: "CondoRoom 2",
      description: "Contemporary condo space with zebra blinds for light control",
      image: "/lovable-uploads/757c914b-70f9-408d-ab99-2e1179be0936.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "CondoRoom"
    },
    
    // ModernHome group
    {
      id: 3,
      title: "ModernHome 1",
      description: "Elegant living space with dual-tone zebra blinds",
      image: "/lovable-uploads/d981702c-1528-4d71-8e38-61321974e43b.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "ModernHome"
    },
    {
      id: 4,
      title: "ModernHome 2",
      description: "Contemporary window treatment with warm gray zebra blinds",
      image: "/lovable-uploads/8ebec6b8-d567-49fb-9938-4c87e6451b5d.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "ModernHome"
    },
    
    // UrbanView group
    {
      id: 5,
      title: "UrbanView 1",
      description: "City apartment with adjustable zebra blinds for privacy",
      image: "/lovable-uploads/c6117cf7-113f-4079-8580-cd4da9953462.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanView"
    },
    {
      id: 6,
      title: "UrbanView 2",
      description: "Evening cityscape view through semi-transparent blinds",
      image: "/lovable-uploads/43713cf1-4abd-4679-9463-578ef6434a93.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanView"
    },
    {
      id: 7,
      title: "UrbanView 3",
      description: "Modern lounge with premium zebra blinds installation",
      image: "/lovable-uploads/6bd299f0-5aa5-4b3d-ba84-2d48ce8a6a3d.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanView"
    },
    {
      id: 8,
      title: "UrbanView 4",
      description: "Bedroom setup with light filtering zebra blinds",
      image: "/lovable-uploads/7690a56b-7628-4d35-9cb7-359e41bf6ffe.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanView"
    },
    {
      id: 9,
      title: "UrbanView 5",
      description: "Evening ambient lighting with premium window treatments",
      image: "/lovable-uploads/96d41bcd-5897-4dba-b299-c624dc4cdc2b.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanView"
    },
    
    // LivingRoom group
    {
      id: 10,
      title: "LivingRoom 1",
      description: "Open concept living area with dual-layer zebra blinds",
      image: "/lovable-uploads/79517397-9478-4092-bf60-3e016d46b5fa.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LivingRoom"
    },
    {
      id: 11,
      title: "LivingRoom 2",
      description: "Evening lighting with smart light control blinds",
      image: "/lovable-uploads/b11bafc8-0a13-4577-a961-429cd5ba87e4.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LivingRoom"
    },
    {
      id: 12,
      title: "LivingRoom 3",
      description: "Close-up of premium zebra blind texture and operation",
      image: "/lovable-uploads/3e9554ed-19c4-4b8f-ad45-d1f8701c981f.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LivingRoom"
    },
    {
      id: 13,
      title: "LivingRoom 4",
      description: "Detail view of premium zebra blind installation",
      image: "/lovable-uploads/f0056e9d-e4a1-4cd1-8370-436c0de7333b.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LivingRoom"
    },
    
    // Stairway group
    {
      id: 14,
      title: "Stairway 1",
      description: "Stairway lighting with geometric chandelier and zebra blinds",
      image: "/lovable-uploads/a3a1fce9-b737-44b1-b6ab-8a56b22b5d0d.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Stairway"
    },
    {
      id: 15,
      title: "Stairway 2",
      description: "Side view of living room with natural lighting control",
      image: "/lovable-uploads/de4f0169-9450-4ab6-a4fd-be4bda4cf926.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Stairway"
    },
    {
      id: 16,
      title: "Stairway 3",
      description: "Grand staircase with floor-to-ceiling zebra blinds",
      image: "/lovable-uploads/4acba538-fde1-49de-b498-e221118d4bd2.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Stairway"
    },
    {
      id: 17,
      title: "Stairway 4",
      description: "Crystal chandelier complementing elegant window treatments",
      image: "/lovable-uploads/60e4aff6-ccd6-44aa-95c4-664cce851492.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Stairway"
    },
    {
      id: 18,
      title: "Stairway 5",
      description: "Crystal chandelier with premium zebra blind installation",
      image: "/lovable-uploads/f33f36ea-22c5-43e6-bd3c-7b6b5b0f03e6.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Stairway"
    },
    
    // WindowTreatment group
    {
      id: 19,
      title: "WindowTreatment 1",
      description: "Extended full-width zebra blinds for entertainment room",
      image: "/lovable-uploads/654bfadf-2b73-42e5-a4d8-055b4be276a1.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "WindowTreatment"
    },
    {
      id: 20,
      title: "WindowTreatment 2",
      description: "Triple window zebra blind installation",
      image: "/lovable-uploads/07c6d3b6-9b41-46c2-a6b4-be11409335fc.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "WindowTreatment"
    },
    {
      id: 21,
      title: "WindowTreatment 3",
      description: "Custom arched zebra blinds for architectural windows",
      image: "/lovable-uploads/5281e187-949b-42f7-860e-52de68d25252.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "WindowTreatment"
    },
    {
      id: 22,
      title: "WindowTreatment 4",
      description: "Dual zebra blind system for optimal light control",
      image: "/lovable-uploads/78cd21a6-18a0-4477-8e39-159708c83cb3.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "WindowTreatment"
    },
    
    // Bathroom group
    {
      id: 23,
      title: "Bathroom 1",
      description: "Privacy roller shade for bathroom window",
      image: "/lovable-uploads/1bd2283b-66bf-4dd2-957e-61cb80d5e55e.png",
      category: "roller",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Bathroom"
    },
    {
      id: 24,
      title: "Bathroom 2",
      description: "Elegant bathroom with zebra blind and detailed window trim",
      image: "/lovable-uploads/812a09d5-b895-420c-b17a-d6eeff2cbfe8.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Bathroom"
    },
    
    // NeighborhoodView group
    {
      id: 25,
      title: "NeighborhoodView 1",
      description: "Zebra blinds with filtered neighborhood view",
      image: "/lovable-uploads/f56595fe-846e-4971-ab46-cc3881ba13d1.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "NeighborhoodView"
    },
    {
      id: 26,
      title: "NeighborhoodView 2",
      description: "Urban vista through premium zebra blinds",
      image: "/lovable-uploads/01c34dd2-57b7-4318-9e97-e3379f758b39.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "NeighborhoodView"
    },
    
    // LightManagement group
    {
      id: 27,
      title: "LightManagement 1",
      description: "Semi-open zebra blinds demonstrating light filtration",
      image: "/lovable-uploads/05eebbe1-8a58-43db-9dd2-e27b45dd6780.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LightManagement"
    },
    {
      id: 28,
      title: "LightManagement 2",
      description: "Daytime light filtration through grey zebra blinds",
      image: "/lovable-uploads/9a8633b9-b880-455a-bdc5-7468d27f1644.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LightManagement"
    },
    {
      id: 29,
      title: "LightManagement 3",
      description: "Light filtering through cream-colored zebra blinds",
      image: "/lovable-uploads/df126a06-f1ea-44d8-80f1-61ad85ead00d.png",
      category: "zebra",
      featured: false,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "LightManagement"
    },
    
    // Dining group
    {
      id: 30,
      title: "Dining 1",
      description: "Light taupe roller shades with modern dining set",
      image: "/lovable-uploads/a2065a4f-0fd5-43c3-8b85-c755eaf5a3d1.png",
      category: "roller",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Dining"
    },
    
    // Elegance group
    {
      id: 31,
      title: "Elegance 1",
      description: "Mixed fabric zebra blinds in neutral tones",
      image: "/lovable-uploads/757c914b-70f9-408d-ab99-2e1179be0936.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Elegance"
    },
    
    // FamilyRoom group
    {
      id: 32,
      title: "FamilyRoom 1",
      description: "Dual-tone zebra blinds with fireplace feature",
      image: "/lovable-uploads/d981702c-1528-4d71-8e38-61321974e43b.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "FamilyRoom"
    },
    
    // ModernWindow group
    {
      id: 33,
      title: "ModernWindow 1",
      description: "Light filtering zebra blinds in warm gray",
      image: "/lovable-uploads/8ebec6b8-d567-49fb-9938-4c87e6451b5d.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "ModernWindow"
    },
    
    // CitySkyline group
    {
      id: 34,
      title: "CitySkyline 1",
      description: "Evening cityscape with light control blinds",
      image: "/lovable-uploads/43713cf1-4abd-4679-9463-578ef6434a93.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "CitySkyline"
    },
    
    // Lounge group
    {
      id: 35,
      title: "Lounge 1",
      description: "Modern lounge setup with zebra blinds",
      image: "/lovable-uploads/6bd299f0-5aa5-4b3d-ba84-2d48ce8a6a3d.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "Lounge"
    },
    
    // BedroomComfort group
    {
      id: 36,
      title: "BedroomComfort 1",
      description: "Light filtering zebra blinds for sleeping comfort",
      image: "/lovable-uploads/7690a56b-7628-4d35-9cb7-359e41bf6ffe.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "BedroomComfort"
    },
    
    // UrbanLiving group
    {
      id: 37,
      title: "UrbanLiving 1",
      description: "Evening ambiance with city views",
      image: "/lovable-uploads/96d41bcd-5897-4dba-b299-c624dc4cdc2b.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "UrbanLiving"
    },
    
    // ChicLiving group
    {
      id: 38,
      title: "ChicLiving 1",
      description: "Chic living space with dual-tone zebra blinds",
      image: "/lovable-uploads/79517397-9478-4092-bf60-3e016d46b5fa.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "ChicLiving"
    },
    
    // NightModeLiving group
    {
      id: 39,
      title: "NightModeLiving 1",
      description: "Evening atmosphere with smart light control",
      image: "/lovable-uploads/b11bafc8-0a13-4577-a961-429cd5ba87e4.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "NightModeLiving"
    },
    
    // WindowFeature group
    {
      id: 40,
      title: "WindowFeature 1",
      description: "Close-up of zebra blind texture and mechanism",
      image: "/lovable-uploads/3e9554ed-19c4-4b8f-ad45-d1f8701c981f.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "WindowFeature"
    },
    
    // PremiumInstallation group
    {
      id: 41,
      title: "PremiumInstallation 1",
      description: "Detail view of premium zebra blind fitting",
      image: "/lovable-uploads/f0056e9d-e4a1-4cd1-8370-436c0de7333b.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "PremiumInstallation"
    },
    
    // StairwayLighting group
    {
      id: 42,
      title: "StairwayLighting 1",
      description: "Geometric chandelier with zebra blinds on stairway window",
      image: "/lovable-uploads/a3a1fce9-b737-44b1-b6ab-8a56b22b5d0d.png",
      category: "zebra",
      featured: true,
      locationTag: "Residential",
      rating: 5,
      projectGroup: "StairwayLighting"
    }
  ];

  console.log(`Total images in gallery: ${galleryImages.length}`);

  const projectGroups = galleryImages.reduce((acc, image) => {
    const group = acc[image.projectGroup] || [];
    acc[image.projectGroup] = [...group, image];
    return acc;
  }, {} as Record<string, ProjectImage[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        <GalleryHero />

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <FeaturedProjects projectGroups={projectGroups} />
            <PhotoSpotlight 
              src="/lovable-uploads/b869103e-6569-4a1a-83c5-17b1218ae932.png"
              alt="Dining area with zebra blinds – recent installation"
              caption="From a recent Urban Blinds project"
            />
            <GalleryCTA />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
