import { useUserProfile } from "@/hooks/useUserProfile";
import { AnimatePresence, m } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function LikeButton({
  oldlikes,
  postID,
}: {
  oldlikes: number;
  postID: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesValue, setLikesValue] = useState(oldlikes);
  const { userProfile } = useUserProfile();

  useEffect(() => {
    setLikesValue(oldlikes);
    const userHasLiked = () => {
      const isLiked = userProfile?.likes.includes(postID);
      return isLiked === true ? true : false;
    };

    if (userHasLiked()) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [oldlikes]);

  const handleLike = async () => {
    if (isLiked) {
      setLikesValue(likesValue - 1);
      setIsLiked(false);
      // const { error } = await supabase()
      //   .from("profiles")
      //   .update({
      //     likes: likes?.filter((id) => id === postID),
      //   })
      //   .eq("uuid", user?.id);

      // if (error) {
      //   console.log(error);
      //   alert("Error UnLiking this post:" + error.message);
      //   setLikesValue(likesValue + 1);
      //   setIsLiked(true);
      // }
    } else if (!isLiked) {
      setLikesValue(likesValue + 1);
      setIsLiked(true);
      // const likes = userProfile?.likes;
      // console.log(JSON.stringify(likes?.concat(postID)));
      // const { error } = await supabase()
      //   .from("profiles")
      //   .update({
      //     likes: likes?.concat(postID),
      //   })
      //   .eq("uuid", user?.id);

      // if (error) {
      //   console.log(error);
      //   alert("Error Liking this post:" + error.message);

      //   setLikesValue(likesValue - 1);
      //   setIsLiked(false);
      // }
    }
  };
  return (
    <AnimatePresence mode="wait">
      <div
        onClick={() => handleLike()}
        className={
          "flex items-center justify-center gap-2 border-white/20 border rounded-md p-1 px-2 transition-all duration-300 ease-out" +
          (isLiked ? " bg-red-500/20 border-red-500" : "")
        }
      >
        {isLiked ? (
          <m.div
            className="flex items-center justify-center"
            initial={false}
            animate={{ scale: [0.5, 1], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <HeartIcon fill="red" color="red" />
          </m.div>
        ) : (
          <m.div
            className="flex items-center justify-center"
            initial={false}
            animate={{ scale: [0.5, 1.000000001], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <HeartIcon />
          </m.div>
        )}
        {likesValue > 0 && <p className="text-md">{likesValue}</p>}
      </div>
    </AnimatePresence>
  );
}
