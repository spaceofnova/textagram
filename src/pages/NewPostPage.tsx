import Draggable from "react-draggable";
import { useUser } from "../hooks/useUser";
import { TextItem } from "../types/types";
import { Edit2Icon, SendIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import supabase from "../utils/supabase";
import { HexColorPicker } from "react-colorful";
import { useUserProfile } from "../hooks/useUserProfile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendData(json: any) {
  const { data, error } = await supabase().from("posts").insert(json);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

async function handleSubmit({
  textItems,
  background,
  title,
  body,
  username,
  author_id,
}: {
  textItems: TextItem[];
  background: string;
  title: string;
  body: string;
  username: string;
  author_id: string;
}) {
  const conf = confirm("Are you sure you want to post?");
  if (conf) {
    const newJson = {
      author_id: author_id,
      img: {
        backgroundColor: background,
        textItems: textItems,
      },
      author: username,
      title: title,
      body: body,
      height: 415,
    };
    console.log(newJson);
    await sendData(newJson).then(() => {
      window.location.href = "/";
    });
  } else {
    console.log("Cancelled");
  }
}

const ColorPicker = ({
  setBackground,
}: {
  setBackground: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HexColorPicker
        color={"#cc2c08"}
        onChange={setBackground}
        className="m-auto"
      />
    </div>
  );
};

const TextEditor = ({
  textItems,
  setTextItems,
}: {
  textItems: TextItem[];
  setTextItems: Dispatch<SetStateAction<TextItem[]>>;
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2 w-full h-full">
        {textItems &&
          textItems.map((item) => (
            <div
              key={item.text}
              className="flex gap-2 items-center"
              onClick={() => {
                const newText = prompt("Enter new text");
                if (newText) {
                  setTextItems(
                    textItems.map((t) =>
                      t.id === item.id ? { ...t, text: newText } : t
                    )
                  );
                }
              }}
            >
              <div className="w-full bg-white/20 p-2 rounded-md flex gap-2 items-center justify-between">
                <p>{item.text}</p>
                <Trash2Icon
                  onClick={() =>
                    setTextItems(textItems.filter((t) => t.id !== item.id))
                  }
                />
              </div>
            </div>
          ))}
        <div className="flex gap-2 items-center">
          <button
            className="bg-white/20 w-full rounded-md"
            onClick={() =>
              setTextItems([
                ...textItems,
                {
                  id: Math.random().toString(),
                  text: "Tap to edit",
                  color: "#000000",
                  position: [0, 0],
                  border: "none",
                  size: "100%",
                },
              ])
            }
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  );
};

const DescriptionEditor = ({
  title,
  setTitle,
  body,
  setBody,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}) => {
  const handleTitleChange = () => {
    const conf = prompt("Enter a new title");
    if (conf) {
      setTitle(conf);
    }
  };

  const handleBodyChange = () => {
    const conf = prompt("Enter a new description");
    if (conf) {
      setBody(conf);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full px-1 py-2">
      <h1
        className="text-2xl font-bold flex gap-2 w-full"
        onClick={handleTitleChange}
      >
        {title} <Edit2Icon size={12} color="rgba(255,255,255,0.5)" />
      </h1>

      <p
        className="text-xl flex gap-2 h-full w-full"
        onClick={handleBodyChange}
      >
        {body}
        <Edit2Icon size={12} color="rgba(255,255,255,0.5)" />
      </p>
    </div>
  );
};

export default function NewPostPage() {
  const { userProfile } = useUserProfile();
  const [background, setBackground] = useState<string>("#cc2c08");
  const [title, setTitle] = useState<string>("New Post");
  const [body, setBody] = useState<string>("This the description of the post");
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [height] = useState<number>(415);
  const [page, setPage] = useState<string>("Description");
  const user = useUser();

  const pages: Record<string, JSX.Element> = {
    "Text Editor": (
      <TextEditor textItems={textItems} setTextItems={setTextItems} />
    ),
    Colors: <ColorPicker setBackground={setBackground} />,
    Description: (
      <DescriptionEditor
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
      />
    ),
  };

  return (
    <div className="w-full h-[calc(100vh-6.2rem)] relative flex flex-col">
      <div
        className="w-[calc(100%-1rem)] relative m-2 rounded-xl"
        style={{
          background: background,
          maxHeight: height + "px",
          minHeight: height + "px",
        }}
      >
        {textItems.map((item) => (
          <Draggable
            key={item.text}
            defaultPosition={{ x: 200, y: 250 }}
            bounds="parent"
            defaultClassName="w-fit h-fit"
            onDrag={(_e, data) => {
              setTextItems(
                textItems.map((t) =>
                  t.text === item.text
                    ? {
                        ...t,
                        position: [(data.x / 400) * 100, (data.y / 500) * 100],
                      }
                    : t
                )
              );
            }}
          >
            <div
              style={{
                background: item.color,
                border: item.border,
                fontSize: item.size,
                padding: "6px",
                borderRadius: "5px",
              }}
            >
              {item.text}
            </div>
          </Draggable>
        ))}
      </div>
      <div className="flex flex-col gap-2 px-1 w-full h-1/2">
        <div className="flex gap-2 w-full h-10">
          <button
            className="w-full rounded-md border-white/20 border p-1 transition-colors duration-300 ease-out"
            style={{
              background:
                page === "Description"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0)",
            }}
            onClick={() => setPage("Description")}
          >
            Description
          </button>
          <button
            className="w-full rounded-md border-white/20 border p-1 transition-colors duration-300 ease-out"
            style={{
              background:
                page === "Colors" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0)",
            }}
            onClick={() => setPage("Colors")}
          >
            Colors
          </button>
          <button
            className="w-full rounded-md border-white/20 border p-1 transition-colors duration-300 ease-out"
            style={{
              background:
                page === "Text Editor"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0)",
            }}
            onClick={() => setPage("Text Editor")}
          >
            Text
          </button>
        </div>
        {page && (
          <div className="w-full h-full overflow-y-auto">{pages[page]}</div>
        )}
      </div>
      <div className="flex items-center justify-between w-fit gap-2 rounded-full h-12 p-4 bg-blue-800 absolute -bottom-10 right-2">
        Post
        <SendIcon
          onClick={() =>
            handleSubmit({
              textItems: textItems,
              background: background,
              title: title ?? "Untitled",
              body: body ?? "No body",
              username: userProfile?.username ?? "Anonymous",
              author_id: user?.id ?? "Anonymous",
            })
          }
        />
      </div>
    </div>
  );
}
