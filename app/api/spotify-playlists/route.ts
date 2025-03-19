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
      console.error("Token request failed:", errorText)
      throw new Error(`Token request failed: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error getting access token:", error)
    throw error
  }
}

export async function GET() {
  try {
    // Get access token
    const access_token = await getAccessToken()

    // Use your Spotify user ID
    const userId = process.env.SPOTIFY_USER_ID

    console.log("Fetching playlists for user:", userId)

    // Fetch playlists with expanded fields
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists?limit=10&fields=items(id,name,images,tracks(total),external_urls,public)`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Spotify API error:", errorText)
      throw new Error(`Failed to fetch playlists: ${response.status}`)
    }

    const data = await response.json()

    // Filter out private playlists and ensure we have all required fields
    const playlists = data.items
      .filter((playlist) => playlist.public)
      .map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        images: playlist.images,
        tracks: playlist.tracks,
        external_urls: playlist.external_urls,
      }))

    return NextResponse.json({ items: playlists })
  } catch (error) {
    console.error("Error in Spotify API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Spotify playlists",
        message: error.message,
        items: [],
      },
      { status: 500 },
    )
  }
}

