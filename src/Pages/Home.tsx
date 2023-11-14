import React, { useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "../Components/Navbar";
import { setVideo } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import * as types from "../Redux/actionTypes";

function Home() {
  const { videos, page, isLoading } = useSelector((store: any) => store);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  const getVideos = async () => {
    dispatch({ type: types.START_GET_VIDEOS });
    try {
      const res = await axios.get(
        `https://zuraback.onrender.com/videos?page=${page}`
      );
      dispatch({
        type: types.SUCCESS_GET_VIDEOS,
        payload: res.data.data.posts,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.END_GET_VIDEOS });
    }
  };

  const handleCurrentVideo = (id: String) => {
    const result = videos.filter((item: any) => item.postId === id);
    dispatch(setVideo(result[0]));
    navigate(`/video/${id}`);
  };

  useEffect(() => {
    getVideos();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="bg-teal-300 " style={{width:"100%"}}>
      <div className="text-gray-500 body-font">
        <div className="px-1 py-10 mx-auto" >
          <div className=" w-full mb-10">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{marginLeft:"1rem"}}>
                Trending shorts ...
              </h1>
            </div>
            <p className=" w-full leading-relaxed text-gray-500" style={{marginLeft:"1rem"}}>
              Welcome to Trending shorts, your ultimate hub for bite-sized entertainment! 
              Dive into a world of fast-paced, captivating, and enjoyable short videos.
               Immerse yourself in an infinite flow of varied content, savor a 
               tailor-made feed just for you, and become a part of our lively and
                dynamic community. Prepare for endless entertainment, all delivered
                 in short, delightful video bursts.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {videos.length !== 0 && isLoading ? (
              <h1 className="text-gray-900 text-2xl title-font font-medium m-auto ">
                Loading...
              </h1>
            ) : (
              videos.map((item: any, i: number) => {
                return (
                  <div key={i} className="md:w-1/2 hover-highlight image-container" style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                      width:"24%",
                  }}>
                    <img
                      onClick={() => {
                        handleCurrentVideo(item.postId);
                      }}
                      className="h-300 rounded w-full object-cover object-center mb-6 cursor-pointer"
                      src={item.submission.thumbnail}
                      alt={item.submission.thumbnail}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {videos.length > 0 && !isLoading && <Pagination />}
      </div>
    </>
  );
}

export default Home;
