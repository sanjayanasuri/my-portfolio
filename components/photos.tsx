"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Updated photo data with your actual images
const photoData = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%200842%20%281%29.JPG-Do6krKtM0XeiuUKA8JosBS8TnfIxNS.jpeg",
    alt: "Palm trees lining a parking lot during golden hour",
    category: "urban",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%200927.JPG-SgiC7w5RBGUzqWWlbLnmDzcUTnycbZ.jpeg",
    alt: "Misty Golden Gate Bridge with birds flying across",
    category: "landscape",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%201150.JPG-cP0HODXC0rZuZcJmlSSuZooJjK21Si.jpeg",
    alt: "Clock tower with brick base and white top against blue sky",
    category: "architecture",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%201169.JPG-IDhqggauAs40R21bEjFYdPoMwniA0s.jpeg",
    alt: "Modern fountain sculpture with tall concrete panels",
    category: "architecture",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20IMG%207322.JPG-dvCXU31SQLtQPneefht27yyTd9j6xE.jpeg",
    alt: "Large P sculpture on a stone base in a campus setting",
    category: "campus",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%201159.JPG-inMiL2gD3AVXJno22td5Mpv8S7YWtr.jpeg",
    alt: "Modern fountain sculpture with water feature in center",
    category: "architecture",
  },
  {
    id: 7,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%201135.JPG-JhYPKCZihBOWY3qqjF1WOeEvyOaEkr.jpeg",
    alt: "Campus pathway with lamp posts and hanging flower baskets",
    category: "campus",
  },
  {
    id: 8,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%201172.JPG-kTJkeHPObgz9dQfwnrqdQVCFnIFHWl.jpeg",
    alt: "Neoclassical building with large columns and steps",
    category: "architecture",
  },
  {
    id: 9,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20IMG%207317.JPG-rwTNgyb5MI7pzVGSYKukDMO0i88DD0.jpeg",
    alt: "Historic red brick building with tower in Victorian style",
    category: "architecture",
  },
  {
    id: 10,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20IMG%207095.JPG-POV27jzHWIOS3XY0eoyJFlO6ofwl4L.jpeg",
    alt: "Statue of a person sitting on a bench outside an engineering building",
    category: "campus",
  },
  {
    id: 11,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photo%20DSC%200971.JPG-DHEOIdvM1OhjzDD2hcFZKyxvpWAlCe.jpeg",
    alt: "Fountain in a lagoon with houses on a hillside in the background",
    category: "landscape",
  },
]

// Updated categories to match the new photos
const categories = ["all", "architecture", "urban", "landscape", "campus"]

export default function Photos() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const filteredPhotos =
    selectedCategory === "all" ? photoData : photoData.filter((photo) => photo.category === selectedCategory)

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-background/90">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            Photography
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A collection of photographs I've taken, capturing moments and scenes that inspire me.
          </p>
        </motion.div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="aspect-[4/3] relative group overflow-hidden rounded-lg"
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white border border-white/30 hover:bg-white/20"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <Image
                  src={photoData.find((photo) => photo.id === selectedPhoto)?.src || "/placeholder.svg"}
                  alt={photoData.find((photo) => photo.id === selectedPhoto)?.alt || ""}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] w-auto"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

