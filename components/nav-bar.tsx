"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Music", path: "/music" },
  { name: "Photography", path: "/photography" },
  { name: "Writing", path: "/writing" },
  { name: "Connect", path: "/connect" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-stone/20 dark:border-stone/10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <Link
              href="/"
              className="text-xl font-bold text-mountain hover:text-lake-dark transition-colors dark:text-lake dark:hover:text-lake-dark"
            >
              Sanjay Anasuri
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-colors hover:text-lake-dark relative py-2 dark:hover:text-lake",
                  pathname === item.path
                    ? "text-lake-dark dark:text-lake"
                    : "text-mountain/70 dark:text-stone-light/70",
                )}
              >
                {pathname === item.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-lake-dark dark:bg-lake"
                  />
                )}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

