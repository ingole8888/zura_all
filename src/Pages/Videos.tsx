import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import {
  HiArrowLongLeft,
  HiHeart,
  HiChatBubbleOvalLeftEllipsis,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Videos = () => {
  const [playVideo, setPlayVideo] = useState<any>(false);

  const { currentVideo } = useSelector((store: any) => store);
  const navigate = useNavigate();

  const [reactionCount, setReactionCount] = useState<any>(currentVideo.reaction.count);
  const [commentCount, setCommentCount] = useState<any>(currentVideo.comment.count);
  console.log(currentVideo);
  useEffect(() => {
    setPlayVideo(true);
  }, []);
  const handleReactionIncrement = () => {
    const newReactionCount = reactionCount + 1;
    setReactionCount(newReactionCount);
    localStorage.setItem('reactionCount', newReactionCount.toString());
  };

  const handleCommentIncrement = () => {
    const newCommentCount = commentCount + 1;
    setCommentCount(newCommentCount);
    localStorage.setItem('commentCount', newCommentCount.toString());
  };


  useEffect(() => {
    const initialReactionCount = parseInt(localStorage.getItem('reactionCount') || currentVideo.reaction.count);
    const initialCommentCount = parseInt(localStorage.getItem('commentCount') || currentVideo.comment.count);

    setReactionCount(initialReactionCount);
    setCommentCount(initialCommentCount);
  }, []);

  return (
    <>
    <Navbar/>
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      
      <div
        style={{ margin: "50px 0 30px 0", color: "#6366f1", cursor: "pointer" }}
      >
        {/* <HiArrowLongLeft fontSize={"2.4rem"} onClick={() => navigate("/")} /> */}
        <h3 onClick={() => navigate("/")} style={{textDecoration:"none"}}>Home</h3>
      </div>
      <div className="container  mx-auto">
        <div
          className="lg:w-4/5 mx-auto flex flex-wrap"
        >
          <ReactPlayer
            url={currentVideo?.submission?.mediaUrl}
            controls={true}
            light={currentVideo?.submission?.thumbnail}
            playing={playVideo}
            width="310px"
            height="78vh"
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 bg-teal-300">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "12px",
              }}
            >
              <img
                src={currentVideo.creator.pic}
                alt={currentVideo.creator.pic}
                style={{
                  height: "50px",
                  width: "50px",
                  border: "1px solid #6366f1",
                  borderRadius: "50%",
                }}
              />
              <div>
                <h1 className="text-gray-900 text-2xl title-font font-medium ">
                  {currentVideo.creator.name}
                </h1>
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {currentVideo.creator.handle}
                </h2>
              </div>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-5">
              {currentVideo?.submission?.title}
            </h1>
            <p className="leading-relaxed">
              {currentVideo?.submission?.description}
            </p>

            <div
              className="flex mt-5"
              style={{
                alignItems: "center",
                gap: "12px",
              }}
            >
              <button
                className="rounded-full w-10 h-10 bg-red-300 p-0 border-0 inline-flex items-center justify-center text-gray-500"
                onClick={handleReactionIncrement}
              >
                <HiHeart fontSize={"1.2rem"} color="red" />
              </button>
              <p className="leading-relaxed text-1xl">{reactionCount}</p>

              <button
                className="rounded-full w-10 h-10 bg-blue-300 p-0 border-0 inline-flex items-center justify-center text-gray-500"
                onClick={handleCommentIncrement}
              >
                <HiChatBubbleOvalLeftEllipsis fontSize={"1.2rem"} color="blue" />
              </button>
              <p className="leading-relaxed text-1xl">{commentCount}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Videos;
