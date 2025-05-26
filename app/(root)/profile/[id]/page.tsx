import Header from "@/app/components/Header";
import VideoCard from "@/app/components/VideoCard";
import { dummyCards } from "@/constants";
import React from "react";

const Page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;

  return (
    <div className="wrapper page">
      <Header
        subHeader="rayman@gmail.com"
        title="Rayman | Rayman Industries"
        userImg="/assets/images/dummy.jpg"
      />
      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
      {/* <h1 className="text-2xl font-karla">USER ID: {id}</h1> */}
    </div>
  );
};

export default Page;
