import { getApiBaseUrl } from "@/lib/constants/urls";
import { getClientUserId } from "./client-user";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("x-client-user-id", getClientUserId());

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
  });

  const body = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || !body.success) {
    throw new ApiError(body.message ?? res.statusText, res.status);
  }

  return body.data;
}
