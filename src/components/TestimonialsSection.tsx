import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const { items: testimonials, loading } = useTestimonials({ featuredOnly: true });

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Auto-advance
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextTestimonial, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
            What Clients Say
            <br />
            <span className="gradient-text">About Working With Me</span>
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main testimonial card */}
              <div className="relative p-8 md:p-12 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-3xl">
                    "{testimonials[activeIndex]?.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center">
                      <span className="font-display font-bold text-lg text-primary-foreground">
                        {testimonials[activeIndex]?.client_name.split(' ').map(n => n[0]).join('') || 'C'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">
                        {testimonials[activeIndex]?.client_name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[activeIndex]?.client_role && testimonials[activeIndex]?.client_company
                          ? `${testimonials[activeIndex].client_role}, ${testimonials[activeIndex].client_company}`
                          : testimonials[activeIndex]?.client_role || testimonials[activeIndex]?.client_company || ''}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Gradient border glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-gold opacity-10 -z-10" />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                  disabled={testimonials.length <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? "w-8 bg-primary" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="glass"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                  disabled={testimonials.length <= 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Client logos placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
