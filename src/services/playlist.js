import kaltura from "kaltura-client";
import clientKaltura from "@/utlils/kaltura/KalturaConfig";

export const getListOfPlayList = (tokenSession) =>
  new Promise(function (resolve, reject) {
    let filter = new kaltura.objects.PlaylistFilter();
    let pager = new kaltura.objects.FilterPager();

    clientKaltura.setKs(tokenSession);
    return kaltura.services.playlist
      .listAction(filter, pager)
      .execute(clientKaltura)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getContentPlaylist = (
  tokenSession,
  playlistType,
  playlistContent
) =>
  new Promise(function (resolve, reject) {
    clientKaltura.setKs(tokenSession);
    let detailed = "";
    let pager = new kaltura.objects.FilterPager();

    kaltura.services.playlist
      .executeFromContent(playlistType, playlistContent, detailed, pager)
      .execute(clientKaltura)
      .then((result) => {
        const responseAux = result.map((item) => {
          return { ...item };
        });
        resolve(responseAux);
      })
      .catch((err) => {
        reject(err);
      });
  });
