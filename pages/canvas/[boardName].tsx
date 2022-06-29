/* eslint-disable jsx-a11y/alt-text */
import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  SyntheticEvent,
} from "react";
import { Stage, Layer, Line, Text, KonvaNodeComponent } from "react-konva";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { useEventListener } from "../../hooks/useEventListener";
import Image from "../../components/image/Image";
import { LineType, ImageType, BoardsType } from "../../interfaces/index";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Create: NextPage = () => {
  const router = useRouter();
  const { boardName } = router.query;

  const { value, setValue } = useLocalStorage<BoardsType>("boards");
  const [tool, setTool] = useState<string>("pen");
  const [elements, setElements] = useState<(LineType | ImageType)[]>(() => {
    if (!boardName) return [];
    return value[boardName as string];
  });
  const [newLine, setNewLine] = useState<LineType[]>([]);
  const [isPanning, setPanning] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#FFFFFF");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const stage = useRef<any>(null);
  const [drag, setDrag] = useState(false);

  const isDrawing = useRef<boolean>(false);

  useEventListener<HTMLDivElement, React.KeyboardEvent<HTMLElement>>(
    "keydown",
    async (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key == "z" && e.ctrlKey) {
        setElements(() => {
          return elements.splice(0, elements.length - 2);
        });
        setValue({ ...value, [boardName as string]: [...elements] });
      }
    }
  );
  type item = {
    type: string;
    getAsFile: () => File;
  };

  useEventListener<HTMLDivElement, any>("paste", (e: React.ClipboardEvent) => {
    const clipboardItems = e.clipboardData.items;
    const items: item[] = [].slice
      .call(clipboardItems)
      .filter(function (item: item) {
        return item.type.indexOf("image") !== -1;
      });
    if (items.length === 0) {
      return;
    }

    const item = items[0];
    const blob = item.getAsFile();
    setElements((prev) => [
      ...prev,
      { url: URL.createObjectURL(blob), x: 0, y: 0 },
    ]);
  });

  const handleMouseDown = (e: any) => {
    if (e.evt.button == 1) {
      setPanning(true);
      return;
    }
    setPanning(false);
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    setNewLine([{ tool, points: [pos.x, pos.y], strokeWidth, color }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || drag) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getRelativePointerPosition();
    let [lastLine]: any = newLine;

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setNewLine((prev) => {
      return [lastLine];
    });
  };

  const handleMouseUp = (e: any) => {
    isDrawing.current = false;
    setPanning((prev) => !prev);
    setNewLine([]);
    setElements([...elements, ...newLine]);
    setValue({ ...value, [boardName as string]: [...elements] });
  };

  const drawLines = useMemo(() => {
    console.log("rerendered");
    return elements.map((line, i) =>
      "tool" in line ? (
        <Line
          key={i}
          points={line.points}
          stroke={line.color}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          globalCompositeOperation={
            line.tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ) : (
        <Image setDrag={setDrag} url={line.url} />
      )
    );
  }, [elements]);

  return (
    <div className={styles.stage}>
      <Toolbar
        strokeColor={color}
        strokeWidth={strokeWidth}
        setTool={setTool}
        setStrokeColor={setColor}
        setStrokeWidth={setStrokeWidth}
      />
      <Stage
        ref={stage}
        onContextMenu={(e: any) => e.evt.preventDefault()}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
        onPointerMove={handleMouseMove}
        draggable={isPanning}
      >
        <Layer>
          {drawLines}
          {newLine.map((line, i) => (
            <Line
              key={line.points[0]}
              points={line.points}
              stroke={color}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Create;
