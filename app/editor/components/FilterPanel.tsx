"use client";

import React from "react";
import { useEditorStore } from "../store";

export default function FilterPanel() {
  const { triggerAction } = useEditorStore();

  const filters = [
    { id: "none", name: "原图" },
    { id: "sepia", name: "复古" },
    { id: "grayscale", name: "黑白" },
    { id: "blur", name: "模糊" },
    { id: "sharpen", name: "锐化" },
  ];

  return (
    <div className="p-4">
      <h3 className="text-white font-medium mb-4">滤镜</h3>
      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => triggerAction("FILTER_APPLY", { filter: filter.id })}
            className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md text-sm transition-colors text-left"
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
