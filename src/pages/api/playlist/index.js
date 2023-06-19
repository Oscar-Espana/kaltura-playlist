import { getListOfPlayList } from "@/services/playlist";
import { getClientTag } from "@/services/session";

export default async function handler(req, res) {
  try {
    const clientTag = String(await getClientTag());
    const listPlaylist = await getListOfPlayList(clientTag);
    res.status(200).json({ listPlaylist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
