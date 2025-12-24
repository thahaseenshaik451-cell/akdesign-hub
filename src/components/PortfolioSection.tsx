import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import portfolio images
import coffeeBrand from "@/assets/portfolio/coffee-brand.jpg";
import techBrand from "@/assets/portfolio/tech-brand.jpg";
import gardenBrand from "@/assets/portfolio/garden-brand.jpg";
import fitnessBrand from "@/assets/portfolio/fitness-brand.jpg";
import consultingBrand from "@/assets/portfolio/consulting-brand.jpg";
import bakeryBrand from "@/assets/portfolio/bakery-brand.jpg";

const projects = [
  {
    id: 1,
    title: "Luxe Coffee Roasters",
    category: "Brand Identity",
    description: "Complete brand identity for an artisan coffee company",
    image: coffeeBrand,
  },
  {
    id: 2,
    title: "TechFlow AI",
    category: "Logo Design",
    description: "Modern tech startup logo and visual identity",
    image: techBrand,
  },
  {
    id: 3,
    title: "Evergreen Gardens",
    category: "Visual Branding",
    description: "Organic landscaping company branding",
    image: gardenBrand,
  },
  {
    id: 4,
    title: "Nova Fitness",
    category: "Brand Identity",
    description: "Dynamic fitness brand with bold aesthetics",
    image: fitnessBrand,
  },
  {
    id: 5,
    title: "Apex Consulting",
    category: "Logo Design",
    description: "Professional consulting firm rebrand",
    image: consultingBrand,
  },
  {
    id: 6,
    title: "Artisan Bakery Co.",
    category: "Packaging Design",
    description: "Rustic bakery brand and packaging system",
    image: bakeryBrand,
  },
];

const categories = ["All", "Logo Design", "Brand Identity", "Visual Branding", "Packaging Design"];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
            Selected Works &
            <br />
            <span className="gradient-text">Creative Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A curated collection of my best design work, showcasing brand transformations 
            and creative solutions for diverse clients.
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

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                {/* Project Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={hoveredId === project.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <span className="text-primary text-sm font-medium">{project.category}</span>
                    <h3 className="font-display font-bold text-xl text-foreground mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="hero" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Gradient border on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  className="absolute inset-0 rounded-2xl border-2 border-primary/50 pointer-events-none"
                />
              </div>

              {/* Project info below */}
              <div className="mt-4">
                <span className="text-primary text-xs font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mt-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg">
            View All Projects
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
