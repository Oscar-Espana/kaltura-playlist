import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import appApi from "@/api/appApi";

const Video = () => {
  const { query } = useRouter();
  const idEntry = query.id || "";

  const [entry, setEntry] = useState(null);

  const getEntryData = async (idEntryAux) => {
    const entryResponse = await appApi.get(`/entries/${idEntryAux}`);
    setEntry(entryResponse.data.entry || null);
  };

  useEffect(() => {
    getEntryData(idEntry);
  }, [idEntry]);

  return (
    <section className="container py-16 px-6 mx-auto">
      {!entry ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h1 className="text-5xl mb-4">{entry.name}</h1>
          <p>{entry.description}</p>
          <div className="mt-4 w-80 h-60 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://cdnapisec.kaltura.com/p/5305842/embedPlaykitJs/uiconf_id/52477572?iframeembed=true&entry_id=1_ubi5ekbj"
              allowfullscreen
              webkitallowfullscreen
              mozAllowFullScreen
              allow="autoplay *; fullscreen *; encrypted-media *"
              frameborder="0"
            ></iframe>
          </div>
        </>
      )}
    </section>
  );
};

export default Video;
