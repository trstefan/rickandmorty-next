"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg?height=40&width=40"
              alt="Rick and Morty Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl">Rick & Morty</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/characters">Characters</NavLink>
            <NavLink href="/locations">Locations</NavLink>
            <NavLink href="/episodes">Episodes</NavLink>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-40 pt-20 px-4"
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
        >
          <nav className="flex flex-col gap-6 text-lg">
            <Link
              href="/characters"
              className="py-3 border-b border-gray-800 hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Characters
            </Link>
            <Link
              href="/locations"
              className="py-3 border-b border-gray-800 hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Locations
            </Link>
            <Link
              href="/episodes"
              className="py-3 border-b border-gray-800 hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Episodes
            </Link>
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url(/characters.jpg)] bg-cover bg-center brightness-[0.3] scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Explore the Multiverse
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Dive into the chaotic world of Rick and Morty. Discover
              characters, locations, and episodes from across infinite
              dimensions.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronRight size={30} className="rotate-90 opacity-70" />
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore the Universe
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover everything the show has to offer, from bizarre characters
              to mind-bending locations.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <CategoryCard
              title="Characters"
              description="Meet the multiverse's most bizarre and fascinating beings."
              image="/characters.jpg"
              href="/characters"
              variants={item}
            />

            <CategoryCard
              title="Locations"
              description="Explore strange new worlds across infinite dimensions."
              image="/locations.jpg"
              href="/locations"
              variants={item}
            />

            <CategoryCard
              title="Episodes"
              description="Relive the adventures through all seasons and episodes."
              image="/episodes.jpg"
              href="/episodes"
              variants={item}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800 mt-12 pt-8">
            <p className="text-gray-500 text-md font-semibold">
              © {new Date().getFullYear()} Stefan Traciu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

function CategoryCard({ title, description, image, href, variants }) {
  return (
    <motion.div
      className="relative h-[400px] rounded-3xl overflow-hidden group"
      variants={variants}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="absolute inset-0  bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <h3 className="text-3xl font-bold mb-3 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
          {title}
        </h3>
        <p className="text-gray-300 mb-6 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
          {description}
        </p>
        <Link
          href={href}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white w-fit px-6 py-3 rounded-full font-medium transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 flex items-center gap-2"
        >
          Explore
          <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

function SocialLink({ href, label }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {/* Icon would go here */}
    </Link>
  );
}
