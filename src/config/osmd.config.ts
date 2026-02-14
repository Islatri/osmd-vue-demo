/**
 * OSMD Configuration
 * Central configuration for OpenSheetMusicDisplay settings and behavior
 */

import type { OSMDOptions, PageFormat } from "@/types/osmd";

export const OSMD_DEFAULT_CONFIG: OSMDOptions = {
  // Rendering options
  backend: "svg", // 'svg' or 'canvas'
  pageFormat: "Endless",
  zoom: 1,

  // Music notation options
  autoBeam: true,
  autoResizeContainer: true,
  coloringMode: 0, // 0=default, 1=custom

  // Display options
  drawCredits: true,
  drawTitle: true,
  drawSubtitle: true,
  drawComposer: true,
  drawPartNames: true,
  drawPartAbbreviations: true,

  // Layout options
  spacingFactorSoftmax: 1.5,
  spacingFactorHardmax: 2,
  measureNumberInterval: 1,
};

export const PAGE_FORMATS: Array<{ label: string; value: PageFormat }> = [
  { label: "Endless", value: "Endless" },
  { label: "A3 Portrait", value: "A3 P" },
  { label: "A3 Landscape", value: "A3 L" },
  { label: "A4 Portrait", value: "A4 P" },
  { label: "A4 Landscape", value: "A4 L" },
  { label: "A5 Portrait", value: "A5 P" },
  { label: "A5 Landscape", value: "A5 L" },
  { label: "Letter Portrait", value: "Letter P" },
  { label: "Letter Landscape", value: "Letter L" },
];

export const ZOOM_MIN = 0.1;
export const ZOOM_MAX = 5;
export const ZOOM_STEP = 0.1;

export const TRANSPOSE_MIN = -12;
export const TRANSPOSE_MAX = 12;

/**
 * Bounding box types that can be displayed for debugging
 */
export const BOUNDING_BOX_TYPES = [
  { label: "None", value: "none" },
  { label: "All", value: "all" },
  { label: "Measures", value: "VexFlowMeasure" },
  { label: "Graphical Notes", value: "VexFlowGraphicalNote" },
  { label: "Voice Entries", value: "VexFlowVoiceEntry" },
  { label: "Staff Entries", value: "VexFlowStaffEntry" },
  { label: "Labels", value: "GraphicalLabel" },
  { label: "Staff Lines", value: "VexFlowStaffLine" },
  { label: "System Lines", value: "SystemLine" },
  { label: "Activity Symbols", value: "StaffLineActivitySymbol" },
  { label: "Dynamic Expressions", value: "VexFlowContinuousDynamicExpression" },
];

/**
 * Key performance indicators for OSMD
 */
export interface OSMDMetrics {
  loadTime: number;
  renderTime: number;
  measuresCount: number;
  partsCount: number;
  staffsCount: number;
}

/**
 * Get default metrics object
 */
export function getDefaultMetrics(): OSMDMetrics {
  return {
    loadTime: 0,
    renderTime: 0,
    measuresCount: 0,
    partsCount: 0,
    staffsCount: 0,
  };
}
