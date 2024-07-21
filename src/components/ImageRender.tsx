interface textItem {
  text: string;
  color: string;
  position: [number, number];
  border: string;
  size: string;
}

interface renderObject {
  backgroundColor: string;
  textItems: textItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageRender({ json }: { json: renderObject }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: json.backgroundColor }}
    >
      {json.textItems.map((item) => (
        <div
          key={item.text}
          className="absolute"
          style={{
            top: `${item.position[1]}%`,
            left: `${item.position[0]}%`,
            background: item.color,
            border: item.border,
            fontSize: item.size,
            padding: "6px",
            borderRadius: "5px",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
