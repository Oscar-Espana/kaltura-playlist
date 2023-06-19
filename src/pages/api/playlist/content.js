import { getContentPlaylist } from "@/services/playlist";
import { getClientTag } from "@/services/session";

export default async function handler(req, res) {
  const { playlistType, playlistContent } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const secretKey = String(await getClientTag());
        const content = await getContentPlaylist(
          secretKey,
          playlistType,
          playlistContent
        );
        return res.status(200).json({ content });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({
        message: "Bad Request",
      });
  }
}
