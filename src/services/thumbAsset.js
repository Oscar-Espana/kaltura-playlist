import kaltura from "kaltura-client";
import clientKaltura from "@/utlils/kaltura/KalturaConfig";

export const getListThumbAsset = (tokenSession, entryId) =>
  new Promise(function (resolve, reject) {
    clientKaltura.setKs(tokenSession);
    let filter = new kaltura.objects.AssetFilter();
    filter.entryIdEqual = entryId;
    let pager = new kaltura.objects.FilterPager();

    kaltura.services.thumbAsset
      .listAction(filter, pager)
      .execute(clientKaltura)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getUrlThumbAsset = (tokenSession, thumbAssetId) =>
  new Promise(function (resolve, reject) {
    clientKaltura.setKs(tokenSession);
    let id = thumbAssetId;
    let storageId = 0;
    let thumbParams = new kaltura.objects.ThumbParams();

    kaltura.services.thumbAsset
      .getUrl(id, storageId, thumbParams)
      .execute(clientKaltura)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
