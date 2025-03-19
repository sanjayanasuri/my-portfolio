"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-4 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 brush-stroke bg-gradient-to-br from-lake-dark/10 via-stone/20 to-mountain/10 dark:from-lake-dark/20 dark:via-stone/10 dark:to-mountain/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-mountain dark:text-lake mb-6"
          >
            Hey, I'm Sanjay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-mountain/80 dark:text-stone-light/80 max-w-2xl mb-8"
          >
            Developer • Musician • Photographer • Writer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-lake hover:bg-lake-dark text-white dark:bg-mountain dark:hover:bg-mountain-light"
              asChild
            >
              <Link href="/projects">
                Explore My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex-1 w-full max-w-2xl aspect-[4/3]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20IMG%206532.PNG-ZGRG1UzMvCzCAxo0dCyJtpapaokxmd.jpeg"
              alt="Sanjay at Lake Louise"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mountain/20 to-transparent dark:from-mountain/40" />
          </div>
        </div>
      </div>
    </section>
  )
}

