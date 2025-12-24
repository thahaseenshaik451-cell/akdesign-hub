import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Luxe Coffee Roasters",
    category: "Brand Identity",
    description: "Complete brand identity for an artisan coffee company",
    color: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: 2,
    title: "TechFlow AI",
    category: "Logo Design",
    description: "Modern tech startup logo and visual identity",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Evergreen Gardens",
    category: "Visual Branding",
    description: "Organic landscaping company branding",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Nova Fitness",
    category: "Brand Identity",
    description: "Dynamic fitness brand with bold aesthetics",
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    id: 5,
    title: "Apex Consulting",
    category: "Logo Design",
    description: "Professional consulting firm rebrand",
    color: "from-slate-500/20 to-gray-500/20",
  },
  {
    id: 6,
    title: "Artisan Bakery Co.",
    category: "Packaging Design",
    description: "Rustic bakery brand and packaging system",
    color: "from-yellow-500/20 to-amber-500/20",
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
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                
                {/* Animated pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Logo/Visual placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={hoveredId === project.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-24 h-24 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-xl"
                  >
                    <span className="font-display font-bold text-2xl gradient-text">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </span>
                  </motion.div>
                </div>

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
