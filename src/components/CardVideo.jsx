import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardVideo = ({ id, name, img }) => {
  return (
    <Link className="relative h-80 w-full" href={`/video/${id}`}>
      <figure className="absolute inset-0">
        <Image
          fill
          src={img}
          alt={name}
          style={{
            objectFit: "cover",
          }}
        />
      </figure>
    </Link>
  );
};

export default CardVideo;
