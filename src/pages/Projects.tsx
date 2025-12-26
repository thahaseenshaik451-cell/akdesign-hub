import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <PortfolioSection />
      </div>
      <Footer />
    </main>
  );
};

export default Projects;

