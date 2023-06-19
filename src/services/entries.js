import kaltura from "kaltura-client";
import clientKaltura from "@/utlils/kaltura/KalturaConfig";

export const getEntryData = (tokenSession, entryId) =>
  new Promise(function (resolve, reject) {
    clientKaltura.setKs(tokenSession);
    let version = -1;
    return kaltura.services.media
      .get(entryId, version)
      .execute(clientKaltura)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
