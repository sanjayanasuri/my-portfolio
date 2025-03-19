"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample project data - replace with your own
const projectsData = [
  {
    id: 1,
    title: "DJ Track Recommendation System",
    description:
      "A machine learning powered code assistant that helps DJ's mix tracks using features such as key, bpm, energy, danceability, and valence.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dj_portfolio.jpg-REDl3N5W51VuY53QiwKfnxe3XxYQ4Z.jpeg",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    github: "https://github.com/sanjayanasuri/DJ-Assistant.git",
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mountain dark:text-lake">My Projects</h2>
          <p className="text-mountain/70 dark:text-stone-light/70 max-w-2xl mx-auto">
            A collection of my computer science projects, showcasing my skills and interests in software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                className="h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-lake-dark/50 dark:hover:border-lake/50 transition-all duration-300"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="overflow-hidden h-48 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform: activeProject === project.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="dark:text-stone-light/70">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="dark:bg-mountain/20 dark:text-stone-light">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 dark:border-lake/50 dark:text-lake"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

