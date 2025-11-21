import { create } from "zustand";

interface EditorState {
  image: string | null;
  setImage: (image: string | null, addToHistory?: boolean) => void;

  zoom: number;
  setZoom: (zoom: number) => void;
  activeTool: "crop" | "filter" | "adjust" | null;
  setActiveTool: (tool: "crop" | "filter" | "adjust" | null) => void;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  setAdjustment: (
    key: "brightness" | "contrast" | "saturation",
    value: number
  ) => void;
  resetAdjustments: () => void;
  editorAction: { type: string; payload?: any; id: number } | null;
  triggerAction: (type: string, payload?: any) => void;

  history: string[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  image: null,
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  setImage: (image, addToHistory = true) => {
    set((state) => {
      if (!image)
        return {
          image,
          history: [],
          historyIndex: -1,
          canUndo: false,
          canRedo: false,
        };

      if (addToHistory) {
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(image);
        return {
          image,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          canUndo: newHistory.length > 1,
          canRedo: false,
        };
      }
      return { image };
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const prevImage = history[newIndex];
      set({
        image: prevImage,
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextImage = history[newIndex];
      set({
        image: nextImage,
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < history.length - 1,
      });
    }
  },

  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
  activeTool: null,
  setActiveTool: (activeTool) => set({ activeTool }),
  adjustments: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
  },
  setAdjustment: (key, value) =>
    set((state) => ({
      adjustments: { ...state.adjustments, [key]: value },
    })),
  resetAdjustments: () =>
    set({
      adjustments: {
        brightness: 0,
        contrast: 0,
        saturation: 0,
      },
    }),
  editorAction: null,
  triggerAction: (type, payload) =>
    set({ editorAction: { type, payload, id: Date.now() } }),
}));
