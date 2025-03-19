import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.accessToken) {
      return new Response("Unauthorized", { status: 401 })
    }

    const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!res.ok) {
      return new Response("Failed to fetch tracks", { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

