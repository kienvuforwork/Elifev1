"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/loader";
import Post from "./components/card/post";
import { onOpen } from "./store/loginModalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
const Home = () => {
  const [posts, setPost] = useState([]);
  const user = useSelector((state: RootState) => state.userSlice.username);
  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  });
  const dispatch: AppDispatch = useDispatch();
  const onOpenLoginModal = () => {
    dispatch(onOpen());
  };
  useEffect(() => {
    const getPostWithCeleb = async () => {
      try {
        const res = await fetch("http://localhost:8080/post/celeb");
        const posts = await res.json();
        setPost(posts.postWithCeleb.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
        setPost([]);
      }
    };
    getPostWithCeleb();
  }, []);

  return (
    <Suspense fallback={<Loader></Loader>}>
      <div className="border-2 border-elife-700 h-[2000px] w-full pt-2 flex flex-col gap-2">
        <div className="text-center text-xl">Discover What's Trending </div>
        {posts &&
          posts.map((post: any, index: number) => (
            <Post
              username={post.username}
              type={post.type}
              date={new Date(post.customDate).toLocaleString()}
              key={index}
              data={post.data}
              isLoggedIn={false}
              isCeleb={post.isCeleb}
            ></Post>
          ))}
        <div className="text-lg text-center text-elife-600">
          <span
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={onOpenLoginModal}
          >
            Join us
          </span>{" "}
          now to see more posts!
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
