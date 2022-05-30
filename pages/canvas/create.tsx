import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Stage, Layer, Line, Text, KonvaNodeComponent } from "react-konva";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { useEventListener } from "../../hooks/useEventListener";
const Create: NextPage = () => {
  const [tool, setTool] = useState<string>("pen");
  const [lines, setLines] = useState<any[]>([]);
  const [newLine, setNewLine] = useState<any[]>([]);
  const [isPanning, setPanning] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#FFFFFF");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const stage = useRef(null);

  const isDrawing = useRef<boolean>(false);

  // const handlePointerDown = (e: any) => {
  //   console.log("dupa");
  //   isDrawing.current = true;
  //   const pos = e.target.getStage().getRelativePointerPosition();
  //   setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  // };

  // const handlePointerUp = () => {
  //   isDrawing.current = false;
  //   setPanning(true);
  // };

  useEventListener<HTMLDivElement, React.KeyboardEvent<HTMLElement>>(
    "keydown",
    async (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key == "z" && e.ctrlKey) {
        setLines(lines.splice(0, lines.length - 2));
      }
    }
  );

  const handleMouseDown = (e: any) => {
    if (e.evt.button == 1) {
      setPanning(true);
      return;
    }
    setPanning(false);
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    //setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth, color }]);
    setNewLine([{ tool, points: [pos.x, pos.y], strokeWidth, color }]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getRelativePointerPosition();
    let [lastLine]: any = newLine;
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // // replace last
    // lines.splice(lines.length - 1, 1, lastLine);
    // setLines(lines.concat());
    setNewLine((prev) => {
      return [lastLine];
    });
  };

  const handleMouseUp = (e: any) => {
    isDrawing.current = false;
    setPanning((prev) => !prev);
    setLines([...lines, ...newLine]);
    //setNewLine(null);
  };

  const drawLines = useMemo(() => {
    console.log("rerendered");
    return lines.map((line, i) => (
      <Line
        key={i}
        points={line.points}
        stroke={color}
        strokeWidth={line.strokeWidth}
        tension={0.5}
        lineCap="round"
        globalCompositeOperation={
          line.tool === "eraser" ? "destination-out" : "source-over"
        }
      />
    ));
  }, [lines]);

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
              key={i}
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
          {/* <NewLine
            stage={stage}
            setPanning={setPanning}
            isDrawing={isDrawing}
            tool={"pen"}
            strokeWidth={1}
            color={"red"}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Create;
