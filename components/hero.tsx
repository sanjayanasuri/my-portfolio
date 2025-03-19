"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Hey! I'm Sanjay.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Explore my projects, photography, and more.
        </p>
      </div>
    </section>
  );
}
