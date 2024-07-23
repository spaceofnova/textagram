import { handleLogout } from "../utils/login";
import { useUserProfile } from "../hooks/useUserProfile";
import { FetchData } from "../types/types";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useUser } from "../hooks/useUser";
import { HashLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = useUser();
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FetchData[] | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        const { data, error } = await supabase()
          .from("posts")
          .select("*")
          .eq("author_id", user?.id);
        if (error) {
          return console.log(error);
        }
        setPosts(data);
        setPostsLoading(false);
      };
      fetchPosts();
    }
  }, [user]);
  return (
    <>
      <div className="w-full h-12 flex justify-evenly bg-background border-b-[0.01rem] border-white/20 items-center font-bold">
        The profile page is in BETA and will be updated soon
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-4 w-full p-2 items-center">
          <div>
            <img
              src={"https://via.placeholder.com/500/500"} // userProfile?.avatar.small
              alt="avatar"
              className="w-20 h-20 rounded-full aspect-square"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl">{userProfile?.username ?? "Loading..."}</p>
            <div className="flex gap-2 w-full">
              <Link
                to="/profile/edit"
                className=" bg-white/10 rounded-md p-1 px-4"
              >
                Edit Profile
              </Link>
              <button
                className=" bg-white/10 rounded-md p-1 px-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-2 py-1">
          <div className="flex gap-1 items-center">
            <h1 className="font-bold">
              {userProfile?.display_name ?? userProfile?.username}
            </h1>
            <span className="text-gray-500 text-xs">
              {userProfile?.pronouns ?? ""}
            </span>
          </div>

          {userProfile?.bio}
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className="w-full flex items-center justify-evenly">
          <div className="flex flex-col items-center">
            {posts?.length ?? 0} <p className="text-xs">Posts</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className="w-full h-full">
          {posts?.map((post) => (
            <div
              className="w-full flex flex-col gap-2 px-2 py-1"
              key={post.id}
              onClick={() => {
                navigate("/post/" + post.id);
              }}
            >
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full aspect-square">
                  <img
                    src={"https://via.placeholder.com/500/500"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full aspect-square"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{post.title}</p>
                </div>
              </div>
            </div>
          ))}
          {posts?.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-sm">No posts yet</p>
            </div>
          )}
          {postsLoading && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <HashLoader loading color={"currentColor"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
