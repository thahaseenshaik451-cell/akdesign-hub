import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Target, Zap, Heart } from "lucide-react";
import designerPortrait from "@/assets/designer-portrait.jpg";

const qualities = [
  {
    icon: Target,
    title: "Strategic Thinking",
    description: "Every design decision is backed by research and aligned with your business goals.",
  },
  {
    icon: Zap,
    title: "Creative Excellence",
    description: "Pushing creative boundaries to deliver designs that stand out and make an impact.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description: "Your success is my priority. I collaborate closely to bring your vision to life.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Meticulous attention to detail ensures pixel-perfect, professional results every time.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/2"
      >
        <div className="w-full h-full rounded-full border border-primary/5" />
        <div className="absolute inset-8 rounded-full border border-primary/5" />
        <div className="absolute inset-16 rounded-full border border-primary/10" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Designer portrait image */}
              <img 
                src={designerPortrait} 
                alt="Creative designer portrait" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-8 right-8 w-20 h-20 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
              >
                <span className="font-display font-bold text-2xl gradient-text">8+</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 left-8 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <span className="text-sm font-medium">Years of Experience</span>
              </motion.div>
            </div>

            {/* Gradient border */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-gold opacity-20 blur-xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 text-balance">
              Passionate About Creating
              <br />
              <span className="gradient-text">Memorable Brands</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              With over 8 years of experience in graphic and logo design, I've had the privilege 
              of working with startups, established businesses, and global brands. My approach 
              combines strategic thinking with creative excellence to deliver designs that not 
              only look stunning but also drive real business results.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              I believe every brand has a unique story to tell. My role is to translate that 
              story into a visual language that resonates with your audience and sets you 
              apart from the competition. From initial concept to final delivery, I'm 
              committed to excellence in every pixel.
            </p>

            {/* Qualities Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <quality.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {quality.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {quality.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
