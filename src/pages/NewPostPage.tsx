import Draggable from "react-draggable";
import { useUser } from "../hooks/useUser";
import { TextItem } from "../types/types";
import { ArrowLeftIcon, SendIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import supabase from "../utils/supabase";

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
      height: 500,
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
  const colors = [
    "#F44336",
    "#FFEBEE",
    "#FFCDD2",
    "#EF9A9A",
    "#E57373",
    "#EF5350",
    "#E53935",
    "#D32F2F",
    "#C62828",
    "#B71C1C",
    "#FF8A80",
    "#FF5252",
    "#FF1744",
    "#D50000",
    "#FCE4EC",
    "#F8BBD0",
    "#F48FB1",
    "#F06292",
    "#EC407A",
    "#E91E63",
    "#D81B60",
    "#C2185B",
    "#AD1457",
    "#880E4F",
    "#FF80AB",
    "#FF4081",
    "#F50057",
    "#C51162",
    "#F3E5F5",
    "#E1BEE7",
    "#CE93D8",
    "#BA68C8",
    "#AB47BC",
    "#9C27B0",
    "#8E24AA",
    "#7B1FA2",
    "#6A1B9A",
    "#4A148C",
    "#EA80FC",
    "#E040FB",
    "#D500F9",
    "#AA00FF",
    "#EDE7F6",
    "#D1C4E9",
    "#B39DDB",
    "#9575CD",
    "#7E57C2",
    "#673AB7",
    "#5E35B1",
    "#512DA8",
    "#4527A0",
    "#311B92",
    "#B388FF",
    "#7C4DFF",
    "#651FFF",
    "#6200EA",
    "#E8EAF6",
    "#C5CAE9",
    "#9FA8DA",
    "#7986CB",
    "#5C6BC0",
    "#3F51B5",
    "#3949AB",
    "#303F9F",
    "#283593",
    "#1A237E",
    "#8C9EFF",
    "#536DFE",
    "#3D5AFE",
    "#304FFE",
    "#E3F2FD",
    "#BBDEFB",
    "#90CAF9",
    "#64B5F6",
    "#42A5F5",
    "#2196F3",
    "#1E88E5",
    "#1976D2",
    "#1565C0",
    "#0D47A1",
    "#82B1FF",
    "#448AFF",
    "#2979FF",
    "#2962FF",
    "#E1F5FE",
    "#B3E5FC",
    "#81D4FA",
    "#4FC3F7",
    "#29B6F6",
    "#03A9F4",
    "#039BE5",
    "#0288D1",
    "#0277BD",
    "#01579B",
    "#80D8FF",
    "#40C4FF",
    "#00B0FF",
    "#0091EA",
    "#E0F7FA",
    "#B2EBF2",
    "#80DEEA",
    "#4DD0E1",
    "#26C6DA",
    "#00BCD4",
    "#00ACC1",
    "#0097A7",
    "#00838F",
    "#006064",
    "#84FFFF",
    "#18FFFF",
    "#00E5FF",
    "#00B8D4",
    "#E0F2F1",
    "#B2DFDB",
    "#80CBC4",
    "#4DB6AC",
    "#26A69A",
    "#009688",
    "#00897B",
    "#00796B",
    "#00695C",
    "#004D40",
    "#A7FFEB",
    "#64FFDA",
    "#1DE9B6",
    "#00BFA5",
    "#E8F5E9",
    "#C8E6C9",
    "#A5D6A7",
    "#81C784",
    "#66BB6A",
    "#4CAF50",
    "#43A047",
    "#388E3C",
    "#2E7D32",
    "#1B5E20",
    "#B9F6CA",
    "#69F0AE",
    "#00E676",
    "#00C853",
    "#F1F8E9",
    "#DCEDC8",
    "#C5E1A5",
    "#AED581",
    "#9CCC65",
    "#8BC34A",
    "#7CB342",
    "#689F38",
    "#558B2F",
    "#33691E",
    "#CCFF90",
    "#B2FF59",
    "#76FF03",
    "#64DD17",
    "#F9FBE7",
    "#F0F4C3",
    "#E6EE9C",
    "#DCE775",
    "#D4E157",
    "#CDDC39",
    "#C0CA33",
    "#AFB42B",
    "#9E9D24",
    "#827717",
    "#F4FF81",
    "#EEFF41",
    "#C6FF00",
    "#AEEA00",
    "#FFFDE7",
    "#FFF9C4",
    "#FFF59D",
    "#FFF176",
    "#FFEE58",
    "#FFEB3B",
    "#FDD835",
    "#FBC02D",
    "#F9A825",
    "#F57F17",
    "#FFFF8D",
    "#FFFF00",
    "#FFEA00",
    "#FFD600",
    "#FFF8E1",
    "#FFECB3",
    "#FFE082",
    "#FFD54F",
    "#FFCA28",
    "#FFC107",
    "#FFB300",
    "#FFA000",
    "#FF8F00",
    "#FF6F00",
    "#FFE57F",
    "#FFD740",
    "#FFC400",
    "#FFAB00",
    "#FFF3E0",
    "#FFE0B2",
    "#FFCC80",
    "#FFB74D",
    "#FFA726",
    "#FF9800",
    "#FB8C00",
    "#F57C00",
    "#EF6C00",
    "#E65100",
    "#FFD180",
    "#FFAB40",
    "#FF9100",
    "#FF6D00",
    "#FBE9E7",
    "#FFCCBC",
    "#FFAB91",
    "#FF8A65",
    "#FF7043",
    "#FF5722",
    "#F4511E",
    "#E64A19",
    "#D84315",
    "#BF360C",
    "#FF9E80",
    "#FF6E40",
    "#FF3D00",
    "#DD2C00",
    "#EFEBE9",
    "#D7CCC8",
    "#BCAAA4",
    "#A1887F",
    "#8D6E63",
    "#795548",
    "#6D4C41",
    "#5D4037",
    "#4E342E",
    "#3E2723",
    "#FAFAFA",
    "#F5F5F5",
    "#EEEEEE",
    "#E0E0E0",
    "#BDBDBD",
    "#9E9E9E",
    "#757575",
    "#616161",
    "#424242",
    "#212121",
    "#ECEFF1",
    "#CFD8DC",
    "#B0BEC5",
    "#90A4AE",
    "#78909C",
    "#607D8B",
    "#546E7A",
    "#455A64",
    "#37474F",
    "#263238",
    "#000000",
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {colors.map((color) => (
        <button
          key={color}
          className="min-h-10 min-w-10 rounded-md bg-white/20 overflow-hidden"
          onClick={() => setBackground(color)}
          style={{
            background: color,
          }}
        />
      ))}
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
            <div key={item.text} className="flex gap-2 items-center">
              <div className="w-full bg-white/20 p-2 rounded-md flex gap-2 items-center justify-between">
                <p
                  onClick={() => {
                    const newText = prompt("Enter new text");
                    if (newText) {
                      setTextItems(
                        textItems.map((t) =>
                          t.text === item.text ? { ...t, text: newText } : t
                        )
                      );
                    }
                  }}
                >
                  {item.text}
                </p>
                <Trash2Icon
                  onClick={() =>
                    setTextItems(textItems.filter((t) => t.text !== item.text))
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

export default function NewPostPage() {
  const [background, setBackground] = useState<string>("#cc2c08");
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [height] = useState<number>(500);
  const [page, setPage] = useState<string>();
  const user = useUser();

  const pages: Record<string, JSX.Element> = {
    "Text Editor": (
      <TextEditor textItems={textItems} setTextItems={setTextItems} />
    ),
    Colors: <ColorPicker setBackground={setBackground} />,
  };

  const handleBodyChange = () => {
    const value = prompt("Enter new body text");
    if (value) {
      setBody(value);
    } else {
      console.log("Cancelled");
    }
  };

  const handleTitleChange = () => {
    const value = prompt("Enter new title");
    if (value) {
      setTitle(value);
    } else {
      console.log("Cancelled");
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="flex items-center justify-between w-full h-12 p-2 bg-background pb-0">
        <h1 className="text-xl font-bold">{title ?? "New Post"}</h1>
        <SendIcon
          color="hsl(200, 90%, 50%)"
          onClick={() =>
            handleSubmit({
              textItems: textItems,
              background: background,
              title: title ?? "Untitled",
              body: body ?? "No body",
              username: user?.user_metadata.username ?? "Anonymous",
              author_id: user?.id ?? "Anonymous",
            })
          }
        />
      </div>
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
            defaultPosition={{ x: 12, y: 12 }}
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
      <div className="flex flex-col gap-2 p-2 w-full h-full">
        {page ? (
          <div>
            <button
              onClick={() => setPage("")}
              className="flex gap-2 items-center"
            >
              <ArrowLeftIcon size={36} />
              <h2 className="text-xl font-bold">Back</h2>
            </button>
            <div className="w-full max-h-72 overflow-y-auto">{pages[page]}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full h-full">
            <div>Description: {body ?? "No body text yet"}</div>
            <div className="flex gap-2 w-full">
              <button
                className="bg-white/20 w-full rounded-md"
                onClick={handleTitleChange}
              >
                Edit Title
              </button>
              <button
                className="bg-white/20 w-full rounded-md"
                onClick={handleBodyChange}
              >
                Edit Body
              </button>
            </div>
            <div className="flex w-full h-full gap-2">
              <button
                className="w-full h-full bg-white/20 rounded-md"
                onClick={() => setPage("Colors")}
              >
                Background Color
              </button>
              <button
                className="w-full h-full bg-white/20 rounded-md"
                onClick={() => setPage("Text Editor")}
              >
                Text Editor
              </button>
            </div>
            {/* <div className="flex w-full h-full gap-2">
                <button className="w-full h-full bg-white/20 rounded-md">
                  Color Picker
                </button>
                <button className="w-full h-full bg-white/20 rounded-md">
                  Text Picker
                </button>
              </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
