import Music from "@/components/music"
import SpotifyPlaylists from "@/components/spotify-playlists"

export default function MusicPage() {
  return (
    <main className="page-container">
      <div className="pt-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-mountain">My Music</h2>
        <p className="text-center text-mountain/70 max-w-2xl mx-auto mb-12">
          Explore my musical tastes through Spotify and listen to original compositions I've created.
        </p>

        <div className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-12">
          <SpotifyPlaylists />
        </div>

        <Music />
      </div>
    </main>
  )
}

