import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample blog posts - in production, this would come from a database
const blogPosts = [
  {
    id: 1,
    title: "The Art of Logo Design: Creating Memorable Brand Identities",
    excerpt: "Explore the fundamental principles of logo design and how to create visual identities that resonate with audiences and stand the test of time.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Color Psychology in Branding: Choosing the Right Palette",
    excerpt: "Understanding how colors influence perception and emotion can help you make strategic design decisions that align with your brand's message.",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Typography Trends 2024: What's Shaping Modern Design",
    excerpt: "Discover the latest typography trends and how modern designers are pushing boundaries with innovative font choices and layouts.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Typography",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Building a Cohesive Brand Identity: A Complete Guide",
    excerpt: "Learn how to develop a comprehensive brand identity system that creates consistency across all touchpoints and strengthens brand recognition.",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1567449303078-0a5e85832a37?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "The Power of Minimalism in Graphic Design",
    excerpt: "Why less is often more in design. Explore how minimalist principles can create powerful, impactful visual communications.",
    date: "2023-12-20",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "From Concept to Creation: My Design Process",
    excerpt: "A behind-the-scenes look at how I approach design projects, from initial client meetings to final delivery and everything in between.",
    date: "2023-12-15",
    readTime: "12 min read",
    category: "Process",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
  },
];

const categories = ["All", "Design", "Branding", "Typography", "Process"];

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
                Design Insights &
                <br />
                <span className="gradient-text">Creative Thoughts</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore articles about design, branding, typography, and the creative process.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-gold text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Blog Posts Grid */}
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="h-full rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="group/btn text-primary hover:text-primary-foreground hover:bg-primary"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Load More / Pagination could go here */}
            {filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-12"
              >
                <Button variant="heroOutline" size="lg">
                  Load More Articles
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Blog;

