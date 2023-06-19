import { useEffect, useState } from "react";
import appApi from "@/api/appApi";
import Playlist from "@/components/Playlist";

export default function Home() {
  const [playlist, setPlaylist] = useState([]);

  const getPlaylist = async () => {
    const playlist = await appApi.get("/playlist");
    setPlaylist(playlist.data.listPlaylist.objects || []);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <main className="min-h-screen">
      <section className="container mx-auto py-10 px-6">
        <div className="flex flex-col gap-9">
          {playlist.length > 0 &&
            playlist.map((item, index) => (
              <div key={index} href={`/playlist/${item.id}`}>
                <h2 className="text-2xl mb-3">{item.name}</h2>
                <Playlist
                  playlistContent={item.playlistContent}
                  playlistType={item.playlistType}
                />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
