"use client";

import React from "react";
import CanvasWorkspace from "./components/CanvasWorkspace";
import Toolbar from "./components/Toolbar";
import CropPanel from "./components/CropPanel";
import FilterPanel from "./components/FilterPanel";
import AdjustmentPanel from "./components/AdjustmentPanel";
import { useEditorStore } from "./store";

export default function EditorPage() {
  const { activeTool } = useEditorStore();

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="h-12 border-b border-neutral-800 flex items-center px-4 bg-neutral-900">
        <h1 className="text-sm font-semibold text-neutral-200">照片编辑器</h1>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Center: Canvas */}
        <div className="flex-1 relative min-w-0">
          <CanvasWorkspace />
        </div>

        {/* Right: Tool Panels */}
        {activeTool && (
          <div className="w-80 flex-shrink-0 border-l border-neutral-800 bg-neutral-900 p-4">
            {activeTool === "crop" && <CropPanel />}
            {activeTool === "filter" && <FilterPanel />}
            {activeTool === "adjust" && <AdjustmentPanel />}
          </div>
        )}
      </div>

      {/* Bottom: Toolbar */}
      <Toolbar />
    </div>
  );
}
