export interface TextItem {
  text: string;
  color: string;
  position: [number, number];
  border: string;
  size: string;
}

export interface renderObject {
  backgroundColor: string;
  textItems: TextItem[];
}

export interface FetchData {
  author_id: string;
  id: string;
  author: string;
  title: string;
  body: string;
  img: renderObject;
  likes: number;
  height: number;
}
