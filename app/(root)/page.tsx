import React from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import { dummyCards, visibilities } from "@/constants";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All videos" subHeader="Public Library" />
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
};

export default Page;

/*
<VideoCard
        id="1"
        title="SnapChat Message - 30 March 2025"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt={new Date("2025-05-20T18:30:00Z")}
        userImg="/assets/images/jason.png"
        username="Jason"
        views={10}
        visibility="public"
        duration={156}
      />
      <VideoCard
        id="2"
        title="Abandoned Mall Exploration Gone Wrong"
        thumbnail="/assets/samples/thumbnail (2).png"
        createdAt={new Date("2025-05-18T14:12:00Z")}
        userImg="/assets/images/sarah.png"
        username="SarahVlogs"
        views={5421}
        visibility="public"
        duration={603}
      />

      <VideoCard
        id="3"
        title="How to Make the Perfect Omelette"
        thumbnail="/assets/samples/thumbnail (3).png"
        createdAt={new Date("2025-04-22T09:45:00Z")}
        userImg="/assets/images/alex.png"
        username="ChefAnna"
        views={15322}
        visibility="unlisted"
        duration={298}
      />

      <VideoCard
        id="4"
        title="Private Coding Session - React & TypeScript"
        thumbnail="/assets/samples/thumbnail (4).png"
        createdAt={new Date("2025-05-01T20:00:00Z")}
        userImg="/assets/images/lisa.png"
        username="DevMike"
        views={0}
        visibility="private"
        duration={null}
      />

      <VideoCard
        id="5"
        title="Top 10 Fast Cars in 2025"
        thumbnail="/assets/samples/thumbnail (5).png"
        createdAt={new Date("2025-05-24T12:10:00Z")}
        userImg="/assets/images/michael.png"
        username="AutoKing"
        views={87591}
        visibility="public"
        duration={427}
      />
*/
