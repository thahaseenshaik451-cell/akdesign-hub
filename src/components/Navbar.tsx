import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
const navLinks = [{
  name: "Home",
  href: "#home"
}, {
  name: "About",
  href: "#about"
}, {
  name: "Services",
  href: "#services"
}, {
  name: "Portfolio",
  href: "#portfolio"
}, {
  name: "Testimonials",
  href: "#testimonials"
}, {
  name: "Contact",
  href: "#contact"
}];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a href="#home" onClick={e => {
          e.preventDefault();
          scrollToSection("#home");
        }} className="flex items-center gap-2" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-bold text-lg text-primary-foreground">​AK</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              ​Design<span className="gradient-text">​Hub</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => <motion.a key={link.name} href={link.href} onClick={e => {
            e.preventDefault();
            scrollToSection(link.href);
          }} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative group" whileHover={{
            y: -2
          }}>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300" />
              </motion.a>)}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="text-muted-foreground hover:text-foreground">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button variant="hero" size="sm" className="hidden md:flex" onClick={() => scrollToSection("#contact")}>
              Start a Project
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => <motion.a key={link.name} href={link.href} onClick={e => {
            e.preventDefault();
            scrollToSection(link.href);
          }} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }} className="text-foreground text-lg font-medium py-2 hover:text-primary transition-colors">
                  {link.name}
                </motion.a>)}
              <Button variant="hero" className="mt-4" onClick={() => scrollToSection("#contact")}>
                Start a Project
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};
export default Navbar;