import { NextResponse } from "next/server"

async function getAccessToken() {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET

    if (!client_id || !client_secret) {
      throw new Error("Missing Spotify credentials")
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Token request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error getting access token:", error)
    throw error
  }
}

export async function GET(request: Request) {
  try {
    // Get the playlist ID from the query string
    const { searchParams } = new URL(request.url)
    const playlistId = searchParams.get("id")

    if (!playlistId) {
      return NextResponse.json({ error: "Playlist ID is required" }, { status: 400 })
    }

    // Get access token
    const access_token = await getAccessToken()

    // Fetch playlist details
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Spotify API error (${response.status}):`, errorText)
      throw new Error(`Failed to fetch playlist: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Spotify API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Spotify playlist",
        message: error.message,
      },
      { status: 500 },
    )
  }
}

