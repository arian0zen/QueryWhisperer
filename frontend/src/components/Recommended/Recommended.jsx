import React, { useState, useEffect } from "react";
import axios from "axios";
import DemoCard from "../UI/DemoVideoCard/DemoCard";

const RecommendedComponent = ({demoVideoClickHandler}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("programming in 100 seconds");

  useEffect(() => {
    // Fetch YouTube video data using Axios (you need to replace this with your API call)
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/api/ytvideos", {
          query: selectedTag,
        });
        let videos = response.data;
        setVideos(videos);
      } catch (error) {
        console.error("Error fetching YouTube data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTag]);

  const getVideos = async (tag) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/ytvideos", {
        query: tag,
      });
      let videos = response.data;
      setVideos(videos);
    } catch (error) {
      console.error("Error fetching YouTube data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const getTagClassName = (tag) => {
    return `bg-transparent hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${
      tag === selectedTag ? "bg-blue-500 text-red-400" : ""
    }`;
  };

  return (
    <div>
      <div className="chips flex gap-2 mb-4">
        <button
          className={getTagClassName("programming in 100 seconds")}
          onClick={() => handleTagClick("programming in 100 seconds")}
        >
          Programming
        </button>
        <button
          className={getTagClassName("robotics videos within 10 minutes")}
          onClick={() => handleTagClick("robotics videos within 10 minutes")}
        >
          Robotics
        </button>
        <button
          className={getTagClassName("environment videos within 10 minutes")}
          onClick={() => handleTagClick("environment videos within 10 minutes")}
        >
          Environment
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-4 mt-8">
          {videos.map((video) => (
            <DemoCard onClick={()=>{
                console.log("clicked")
                demoVideoClickHandler(video.url)
            }} key={video.videoId} title={video.title} thumbnail={video.thumbnail} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedComponent;
