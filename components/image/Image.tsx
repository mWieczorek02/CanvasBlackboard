import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image as KonvaImage, Rect, Transformer } from "react-konva";
import useImage from "use-image";
// @ts-ignore

const Image: React.FC<{
  setDrag: Dispatch<SetStateAction<boolean>>;
  url: string;
}> = ({ setDrag, url }) => {
  const imageRef = useRef(null);
  const transformerRef = useRef<any>(null);
  const [select, setSelect] = useState(false);

  const [image] = useImage(url);

  const onSelect = () => {
    setSelect((prev: boolean) => !prev);
  };
  const onDrag = () => {
    setDrag((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (transformerRef.current != null) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [transformerRef, select]);

  return (
    <>
      <KonvaImage
        image={image}
        ref={imageRef}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={() => {
          setDrag(true);
          setSelect(true);
        }}
        onDragEnd={() => {
          setDrag(false);
          setSelect(false);
        }}
        onTransformStart={onDrag}
        onTransformEnd={onDrag}
        draggable
        style="cursor:pointer"
      ></KonvaImage>
      {select ? (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Image;
