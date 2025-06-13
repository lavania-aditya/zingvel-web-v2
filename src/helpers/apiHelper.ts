/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";
import { logError } from "@/utils/errorHandling";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type ServiceName = keyof typeof BASE_URLS;

interface FetchConfig {
  ctx?: GetServerSidePropsContext;
  token?: string;
  body?: any;
  params?: Record<string, string | number | boolean>;
  headers?: HeadersInit;
}

interface IApiHelper {
  get: (url: string, config?: FetchConfig) => Promise<any>;
  post: (url: string, config?: FetchConfig) => Promise<any>;
  patch: (url: string, config?: FetchConfig) => Promise<any>;
  delete: (url: string, config?: FetchConfig) => Promise<any>;
}

const BASE_URLS = {
  wanderlist: "http://localhost:3434/api",
  packages: "http://localhost:8082/api",
};

let logoutFn: (() => void) | null = null;
export const registerLogoutHandler = (fn: () => void) => {
  logoutFn = fn;
};

const isServer = typeof window === "undefined";

const getAuthToken = (ctx?: GetServerSidePropsContext): string | null => {
  if (isServer && ctx?.req?.headers?.cookie) {
    const cookie = ctx.req.headers.cookie;
    const match = cookie.match(/authToken=([^;]+)/);
    return match?.[1] || null;
  } else {
    return Cookies.get("authToken") || null;
  }
};

const handleResponse = async (res: Response): Promise<any> => {
  try {
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (res.status === 401 && !isServer) {
      Cookies.remove("authToken");
      Cookies.remove("user");
      if (logoutFn) logoutFn();
    }

    if (!res.ok) {
      const error = {
        status: res.status,
        data,
        message: isJson && typeof data === "object" && data.message ? data.message : `API Error: ${res.status}`,
      };
      throw error;
    }

    return data;
  } catch (error) {
    logError(error, `API Response Handler (${res.url})`);
    throw error;
  }
};

const makeRequest = async (
  service: ServiceName,
  method: HttpMethod,
  url: string,
  { ctx, token, body, params, headers = {} }: FetchConfig = {}
): Promise<any> => {
  try {
    // Build query string from params if provided
    const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
    const fullUrl = `${BASE_URLS[service]}${url}${query}`;

    // Get auth token
    const authToken = token || getAuthToken(ctx);

    // Prepare headers
    const finalHeaders: HeadersInit = {
      ...headers,
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };

    // Prepare request options
    const options: RequestInit = {
      method,
      headers: finalHeaders,
      // Add credentials to handle cookies properly
      credentials: "include",
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    // Make the request
    const res = await fetch(fullUrl, options);
    return handleResponse(res);
  } catch (error) {
    logError(error, `API Request to ${service} (${method} ${url})`);
    throw error;
  }
};

// Create a factory function to reduce code duplication
const createApiClient = (service: ServiceName): IApiHelper => ({
  get: (url, config) => makeRequest(service, "GET", url, config),
  post: (url, config) => makeRequest(service, "POST", url, config),
  patch: (url, config) => makeRequest(service, "PATCH", url, config),
  delete: (url, config) => makeRequest(service, "DELETE", url, config),
});

// Export API for both microservices
export const ApiHelper: Record<ServiceName, IApiHelper> = {
  wanderlist: createApiClient("wanderlist"),
  packages: createApiClient("packages"),
};
