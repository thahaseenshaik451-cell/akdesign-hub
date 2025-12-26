import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Zap, Users, Award, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality. Get your designs ready when you need them.",
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description: "Work closely with you at every step to ensure your vision comes to life exactly as imagined.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Meticulous attention to detail and professional standards in every design project.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Respect for deadlines with consistent, reliable project completion on schedule.",
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "Innovative designs that push boundaries and create memorable brand experiences.",
  },
  {
    icon: CheckCircle2,
    title: "Satisfaction Guaranteed",
    description: "Multiple revisions included to ensure you're completely happy with the final result.",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 -translate-x-1/2"
      >
        <div className="w-full h-full rounded-full border border-primary/5" />
        <div className="absolute inset-8 rounded-full border border-primary/5" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
            Features That Set Us
            <br />
            <span className="gradient-text">Apart</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience design services that combine creativity, professionalism, and 
            dedication to deliver exceptional results for your brand.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

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

export default FeaturesSection;

