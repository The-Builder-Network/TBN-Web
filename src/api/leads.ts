import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// ── Public: count available leads near a postcode ────────────

export async function fetchLeadsCount(
  postcode: string,
  radiusMiles: number,
): Promise<number> {
  if (!postcode) return 0;
  const { data } = await axios.get<{ count: number }>(
    `${API_BASE}/leads/count`,
    { params: { postcode, radius: radiusMiles } },
  );
  return data.count;
}

export function useLeadsCount(postcode: string, radiusMiles: number) {
  return useQuery({
    queryKey: ["leads", "count", postcode, radiusMiles],
    queryFn: () => fetchLeadsCount(postcode, radiusMiles),
    enabled: !!postcode && postcode.length >= 5,
    staleTime: 60_000,
    placeholderData: 0,
  });
}
