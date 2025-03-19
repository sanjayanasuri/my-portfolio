"use client"

import { useState, useEffect } from "react"
import { Play, Music, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function SpotifyPlaylists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch("/api/spotify-playlists")
        const data = await res.json()

        if (data.error) {
          throw new Error(data.message || "Failed to fetch playlists")
        }

        setPlaylists(data.items || [])
      } catch (err) {
        console.error("Error fetching playlists:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-pulse bg-blue-500/20 rounded-full p-4 mb-4">
          <Music className="h-8 w-8 text-blue-400" />
        </div>
        <p>Loading my Spotify playlists...</p>
      </div>
    )
  }

  if (error || playlists.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">{error || "No public playlists found"}</p>
        <Button
          variant="outline"
          className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:text-green-500"
          asChild
        >
          <a
            href={`https://open.spotify.com/user/316liwnyimfpkysyw2sfruogurvu`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Spotify Profile <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Spotify Playlists</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="p-4 flex items-start gap-3">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-blue-500/10">
                  <img
                    src={playlist.images?.[0]?.url || "/placeholder.svg?height=64&width=64"}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{playlist.name}</h4>
                  <p className="text-sm text-foreground/70 truncate">{playlist.tracks?.total || 0} tracks</p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="text-xs" asChild>
                      <a href={playlist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                        <Play className="h-3 w-3 mr-1" /> Listen on Spotify
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button
          variant="outline"
          className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:text-green-500"
          asChild
        >
          <a
            href={`https://open.spotify.com/user/316liwnyimfpkysyw2sfruogurvu`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All My Playlists <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}

