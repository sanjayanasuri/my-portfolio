"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample Spotify data - would be fetched from Spotify API
const spotifyTopTracks = [
  {
    id: "1",
    name: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    name: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "5",
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    image: "/placeholder.svg?height=60&width=60",
  },
]

// Sample original songs - replace with your own
const originalSongs = [
  {
    id: "1",
    title: "Midnight Dreams",
    duration: "3:45",
    coverArt: "/placeholder.svg?height=300&width=300",
    audioSrc: "#", // Replace with actual audio file
  },
  {
    id: "2",
    title: "Ocean Waves",
    duration: "4:12",
    coverArt: "/placeholder.svg?height=300&width=300",
    audioSrc: "#", // Replace with actual audio file
  },
  {
    id: "3",
    title: "City Lights",
    duration: "3:28",
    coverArt: "/placeholder.svg?height=300&width=300",
    audioSrc: "#", // Replace with actual audio file
  },
]

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(originalSongs[0])
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)

  // Simulate progress bar movement when playing
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSongSelect = (song: (typeof originalSongs)[0]) => {
    setCurrentSong(song)
    setProgress(0)
    setIsPlaying(true)
  }

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
            My Music
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore my musical tastes through Spotify and listen to original compositions I've created.
          </p>
        </motion.div>

        <Tabs defaultValue="spotify" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="spotify">Spotify Favorites</TabsTrigger>
            <TabsTrigger value="original">My Compositions</TabsTrigger>
          </TabsList>

          <TabsContent value="spotify">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">My Top Tracks</h3>
              <div className="space-y-4">
                {spotifyTopTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-2 rounded-md hover:bg-primary/10 transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={track.image} alt={track.album} />
                      <AvatarFallback>{track.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.name}</p>
                      <p className="text-sm text-foreground/70 truncate">
                        {track.artist} • {track.album}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:text-green-500"
                >
                  Connect to Spotify
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="original">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-1"
              >
                <div className="space-y-4">
                  {originalSongs.map((song) => (
                    <Card
                      key={song.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        currentSong.id === song.id ? "border-blue-500 bg-blue-500/10" : "hover:border-blue-400/50"
                      }`}
                      onClick={() => handleSongSelect(song)}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={song.coverArt || "/placeholder.svg"}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{song.title}</p>
                          <p className="text-sm text-foreground/70">{song.duration}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                          {currentSong.id === song.id && isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 mb-6 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={currentSong.coverArt || "/placeholder.svg"}
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{currentSong.title}</h3>
                    <p className="text-foreground/70 mb-6">Original Composition</p>

                    <div className="w-full mb-4">
                      <Slider
                        value={[progress]}
                        max={100}
                        step={0.1}
                        onValueChange={(value) => setProgress(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-foreground/70 mt-1">
                        <span>
                          {Math.floor((Number.parseInt(currentSong.duration) * progress) / 100)}:
                          {Math.floor(
                            ((Number.parseInt(currentSong.duration) * progress) / 100 -
                              Math.floor((Number.parseInt(currentSong.duration) * progress) / 100)) *
                              60,
                          )
                            .toString()
                            .padStart(2, "0")}
                        </span>
                        <span>{currentSong.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={togglePlay}
                        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
                        <SkipForward className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 w-full max-w-xs">
                      <Volume2 className="h-4 w-4 text-foreground/70" />
                      <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={(value) => setVolume(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

