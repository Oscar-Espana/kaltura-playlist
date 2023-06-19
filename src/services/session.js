import kaltura from "kaltura-client";
import clientKaltura from "@/utlils/kaltura/KalturaConfig";

export const getClientTag = () =>
  new Promise(function (resolve, reject) {
    let administratorSecret = "1a913c87aebf6cac7c0ee2b5dd7ebeb7";
    let userId = "espaaoscar@gmail.com";
    let type = kaltura.enums.SessionType.USER;
    let partnerId = 5305842;
    let expiry = 86400;
    let privileges = "";

    return kaltura.services.session
      .start(administratorSecret, userId, type, partnerId, expiry, privileges)
      .execute(clientKaltura)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
