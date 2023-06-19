import React from "react";
import { useEffect, useState } from "react";
import appApi from "@/api/appApi";
import CardVideo from "./CardVideo";

const Playlist = ({ playlistType, playlistContent }) => {
  const [contentPlaylist, setContentPlaylist] = useState([]);

  const getUrlImageByThumbAssetId = async (thumbAssetId) => {
    const urlImageResponse = await appApi.post("/thumbAssets/urlImage", {
      thumbAssetId: thumbAssetId,
    });
    return urlImageResponse.data.urlImage;
  };

  const getThumbAssetsByEntryId = async (entryId) => {
    const thumbAssetsResponse = await appApi.post("/thumbAssets", {
      entryId: entryId,
    });
    const thumbAssets = thumbAssetsResponse.data.objects || [];
    return thumbAssets;
  };

  const getContentOfPlaylist = async () => {
    const contentPlaylistResponse = await appApi.post("/playlist/content", {
      playlistContent,
      playlistType,
    });
    const contentInPlayList = contentPlaylistResponse.data.content || [];
    setContentPlaylist(contentInPlayList);

    const contentInPlayListAux = await Promise.all(
      contentInPlayList.map(async (item) => {
        const thumbAssets = await getThumbAssetsByEntryId(item.id);
        const thumbAssetsAux = await Promise.all(
          thumbAssets.map(async (thumb) => {
            return await getUrlImageByThumbAssetId(thumb.id);
          })
        );
        return {
          ...item,
          image: thumbAssetsAux.length > 0 ? thumbAssetsAux[0] : "",
        };
      })
    );
    setContentPlaylist(contentInPlayListAux);
  };

  useEffect(() => {
    getContentOfPlaylist();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {contentPlaylist.map((item) => (
        <CardVideo
          key={item.id}
          id={item.id}
          img={item.image || item.thumbnailUrl}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default Playlist;
