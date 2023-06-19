import { getClientTag } from "@/services/session";
import { getListThumbAsset } from "@/services/thumbAsset";

export default async function handler(req, res) {
  const { entryId = "" } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const secretKey = String(await getClientTag());
        const listThumbAsset = await getListThumbAsset(secretKey, entryId);
        res.status(200).json({ ...listThumbAsset });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({
        message: "Bad Request",
      });
  }
}
