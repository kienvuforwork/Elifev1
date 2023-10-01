"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";
import { AiOutlineUser, AiFillCheckCircle } from "react-icons/ai";
const Notification = () => {
  const notifications = useSelector(
    (state: RootState) => state.userSlice.notifications
  );
  console.log(notifications);
  return notifications ? (
    <div className="">
      <div className="text-center text-md mt-4 md:text-lg">Notifications</div>
      <div className="border-2 border-elife-700  w-full pt-2 flex flex-col gap-2">
        {notifications.map((item: any, index: number) => (
          <Link
            href={`/user/${item.username}`}
            key={index}
            className="hover:opacity-90 "
          >
            <div
              className={`flex items-center gap-4 p-4 border-b-2 border-elife-700 ${
                item.read && "bg-elife-700"
              } hover:opacity-90 cursor-pointer`}
            >
              {item.avatar ? (
                <img className="rounded-full w-10 h-10" src={item.avatar} />
              ) : (
                <div className="relative">
                  <AiOutlineUser className=" w-8 h-8 object-cover rounded-full fill-elife-700 border-2 border-elife-700"></AiOutlineUser>
                  {item.isCeleb && (
                    <AiFillCheckCircle className="w-3 h-3 right-0 absolute bottom-0  fill-blue-600"></AiFillCheckCircle>
                  )}
                </div>
              )}
              <div className="text-lg text-elife-600">
                {item.username} {item.message}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center pt-4 text-lg">
      You dont have any notifications!
    </div>
  );
};

export default Notification;
