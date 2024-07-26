import LikeButton from "../components/LikeButton";
import ImageRender from "../components/ImageRender";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useUser } from "../hooks/useUser";

export default function SinglePostPage() {
  const { postId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any | null>(null);

  const { refresh } = useOutletContext<{
    refresh: () => void;
  }>();

  const user = useUser();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase()
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();
      if (error) {
        console.log(error);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [postId]);
  return (
    <div>
      <div className="flex gap-2 items-center w-full h-12 border-b-2 border-white/10 px-2 justify-center">
        <button className="absolute left-2" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <h1 className="text-2xl font-bold">Post</h1>
      </div>
      {post && (
        <div className="flex flex-col gap-2 w-full">
          <ImageRender json={post.img} height={post.height} />
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between mb-2">
              <LikeButton oldlikes={post.likes} postID={post.id} />
              <div className="flex gap-2">
                {/* <ShareIcon
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href + "post/" + post.id
                  );
                  alert("Link copied to clipboard");
                }}
              /> */}
                {post.author_id === user?.id && (
                  <Trash2Icon
                    onClick={() => {
                      handleDelete(post.id);
                      refresh();
                    }}
                    color="red"
                  />
                )}
              </div>
            </div>
            <p className="text-sm">{post.likes} Likes</p>
            <p>
              <strong>{post.author}</strong> - {post.title}
            </p>
            <p>{post.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}
