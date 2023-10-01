"use client";
import { Fragment, useEffect, useState } from "react";
import Post from "../components/card/post";
import Loader from "../components/loader";
import { useRouter } from "next/navigation";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("http://localhost:8080/user/following/posts", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data.status === "fail") {
        router.push("/");
      } else {
        const allPost = [...data.posts.flat()];
        console.log(allPost);
        if (allPost.length !== 0) {
          setPosts(allPost);
        } else {
          try {
            const res = await fetch("http://localhost:8080/post/celeb");
            const posts = await res.json();
            setPosts(posts.postWithCeleb.slice(0, 3));
          } catch (error) {
            console.error("Error fetching data:", error);
            setPosts([]);
          }
        }
      }
    };
    getPost();
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <Fragment>
      <div className="border-2 border-elife-700  w-full pt-2 flex flex-col gap-2">
        <div className="text-center text-xl">Discover What's Trending </div>
        {posts.map((post: any, index) => (
          <Post
            username={post.username}
            key={index}
            data={post.data}
            type={post.type}
            date={new Date(post.customDate).toLocaleString()}
            isLoggedIn={true}
          ></Post>
        ))}
      </div>
    </Fragment>
  ) : (
    <Loader></Loader>
  );
};
export default Home;
