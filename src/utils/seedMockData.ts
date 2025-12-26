import { supabase } from '@/integrations/supabase/client';

// Mock portfolio data
// Note: Image URLs should be uploaded to Supabase Storage or use public URLs
// For now, using placeholder images - you can update these via the admin panel
const mockPortfolio = [
  {
    title: "Luxe Coffee Roasters",
    description: "Complete brand identity for an artisan coffee company",
    image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    category: "branding",
    is_featured: true,
    display_order: 1,
  },
  {
    title: "TechFlow AI",
    description: "Modern tech startup logo and visual identity",
    image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "web-design",
    is_featured: true,
    display_order: 2,
  },
  {
    title: "Evergreen Gardens",
    description: "Organic landscaping company branding",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    category: "branding",
    is_featured: true,
    display_order: 3,
  },
  {
    title: "Nova Fitness",
    description: "Dynamic fitness brand with bold aesthetics",
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    category: "branding",
    is_featured: true,
    display_order: 4,
  },
  {
    title: "Apex Consulting",
    description: "Professional consulting firm rebrand",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "web-design",
    is_featured: false,
    display_order: 5,
  },
  {
    title: "Artisan Bakery Co.",
    description: "Rustic bakery brand and packaging system",
    image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop",
    category: "packaging",
    is_featured: true,
    display_order: 6,
  },
];

// Mock testimonials data
const mockTestimonials = [
  {
    client_name: "Sarah Mitchell",
    client_role: "CEO",
    client_company: "TechFlow AI",
    content: "Working with Creative Studio transformed our brand completely. The logo captures our innovative spirit perfectly, and the comprehensive brand identity has elevated how clients perceive us. Highly recommend!",
    rating: 5,
    is_featured: true,
    display_order: 1,
  },
  {
    client_name: "Michael Chen",
    client_role: "Founder",
    client_company: "Luxe Coffee",
    content: "Exceptional attention to detail and a deep understanding of what makes a brand memorable. Our new identity has received countless compliments and helped us stand out in a competitive market.",
    rating: 5,
    is_featured: true,
    display_order: 2,
  },
  {
    client_name: "Emma Rodriguez",
    client_role: "Marketing Director",
    client_company: "Nova Fitness",
    content: "The creative process was seamless and collaborative. They truly listened to our vision and delivered beyond expectations. Our rebrand has significantly boosted engagement and brand recognition.",
    rating: 5,
    is_featured: true,
    display_order: 3,
  },
  {
    client_name: "David Thompson",
    client_role: "Owner",
    client_company: "Artisan Bakery Co.",
    content: "From concept to final delivery, the experience was outstanding. The packaging design has become a talking point with customers and perfectly represents our artisan values.",
    rating: 5,
    is_featured: true,
    display_order: 4,
  },
];

// Mock services data
const mockServices = [
  {
    title: "Logo Design",
    description: "Distinctive, memorable logos that capture your brand essence and leave a lasting impression on your audience.",
    icon: "PenTool",
    features: ["Custom Concepts", "Multiple Revisions", "Vector Files"],
    is_active: true,
    display_order: 1,
  },
  {
    title: "Brand Identity",
    description: "Complete visual identity systems including colors, typography, patterns, and comprehensive brand guidelines.",
    icon: "Layers",
    features: ["Brand Strategy", "Visual Systems", "Brand Book"],
    is_active: true,
    display_order: 2,
  },
  {
    title: "Graphic Design",
    description: "Eye-catching marketing materials, packaging, and print designs that amplify your brand message.",
    icon: "Palette",
    features: ["Print Design", "Packaging", "Marketing Materials"],
    is_active: true,
    display_order: 3,
  },
  {
    title: "Social Media",
    description: "Scroll-stopping social media graphics and templates designed for maximum engagement and brand consistency.",
    icon: "Share2",
    features: ["Post Templates", "Story Designs", "Content Kits"],
    is_active: true,
    display_order: 4,
  },
  {
    title: "Visual Branding",
    description: "Strategic visual communication that builds recognition and connects emotionally with your target audience.",
    icon: "Eye",
    features: ["Visual Strategy", "Brand Assets", "Style Guides"],
    is_active: true,
    display_order: 5,
  },
  {
    title: "Brand Refresh",
    description: "Revitalize existing brands with modern updates while preserving brand equity and recognition.",
    icon: "Sparkles",
    features: ["Brand Audit", "Modernization", "Rollout Support"],
    is_active: true,
    display_order: 6,
  },
];

export const seedMockData = async () => {
  try {
    // Check if data already exists
    const { count: portfolioCount } = await supabase
      .from('portfolio')
      .select('*', { count: 'exact', head: true });

    const { count: testimonialsCount } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true });

    const { count: servicesCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    const results = {
      portfolio: { inserted: 0, skipped: portfolioCount || 0 },
      testimonials: { inserted: 0, skipped: testimonialsCount || 0 },
      services: { inserted: 0, skipped: servicesCount || 0 },
    };

    // Insert portfolio items if table is empty
    if ((portfolioCount || 0) === 0) {
      const { data, error } = await supabase
        .from('portfolio')
        .insert(mockPortfolio)
        .select();
      
      if (error) {
        console.error('Error seeding portfolio:', error);
      } else {
        results.portfolio.inserted = data?.length || 0;
      }
    }

    // Insert testimonials if table is empty
    if ((testimonialsCount || 0) === 0) {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(mockTestimonials)
        .select();
      
      if (error) {
        console.error('Error seeding testimonials:', error);
      } else {
        results.testimonials.inserted = data?.length || 0;
      }
    }

    // Insert services if table is empty
    if ((servicesCount || 0) === 0) {
      const { data, error } = await supabase
        .from('services')
        .insert(mockServices)
        .select();
      
      if (error) {
        console.error('Error seeding services:', error);
      } else {
        results.services.inserted = data?.length || 0;
      }
    }

    return results;
  } catch (error) {
    console.error('Error seeding mock data:', error);
    throw error;
  }
};

