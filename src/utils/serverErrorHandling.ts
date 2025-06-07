/**
 * Server-side error handling utilities for API routes and server components
 * Complements the client-side error handling utilities
 */

import { NextRequest, NextResponse } from "next/server";
import { formatErrorMessage, createErrorId } from "./errorHandling";

// Interface for structured API error responses
export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string | number;
    id: string;
    status: number;
  };
  success: false;
}

/**
 * Create a standardized error response for API routes
 * @param error - The error object
 * @param status - HTTP status code (default: 500)
 * @param context - Additional context about where the error occurred
 * @returns NextResponse with standardized error format
 */
export function createErrorResponse(error: unknown, status = 500, context = "API"): NextResponse<ApiErrorResponse> {
  // Generate a unique error ID for tracking
  const errorId = createErrorId(error);

  // Format the error message for the response
  const message = formatErrorMessage(error);

  // Log the error on the server side
  console.error(`[Server Error] ${context} - ${status}:`, {
    message,
    id: errorId,
    error,
    timestamp: new Date().toISOString(),
  });

  // Create a standardized error response
  return NextResponse.json(
    {
      error: {
        message,
        id: errorId,
        status,
        code: error instanceof Error && 'code' in error ? 
          (typeof error.code === 'string' || typeof error.code === 'number' ? error.code : undefined) : 
          undefined
      },
      success: false
    },
    { status }
  );
}

/**
 * Handle API route errors with consistent error responses
 * @param request - The incoming request
 * @param fn - The API route handler function
 * @returns The handler result or an error response
 */
export async function withErrorHandling<T>(request: NextRequest, fn: () => Promise<NextResponse<T>>): Promise<NextResponse<T | ApiErrorResponse>> {
  try {
    return await fn();
  } catch (error) {
    // Determine appropriate status code
    let status = 500;

    if (error instanceof Error) {
      if ("status" in error && typeof error.status === "number") {
        status = error.status;
      } else if (error.message.includes("not found") || error.message.includes("404")) {
        status = 404;
      } else if (error.message.includes("unauthorized") || error.message.includes("unauthenticated")) {
        status = 401;
      } else if (error.message.includes("forbidden") || error.message.includes("permission")) {
        status = 403;
      } else if (error.message.includes("validation") || error.message.includes("invalid")) {
        status = 400;
      }
    }

    // Get the API path for context
    const path = request.nextUrl.pathname;

    return createErrorResponse(error, status, `API ${path}`);
  }
}

/**
 * Create a custom API error with status code
 * @param message - Error message
 * @param status - HTTP status code
 * @returns Error object with status
 */
export function createApiError(message: string, status = 500): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

/**
 * Validate request data against a schema
 * Simple validation helper for API routes
 * @param data - The data to validate
 * @param requiredFields - Array of required field names
 * @throws ApiError if validation fails
 */
export function validateRequestData(data: unknown, requiredFields: string[]): void {
  if (!data || typeof data !== "object") {
    throw createApiError("Invalid request data", 400);
  }

  for (const field of requiredFields) {
    if (!(field in data) || data[field as keyof typeof data] === undefined || data[field as keyof typeof data] === null) {
      throw createApiError(`Missing required field: ${field}`, 400);
    }
  }
}
