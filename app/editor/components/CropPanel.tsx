"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { useEditorStore } from "../store";

export default function CropPanel() {
  const { triggerAction, setActiveTool } = useEditorStore();

  const handleApply = () => {
    triggerAction("CROP_APPLY");
    // Do not close tool here, let CanvasWorkspace handle it or user close it.
    // Or just close it here if we are sure CanvasWorkspace will pick up the action first?
    // No, store updates are synchronous but effects are not.
    // Best to let CanvasWorkspace close it, OR just keep it open.
    // For now, I removed the close call to avoid the race condition.
  };

  const handleCancel = () => {
    triggerAction("CROP_CANCEL");
    setActiveTool(null);
  };

  return (
    <div className="p-4">
      <h3 className="text-white font-medium mb-4">裁剪图片</h3>
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          <Check size={18} />
          应用
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-md transition-colors"
        >
          <X size={18} />
          取消
        </button>
      </div>
      <p className="text-neutral-500 text-xs mt-4">
        拖动方框角落以调整裁剪区域。
      </p>
    </div>
  );
}
