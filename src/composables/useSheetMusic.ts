import { reactive } from "vue";
import type { SheetMusicState, BackendType, PageFormat } from "@/types/osmd";

export function useSheetMusic() {
  const state = reactive<SheetMusicState>({
    osmdInstance: null,
    zoom: 1,
    isDarkMode: false,
    backendType: "svg",
    pageFormat: "Endless",
    showCursor: false,
    cursorIndex: 0,
    followCursor: false,
    transposition: 0,
    minMeasureToDraw: 1,
    maxMeasureToDraw: 9007199254740991,
    showBoundingBox: "none",
    drawSkyline: false,
    drawBottomline: false,
    isLoading: false,
    error: null,
  });

  // Zoom controls
  const zoomIn = () => {
    if (state.zoom < 5) {
      state.zoom = Math.min(state.zoom + 0.1, 5);
      updateZoom();
    }
  };

  const zoomOut = () => {
    if (state.zoom > 0.1) {
      state.zoom = Math.max(state.zoom - 0.1, 0.1);
      updateZoom();
    }
  };

  const setZoom = (zoomLevel: number) => {
    if (zoomLevel > 0.1 && zoomLevel < 5) {
      state.zoom = zoomLevel;
      updateZoom();
    }
  };

  const updateZoom = () => {
    const osmd = state.osmdInstance;
    if (osmd) {
      osmd.Zoom = state.zoom;
      try {
        osmd.render();
      } catch (e) {
        console.error("Render error:", e);
        state.error = `Failed to render with zoom ${state.zoom}`;
      }
    }
  };

  // Cursor controls
  const showCursor = () => {
    state.showCursor = true;
    state.osmdInstance?.cursor?.show();
  };

  const hideCursor = () => {
    state.showCursor = false;
    state.osmdInstance?.cursor?.hide();
  };

  const moveCursorNext = () => {
    state.osmdInstance?.cursor?.next();
  };

  const moveCursorPrevious = () => {
    state.osmdInstance?.cursor?.previous();
  };

  const resetCursor = () => {
    state.osmdInstance?.cursor?.reset();
    state.cursorIndex = 0;
  };

  // Backend controls
  const setBackendType = (backend: BackendType) => {
    state.backendType = backend;
  };

  // Page format controls
  const setPageFormat = (format: PageFormat) => {
    state.pageFormat = format;
    if (state.osmdInstance) {
      state.osmdInstance.setPageFormat(format);
      try {
        state.osmdInstance.render();
      } catch (e) {
        console.error("Page format error:", e);
        state.error = `Failed to render with page format ${format}`;
      }
    }
  };

  // Debug controls
  const toggleSkyline = () => {
    state.drawSkyline = !state.drawSkyline;
    if (state.osmdInstance) {
      state.osmdInstance.DrawSkyLine = state.drawSkyline;
      try {
        state.osmdInstance.render();
      } catch (e) {
        console.error("Skyline toggle error:", e);
        state.error = "Failed to render with skyline setting";
      }
    }
  };

  const toggleBottomline = () => {
    state.drawBottomline = !state.drawBottomline;
    if (state.osmdInstance) {
      state.osmdInstance.DrawBottomLine = state.drawBottomline;
      try {
        state.osmdInstance.render();
      } catch (e) {
        console.error("Bottomline toggle error:", e);
        state.error = "Failed to render with bottomline setting";
      }
    }
  };

  const setBoundingBox = (boxType: string) => {
    state.showBoundingBox = boxType;
    if (state.osmdInstance) {
      try {
        if (boxType === "none") {
          state.osmdInstance.SetBoundingBoxesVisible(false);
        } else if (boxType === "all") {
          state.osmdInstance.SetBoundingBoxesVisible(true);
        } else {
          state.osmdInstance.SetBoundingBoxesVisible(true, [boxType]);
        }
        state.osmdInstance.render();
      } catch (e) {
        console.error("Bounding box error:", e);
        state.error = "Failed to set bounding box";
      }
    }
  };

  // Transpose
  const setTransposition = (semitones: number) => {
    state.transposition = semitones;
    try {
      state.osmdInstance?.Sheet?.Transpose?.(semitones);
      state.osmdInstance?.render();
    } catch (e) {
      console.error("Transpose error:", e);
      state.error = "Failed to transpose";
    }
  };

  // Dark mode
  const toggleDarkMode = () => {
    state.isDarkMode = !state.isDarkMode;
    // Apply dark mode styling to document
    if (state.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize OSMD instance
  const initializeOSMD = (canvasElement: HTMLElement, osmdClass: any) => {
    try {
      state.osmdInstance = new osmdClass(canvasElement, {
        autoBeam: true,
        backend: state.backendType,
        pageFormat: state.pageFormat,
      });
      const osmd = state.osmdInstance;
      if (osmd) {
        osmd.Zoom = state.zoom;
      }
      state.error = null;
    } catch (e) {
      console.error("OSMD initialization error:", e);
      state.error = `Failed to initialize OSMD: ${e}`;
      state.osmdInstance = null;
    }
  };

  // Load and render score
  const loadScore = async (scorePath: string): Promise<boolean> => {
    if (!state.osmdInstance) {
      state.error = "OSMD not initialized";
      return false;
    }

    state.isLoading = true;
    state.error = null;

    try {
      await state.osmdInstance.load(scorePath);
      state.osmdInstance.render();
      state.isLoading = false;
      return true;
    } catch (e) {
      console.error("Score loading error:", e);
      state.error = `Failed to load score: ${e}`;
      state.isLoading = false;
      return false;
    }
  };

  return {
    state,
    zoomIn,
    zoomOut,
    setZoom,
    showCursor,
    hideCursor,
    moveCursorNext,
    moveCursorPrevious,
    resetCursor,
    setBackendType,
    setPageFormat,
    toggleSkyline,
    toggleBottomline,
    setBoundingBox,
    setTransposition,
    toggleDarkMode,
    initializeOSMD,
    loadScore,
  };
}
