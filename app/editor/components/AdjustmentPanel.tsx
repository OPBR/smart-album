"use client";

import React from "react";
import { useEditorStore } from "../store";

export default function AdjustmentPanel() {
  const { adjustments, setAdjustment, triggerAction } = useEditorStore();

  const handleChange = (
    key: "brightness" | "contrast" | "saturation",
    value: number
  ) => {
    setAdjustment(key, value);
    triggerAction("ADJUST_UPDATE", { ...adjustments, [key]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-white font-medium mb-4">调节</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>亮度</span>
          <span>{adjustments.brightness.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={adjustments.brightness}
          onChange={(e) =>
            handleChange("brightness", parseFloat(e.target.value))
          }
          className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>对比度</span>
          <span>{adjustments.contrast.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={adjustments.contrast}
          onChange={(e) => handleChange("contrast", parseFloat(e.target.value))}
          className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>饱和度</span>
          <span>{adjustments.saturation.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={adjustments.saturation}
          onChange={(e) =>
            handleChange("saturation", parseFloat(e.target.value))
          }
          className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
