"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample blog post data - replace with your own
const blogPosts = [
  {
    id: 1,
    title: "My Half-Marathon Experience",
    excerpt: "Read a little glimpse into my headspace during the Half.",
    date: "Oct 26th, 2024",
    category: "Fitness",
    readTime: "5 min read",
  },
]

export default function Writing() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background/90 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            My Writing
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Thoughts, stories, and insights I've shared through my writing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-foreground/60">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-foreground/70">{post.readTime}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group text-blue-400 hover:text-blue-300 p-0">
                    Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

