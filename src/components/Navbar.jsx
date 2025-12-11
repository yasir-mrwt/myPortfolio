import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition"
                    style={{ willChange: "transform" }}
                  />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden sm:block">
                  Muhammad Yasir
                </span>
              </motion.div>
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`relative z-10 font-medium transition ${
                      activeSection === link.id
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>

                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transition-opacity ${
                      activeSection === link.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* MOBILE BUTTON */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP (SOLID - LESS LAG) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/80 md:hidden"
              style={{ zIndex: 90, willChange: "opacity" }}
              onClick={() => setIsOpen(false)}
            />

            {/* SLIDE PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-slate-900 border-l border-slate-700 md:hidden shadow-xl"
              style={{ zIndex: 99, willChange: "transform" }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <div className="space-y-2 flex-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="w-full text-left"
                    >
                      <div
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          activeSection === link.id
                            ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
                            : "text-white hover:bg-slate-800"
                        }`}
                      >
                        {link.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <p className="text-sm text-slate-500 text-center">
                    © {currentYear} Muhammad Yasir
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
