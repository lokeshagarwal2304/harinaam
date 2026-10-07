import { ApiResponse, Naam, Session, NaamEntry } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://127.0.0.1:8000/api/v1';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      message: error.message || 'Network error or backend unreachable.',
    };
  }
}

export const HarinaamApi = {
  getNaams: () => fetchApi<Naam[]>('/naams'),
  createSession: (payload: {
    session_uuid: string;
    naam_id: number;
    target_malas: number;
    device_uuid?: string;
    user_name?: string;
    devotee_name?: string;
  }) =>
    fetchApi<Session>('/sessions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getSession: (sessionUuid: string) => fetchApi<Session>(`/sessions/${sessionUuid}`),
  recordEntry: (sessionUuid: string, entry: Partial<NaamEntry>) =>
    fetchApi<any>(`/sessions/${sessionUuid}/entries`, {
      method: 'POST',
      body: JSON.stringify(entry),
    }),
  syncBatch: (sessionUuid: string, entries: Partial<NaamEntry>[]) =>
    fetchApi<any>(`/sessions/${sessionUuid}/sync`, {
      method: 'POST',
      body: JSON.stringify({ entries }),
    }),
  getHistory: (params?: { device_uuid?: string; devotee_name?: string; page?: number }) => {
    const query = new URLSearchParams();
    if (params?.device_uuid) query.append('device_uuid', params.device_uuid);
    if (params?.devotee_name) query.append('devotee_name', params.devotee_name);
    if (params?.page) query.append('page', params.page.toString());
    const qs = query.toString();
    return fetchApi<any>(`/history${qs ? `?${qs}` : ''}`);
  },
  getDashboardStats: (params?: { devotee_name?: string }) => {
    const query = new URLSearchParams();
    if (params?.devotee_name) query.append('devotee_name', params.devotee_name);
    const qs = query.toString();
    return fetchApi<any>(`/dashboard/stats${qs ? `?${qs}` : ''}`);
  },
};
