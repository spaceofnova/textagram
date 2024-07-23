import { RefreshCcw, ShareIcon, Trash2Icon } from "lucide-react";
import LikeButton from "../components/LikeButton";
import ImageRender from "../components/ImageRender";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { FetchData } from "../types/types";
import supabase from "../utils/supabase";
import { useUser } from "../hooks/useUser";
import { BarLoader } from "react-spinners";

export default function HomePage() {
  const { data, loading, refresh } = useOutletContext<{
    data: FetchData[];
    loading: boolean;
    refresh: () => void;
  }>();
  const user = useUser();
  const handleDelete = async (id: string) => {
    const conf = confirm("Are you sure you want to delete this post?");
    if (conf) {
      const { data, error } = await supabase()
        .from("posts")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <div className="no-scrollbar">
          <div className="p-2 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Textagram</h1>
            <p className="flex gap-2">
              v0.1.1
              <RefreshCcw onClick={refresh} color="hsl(200, 90%, 50%)" />
            </p>
          </div>
          {loading && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <BarLoader color="white" loading width={"100%"} />
            </m.div>
          )}
          {data.length > 0 && (
            <m.div
              className="flex flex-col gap-4 w-full"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {data &&
                data.map((item: FetchData) => (
                  <div key={item.id} className="flex flex-col gap-2 w-full">
                    <ImageRender json={item.img} height={item.height} />
                    <div className="flex flex-col px-2 py-1">
                      <div className="flex items-center justify-between mb-2">
                        <LikeButton likes={item.likes} />
                        <div className="flex gap-2 border-white/20 border rounded-md p-1 px-1 transition-colors duration-300 ease-out">
                          <ShareIcon
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.href + "post/" + item.id
                              );
                              alert("Link copied to clipboard");
                            }}
                          />
                          {item.author_id === user?.id && (
                            <Trash2Icon
                              onClick={() => {
                                handleDelete(item.id);
                                refresh();
                              }}
                              color="red"
                            />
                          )}
                        </div>
                      </div>
                      <p>
                        <strong>{item.author}</strong> - {item.title}
                      </p>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
            </m.div>
          )}
        </div>
      </AnimatePresence>
    </LazyMotion>
  );
}
