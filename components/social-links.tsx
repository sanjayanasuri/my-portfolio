"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram} from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="h-6 w-6" />,
    url: "https://github.com/sanjayanasuri",
    color: "hover:bg-[#333] hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-6 w-6" />,
    url: "https://linkedin.com/in/sanjayanasuri",
    color: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    url: "https://instagram.com/anasuriflicks",
    color: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white",
  },
]

export default function SocialLinks() {
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
            Connect With Me
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Follow me on social media to stay updated with my latest projects, music, and photography.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  variant="outline"
                  className={`w-full h-full py-6 flex flex-col items-center justify-center gap-2 transition-colors duration-300 ${link.color}`}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

