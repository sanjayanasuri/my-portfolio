export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-mountain/60 dark:text-stone-light/60 text-sm">
          © {new Date().getFullYear()} Sanjay Anasuri. All rights reserved.
        </p>
        <p className="text-mountain/40 dark:text-stone-light/40 text-xs mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  )
}

