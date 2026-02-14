/**
 * OSMD Type Definitions
 * Provides TypeScript support for OpenSheetMusicDisplay library
 */

export interface OSMDOptions {
  autoBeam?: boolean;
  backend?: "svg" | "canvas";
  pageFormat?: string;
  zoom?: number;
  [key: string]: any;
}

export interface OSMDCursor {
  show(): void;
  hide(): void;
  next(): void;
  previous(): void;
  reset(): void;
  [key: string]: any;
}

export interface OSMDSheet {
  Transpose(semitones: number): void;
  Instruments?: any[];
  [key: string]: any;
}

export interface OSMDEngravingRules {
  SheetTitleHeight?: number;
  [key: string]: any;
}

export interface OpenSheetMusicDisplay {
  // Properties
  Zoom: number;
  DrawSkyLine: boolean;
  DrawBottomLine: boolean;
  Sheet?: OSMDSheet;
  cursor?: OSMDCursor;
  EngravingRules?: OSMDEngravingRules;
  TransposeCalculator?: any;

  // Methods
  load(url: string): Promise<void>;
  render(): void;
  setPageFormat(format: string): void;
  SetBoundingBoxesVisible(visible: boolean, boxes?: string[]): void;
  clear(): void;
  [key: string]: any;
}

export type BackendType = "svg" | "canvas";
export type PageFormat =
  | "Endless"
  | "A3 P"
  | "A3 L"
  | "A4 P"
  | "A4 L"
  | "A5 P"
  | "A5 L"
  | "Letter P"
  | "Letter L";

export interface Sample {
  name: string;
  file: string;
}

export interface SheetMusicState {
  osmdInstance: OpenSheetMusicDisplay | null;
  zoom: number;
  isDarkMode: boolean;
  backendType: BackendType;
  pageFormat: PageFormat;
  showCursor: boolean;
  cursorIndex: number;
  followCursor: boolean;
  transposition: number;
  minMeasureToDraw: number;
  maxMeasureToDraw: number;
  showBoundingBox: string;
  drawSkyline: boolean;
  drawBottomline: boolean;
  isLoading: boolean;
  error: string | null;
}
