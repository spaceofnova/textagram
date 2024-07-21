import { AnimatePresence, m } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isLiked ? (
        <m.div
          className="flex items-center justify-center"
          initial={false}
          animate={{ scale: [0.5, 1], opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={() => setIsLiked(!isLiked)}
        >
          <HeartIcon fill="white" />
        </m.div>
      ) : (
        <m.div
          className="flex items-center justify-center"
          initial={false}
          animate={{ scale: [0.5, 1.000000001], opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={() => setIsLiked(!isLiked)}
        >
          <HeartIcon fill="" />
        </m.div>
      )}
    </AnimatePresence>
  );
}
