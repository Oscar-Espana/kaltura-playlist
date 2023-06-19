import { getEntryData } from "@/services/entries";
import { getClientTag } from "@/services/session";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const clientTag = String(await getClientTag());
    const entry = await getEntryData(clientTag, id);
    res.status(200).json({ entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
