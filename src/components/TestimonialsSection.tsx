import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CEO, TechFlow AI",
    content: "Working with Creative Studio transformed our brand completely. The logo captures our innovative spirit perfectly, and the comprehensive brand identity has elevated how clients perceive us. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Luxe Coffee",
    content: "Exceptional attention to detail and a deep understanding of what makes a brand memorable. Our new identity has received countless compliments and helped us stand out in a competitive market.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director, Nova Fitness",
    content: "The creative process was seamless and collaborative. They truly listened to our vision and delivered beyond expectations. Our rebrand has significantly boosted engagement and brand recognition.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Owner, Artisan Bakery Co.",
    content: "From concept to final delivery, the experience was outstanding. The packaging design has become a talking point with customers and perfectly represents our artisan values.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

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
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
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
                  "{testimonials[activeIndex].content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="font-display font-bold text-lg text-primary-foreground">
                      {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[activeIndex].role}
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
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Client logos placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground text-sm mb-8">Trusted by innovative brands</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {["TechFlow", "Luxe", "Nova", "Apex", "Artisan", "Evergreen"].map((brand) => (
              <div key={brand} className="font-display font-bold text-xl text-muted-foreground">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
