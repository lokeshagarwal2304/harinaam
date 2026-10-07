export interface Point {
  x: number;
  y: number;
  pressure?: number;
  time: number;
}

export interface Stroke {
  stroke_id: number;
  color: string;
  brush_size: number;
  points: Point[];
}

export interface StrokeData {
  version: number;
  canvas_dimensions: {
    width: number;
    height: number;
  };
  metrics?: {
    total_strokes: number;
    total_points: number;
    duration_ms: number;
    bounding_box?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  strokes: Stroke[];
}

export interface Naam {
  id: number;
  name: string;
  display_name: string;
  language: string;
  slug: string;
  description?: string;
  sort_order: number;
}

export interface MalaProgress {
  id?: number;
  mala_number: number;
  target_entries: number;
  completed_entries: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Session {
  id?: number;
  session_uuid: string;
  user_id?: number | null;
  user_name?: string;
  devotee_name?: string;
  device_uuid?: string;
  naam_id: number;
  naam?: Naam;
  target_malas: number;
  completed_malas: number;
  target_entries: number;
  completed_entries: number;
  status: 'in_progress' | 'completed' | 'paused' | 'abandoned';
  started_at: string;
  completed_at?: string | null;
  duration_seconds: number;
  current_mala?: MalaProgress;
}

export interface NaamEntry {
  id?: number;
  client_entry_id: string;
  session_uuid: string;
  mala_number: number;
  naam_id: number;
  entry_number: number;
  stroke_data: StrokeData;
  stroke_count: number;
  point_count: number;
  duration_ms: number;
  written_at: string;
  sync_status?: 'pending' | 'synced' | 'failed';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string | null;
  errors?: Record<string, string[]>;
}

export interface StrokeValidationConfig {
  minPoints: number;
  minDistancePx: number;
  minBboxArea: number;
  minDurationMs: number;
  silenceDelayMs: number;
}
