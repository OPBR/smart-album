"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // v6 import
import { useEditorStore } from "../store";

export default function CanvasWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const { image, activeTool, editorAction, triggerAction } = useEditorStore();
  const cropRectRef = useRef<fabric.Rect | null>(null);

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: "#1e1e1e", // Dark background
      selection: false,
    });

    setFabricCanvas(canvas);

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && canvas) {
        canvas.setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        canvas.renderAll();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      canvas.dispose();
    };
  }, []);

  // Load Image
  useEffect(() => {
    if (!fabricCanvas || !image) return;

    fabric.FabricImage.fromURL(image)
      .then((img) => {
        fabricCanvas.clear();
        fabricCanvas.backgroundColor = "#1e1e1e";

        // Scale image to fit canvas
        const canvasWidth = fabricCanvas.width || 800;
        const canvasHeight = fabricCanvas.height || 600;
        const scale = Math.min(
          (canvasWidth * 0.9) / img.width!,
          (canvasHeight * 0.9) / img.height!
        );

        img.scale(scale);
        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: "center",
          originY: "center",
          selectable: false, // For now, just viewing
          evented: false,
        });

        fabricCanvas.add(img);
        fabricCanvas.renderAll();
      })
      .catch((err) => {
        console.error("Error loading image:", err);
      });
  }, [fabricCanvas, image]);

  // Handle Crop Mode
  useEffect(() => {
    if (!fabricCanvas) return;

    if (activeTool === "crop") {
      // Add Crop Rect
      const objects = fabricCanvas.getObjects();
      const mainImage = objects.find((obj) => obj.type === "image");

      if (mainImage) {
        // Remove existing if any
        if (cropRectRef.current) {
          fabricCanvas.remove(cropRectRef.current);
        }

        const rect = new fabric.Rect({
          left: mainImage.left,
          top: mainImage.top,
          width: mainImage.getScaledWidth(),
          height: mainImage.getScaledHeight(),
          fill: "rgba(0,0,0,0.3)",
          stroke: "#fff",
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          cornerColor: "#fff",
          cornerSize: 10,
          transparentCorners: false,
          originX: "center",
          originY: "center",
          lockRotation: true,
          uniformScaling: false, // Allow free resizing
        });

        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(rect);
        cropRectRef.current = rect;
        fabricCanvas.renderAll();
      }
    } else {
      // Remove Crop Rect if exists
      if (cropRectRef.current) {
        fabricCanvas.remove(cropRectRef.current);
        cropRectRef.current = null;
        fabricCanvas.renderAll();
      }
    }
  }, [activeTool, fabricCanvas]);

  // Handle Editor Actions
  useEffect(() => {
    if (!editorAction || !fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    const mainImage = objects.find(
      (obj) => obj.type === "image"
    ) as fabric.Image;

    if (editorAction.type === "CROP_APPLY") {
      const cropRect = cropRectRef.current;

      if (cropRect && mainImage) {
        const cropLeft =
          cropRect.left! - (cropRect.width! * cropRect.scaleX!) / 2;
        const cropTop =
          cropRect.top! - (cropRect.height! * cropRect.scaleY!) / 2;
        const cropWidth = cropRect.width! * cropRect.scaleX!;
        const cropHeight = cropRect.height! * cropRect.scaleY!;

        const dataUrl = fabricCanvas.toDataURL({
          left: cropLeft,
          top: cropTop,
          width: cropWidth,
          height: cropHeight,
          format: "png",
          multiplier: 2, // Higher quality
        });

        useEditorStore.getState().setImage(dataUrl);
        useEditorStore.getState().setActiveTool(null);
      }
    } else if (editorAction.type === "FILTER_APPLY") {
      const filterName = editorAction.payload.filter;

      if (mainImage) {
        mainImage.filters = [];

        if (filterName === "sepia") {
          mainImage.filters.push(new fabric.filters.Sepia());
        } else if (filterName === "grayscale") {
          mainImage.filters.push(new fabric.filters.Grayscale());
        } else if (filterName === "blur") {
          mainImage.filters.push(new fabric.filters.Blur({ blur: 0.5 }));
        } else if (filterName === "sharpen") {
          mainImage.filters.push(
            new fabric.filters.Convolute({
              matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            })
          );
        }

        mainImage.applyFilters();
        fabricCanvas.renderAll();
      }
    } else if (editorAction.type === "ADJUST_UPDATE") {
      const { brightness, contrast, saturation } = editorAction.payload;

      if (mainImage) {
        mainImage.filters = mainImage.filters.filter(
          (f) =>
            !(f instanceof fabric.filters.Brightness) &&
            !(f instanceof fabric.filters.Contrast) &&
            !(f instanceof fabric.filters.Saturation)
        );

        if (brightness !== 0) {
          mainImage.filters.push(new fabric.filters.Brightness({ brightness }));
        }
        if (contrast !== 0) {
          mainImage.filters.push(new fabric.filters.Contrast({ contrast }));
        }
        if (saturation !== 0) {
          mainImage.filters.push(new fabric.filters.Saturation({ saturation }));
        }

        mainImage.applyFilters();
        fabricCanvas.renderAll();
      }
    } else if (editorAction.type === "EXPORT") {
      const dataUrl = fabricCanvas.toDataURL({
        format: "png",
        multiplier: 2,
        quality: 1,
      });

      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [editorAction, fabricCanvas]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-neutral-900 relative overflow-hidden"
    >
      <canvas ref={canvasRef} />
      {!image && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 pointer-events-none">
          <p>上传图片开始编辑</p>
        </div>
      )}
    </div>
  );
}
