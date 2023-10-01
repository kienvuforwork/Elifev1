"use client";
import UserCard from "@/app/components/card/userCard";
import { usePathname } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import { User } from "@/app/Model/User";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SwitchBar from "@/app/components/rightBar/switchBar";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "@/app/components/loader";
import Post from "@/app/components/card/post";
import Link from "next/link";
import toast from "react-hot-toast";
const UserProfile = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User>();
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isPost, setIsPost] = useState(true);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollwing] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const pathNameList = pathname.split("/");
  const username = pathNameList[pathNameList.length - 1];

  const handleFollowingTab = () => {
    setIsFollwing(true);
    setIsFollower(false);
    setIsPost(false);
  };
  const handleFollowerTab = () => {
    setIsFollwing(false);
    setIsFollower(true);
    setIsPost(false);
  };
  const handlePostTab = () => {
    setIsFollwing(false);
    setIsFollower(false);
    setIsPost(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${username}`);
        const data = await res.json();
        setUser(data[0]);
        setIsLoadingUser(false);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/post/user/${username}`);
        const data = await res.json();
        setPosts(data.postWithData);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchFollowing = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/user/${username}/following`
        );
        const data = await res.json();
        setFollowing(data.following);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchFollower = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/user/${username}/follower`
        );
        const data = await res.json();

        setFollower(data.followers);
        setIsLoading(false);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchFollower();
    fetchFollowing();
    fetchPost();
    fetchUser();
  }, []);
  const currentUser = useSelector((state: RootState) => state.userSlice);
  const onDelete = async (id: string) => {
    setIsLoading(true);
    const updatedPost = posts.filter((post: any) => post._id !== id);
    setPosts(updatedPost);
    const res = await fetch(`http://localhost:8080/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res) {
      toast.success("Deleted a post!");
      setIsLoading(false);
    }
  };
  return !isLoadingUser ? (
    <Fragment>
      <div className="h-1000 border-2 border-elife-700">
        {" "}
        <UserCard
          user={user as User}
          isCurrentUser={currentUser.username === user?.username}
          currentUser={currentUser}
        ></UserCard>
        <SwitchBar
          onSetFollower={handleFollowerTab}
          onSetFollowing={handleFollowingTab}
          onSetPost={handlePostTab}
        ></SwitchBar>
        {!isLoading ? (
          isPost && (
            <div className="w-full flex flex-wrap">
              {posts.length > 0 ? (
                posts?.map((post: any, index) => (
                  <Post
                    username={post.username}
                    data={post.data}
                    date={new Date(post.customDate).toLocaleString()}
                    key={index}
                    avatar={user?.avatar}
                    type={post.type}
                    onDelete={() => onDelete(post._id)}
                    isCeleb={user?.isCeleb}
                  ></Post>
                ))
              ) : (
                <div className="text-elife-600 text-center w-full pt-4">
                  Stay tune, {username} is searching something!
                </div>
              )}
            </div>
          )
        ) : (
          <Loader></Loader>
        )}
        {!isLoading
          ? isFollower &&
            (follower.length > 0 ? (
              follower.map((follower: User, index: number) => (
                <Link href={`/user/${follower.username}`} key={index}>
                  {" "}
                  <div
                    className="flex cursor-pointer items-center pl-6 p-2 border-t-2 border-elife-700 hover:bg-elife-700"
                    key={follower.username}
                  >
                    {follower.avatar ? (
                      <img
                        src={follower.avatar}
                        className="w-8 h-8 rounded-full"
                      ></img>
                    ) : (
                      <AiOutlineUser className=" w-8 h-8 object-cover rounded-full fill-elife-500 border-2 border-elife-500"></AiOutlineUser>
                    )}
                    <span className="ml-6">{follower.username}</span>
                  </div>{" "}
                </Link>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-elife-600 pt-4 gap-2">
                {" "}
                {username} not follow anyone yet{" "}
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/parakeet/48/sad.png"
                  alt="sad"
                />{" "}
              </div>
            ))
          : ""}
        {!isLoading
          ? isFollowing &&
            (following.length > 0 ? (
              following.map((following: User, index: number) => (
                <Link href={`/user/${following.username}`} key={index}>
                  {" "}
                  <div
                    className="flex cursor-pointer items-center pl-6 p-2 border-t-2 border-elife-700 hover:bg-elife-700"
                    key={following.username}
                  >
                    {following.avatar ? (
                      <img
                        src={following.avatar}
                        className="w-8 h-8 rounded-full"
                      ></img>
                    ) : (
                      <AiOutlineUser className=" w-8 h-8 object-cover rounded-full fill-elife-500 border-2 border-elife-500"></AiOutlineUser>
                    )}
                    <span className=" ml-6">{following.username}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-elife-600 pt-4 gap-2">
                {" "}
                No one follow {username} yet{" "}
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/parakeet/48/sad.png"
                  alt="sad"
                />{" "}
              </div>
            ))
          : ""}
      </div>
    </Fragment>
  ) : (
    <Loader></Loader>
  );
};

export default UserProfile;
