import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layers, PenTool, Share2, Eye, Sparkles } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Logo Design",
    description: "Distinctive, memorable logos that capture your brand essence and leave a lasting impression on your audience.",
    features: ["Custom Concepts", "Multiple Revisions", "Vector Files"],
  },
  {
    icon: Layers,
    title: "Brand Identity",
    description: "Complete visual identity systems including colors, typography, patterns, and comprehensive brand guidelines.",
    features: ["Brand Strategy", "Visual Systems", "Brand Book"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching marketing materials, packaging, and print designs that amplify your brand message.",
    features: ["Print Design", "Packaging", "Marketing Materials"],
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Scroll-stopping social media graphics and templates designed for maximum engagement and brand consistency.",
    features: ["Post Templates", "Story Designs", "Content Kits"],
  },
  {
    icon: Eye,
    title: "Visual Branding",
    description: "Strategic visual communication that builds recognition and connects emotionally with your target audience.",
    features: ["Visual Strategy", "Brand Assets", "Style Guides"],
  },
  {
    icon: Sparkles,
    title: "Brand Refresh",
    description: "Revitalize existing brands with modern updates while preserving brand equity and recognition.",
    features: ["Brand Audit", "Modernization", "Rollout Support"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Services</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
            Design Services That
            <br />
            <span className="gradient-text">Transform Brands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From initial concept to final execution, I offer comprehensive design services 
            tailored to elevate your brand and captivate your audience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
