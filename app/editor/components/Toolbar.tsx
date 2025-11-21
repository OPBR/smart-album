"use client";

import React from "react";
import {
  Crop,
  Sliders,
  Image as ImageIcon,
  Download,
  Upload,
  Undo,
  Redo,
} from "lucide-react";
import { useEditorStore } from "../store";
import { clsx } from "clsx";

export default function Toolbar() {
  const {
    activeTool,
    setActiveTool,
    image,
    setImage,
    undo,
    redo,
    canUndo,
    canRedo,
    triggerAction,
  } = useEditorStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-16 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition-colors">
          <Upload size={18} />
          <span className="text-sm font-medium">打开图片</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <div className="w-px h-8 bg-neutral-800 mx-2" />

        <button
          onClick={undo}
          disabled={!canUndo}
          className={clsx(
            "p-2 rounded-md transition-colors",
            canUndo
              ? "text-neutral-200 hover:bg-neutral-800"
              : "text-neutral-600 cursor-not-allowed"
          )}
          title="撤销"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={clsx(
            "p-2 rounded-md transition-colors",
            canRedo
              ? "text-neutral-200 hover:bg-neutral-800"
              : "text-neutral-600 cursor-not-allowed"
          )}
          title="重做"
        >
          <Redo size={20} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setActiveTool("crop")}
          disabled={!image}
          className={clsx(
            "p-3 rounded-md transition-colors",
            activeTool === "crop"
              ? "bg-neutral-800 text-blue-400"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
            !image && "opacity-50 cursor-not-allowed"
          )}
          title="裁剪"
        >
          <Crop size={20} />
        </button>
        <button
          onClick={() => setActiveTool("filter")}
          disabled={!image}
          className={clsx(
            "p-3 rounded-md transition-colors",
            activeTool === "filter"
              ? "bg-neutral-800 text-blue-400"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
            !image && "opacity-50 cursor-not-allowed"
          )}
          title="滤镜"
        >
          <ImageIcon size={20} />
        </button>
        <button
          onClick={() => setActiveTool("adjust")}
          disabled={!image}
          className={clsx(
            "p-3 rounded-md transition-colors",
            activeTool === "adjust"
              ? "bg-neutral-800 text-blue-400"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
            !image && "opacity-50 cursor-not-allowed"
          )}
          title="调节"
        >
          <Sliders size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => triggerAction("EXPORT")}
          disabled={!image}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md transition-colors",
            !image && "opacity-50 cursor-not-allowed"
          )}
        >
          <Download size={18} />
          <span className="text-sm font-medium">导出</span>
        </button>
      </div>
    </div>
  );
}
