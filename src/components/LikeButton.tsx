import { AnimatePresence, m } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function LikeButton({ likes }: { likes: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesValue, setLikesValue] = useState(likes);

  useEffect(() => {
    setLikesValue(likes);
  }, [likes]);

  useEffect(() => {
    if (isLiked) {
      setLikesValue(likes + 1);
    } else {
      setLikesValue(likes);
    }
  }, [isLiked, likes]);
  return (
    <AnimatePresence mode="wait">
      <div
        onClick={() => setIsLiked(!isLiked)}
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
