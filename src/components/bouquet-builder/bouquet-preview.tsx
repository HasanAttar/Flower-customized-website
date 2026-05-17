"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { accessories, fillers, flowerOptions, ribbons, wrappers } from "@/lib/data/catalog";
import type { BouquetDesign } from "@/types/shop";

const Stage = dynamic(() => import("react-konva").then((mod) => mod.Stage), { ssr: false });
const Layer = dynamic(() => import("react-konva").then((mod) => mod.Layer), { ssr: false });
const KonvaImage = dynamic(() => import("react-konva").then((mod) => mod.Image), { ssr: false });

function useHtmlImage(src: string) {
  const [image, setImage] = React.useState<HTMLImageElement | undefined>();
  React.useEffect(() => {
    const nextImage = new window.Image();
    nextImage.crossOrigin = "anonymous";
    nextImage.src = src;
    nextImage.onload = () => setImage(nextImage);
  }, [src]);
  return image;
}

function PreviewAsset({ src, x, y, size }: { src: string; x: number; y: number; size: number }) {
  const image = useHtmlImage(src);
  return <KonvaImage image={image} x={x} y={y} width={size} height={size} listening={false} />;
}

export function BouquetPreview({ design }: { design: BouquetDesign }) {
  const layers = [
    ...wrappers.filter((item) => item.id === design.wrapperId),
    ...design.flowers.flatMap((selection, index) => {
      const option = flowerOptions.find((item) => item.id === selection.flowerVariantId);
      return option ? Array.from({ length: selection.quantity }, (_, count) => ({ ...option, key: `${option.id}-${index}-${count}` })) : [];
    }),
    ...fillers.filter((item) => design.fillerIds.includes(item.id)),
    ...ribbons.filter((item) => item.id === design.ribbonId),
    ...design.accessories.flatMap((selection) => {
      const option = accessories.find((item) => item.id === selection.accessoryId);
      return option ? Array.from({ length: selection.quantity }, (_, count) => ({ ...option, key: `${option.id}-${count}` })) : [];
    })
  ].sort((a, b) => a.layerOrder - b.layerOrder);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white to-rose-50 p-3 shadow-inner" aria-label="Live bouquet preview">
      <Stage width={500} height={500} className="mx-auto max-w-full overflow-hidden rounded-2xl">
        <Layer>
          {layers.map((layer, index) => <PreviewAsset key={`${layer.id}-${index}`} src={layer.imageUrl} x={0} y={0} size={500} />)}
        </Layer>
      </Stage>
    </div>
  );
}
