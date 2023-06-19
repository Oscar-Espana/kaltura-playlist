import { getClientTag } from "@/services/session";
import { getUrlThumbAsset } from "@/services/thumbAsset";

export default async function handler(req, res) {
  const { thumbAssetId = "" } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const secretKey = String(await getClientTag());
        const urlImage = await getUrlThumbAsset(secretKey, thumbAssetId);
        res.status(200).json({ urlImage });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({
        message: "Bad Request",
      });
  }
}
