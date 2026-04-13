import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * The Capital Guru - Universal API Wrapper
 * Standardizes:
 * 1. Error Handling (Try/Catch)
 * 2. Response Formatting (JSON)
 * 3. Input Validation Errors (Zod)
 * 4. Request Logging
 */

export function withErrorHandler(handler: (request: Request, ...args: unknown[]) => Promise<Response>) {
  return async function (request: Request, ...args: unknown[]) {
    try {
      // Basic logging
      console.log(`[API Request] ${request.method} ${request.url}`)
      
      return await handler(request, ...args)
    } catch (error: unknown) {
      console.error('[API Error]', error)

      // Handle Zod Validation Errors
      if (error instanceof ZodError) {
        return NextResponse.json(
          { 
            error: 'Validation failed', 
            details: error.issues.map(e => ({ path: e.path, message: e.message })) 
          },
          { status: 400 }
        )
      }

      // Handle custom errors or general crashes
      const message = error instanceof Error ? error.message : 'An internal server error occurred'
      const status = (error && typeof error === 'object' && 'status' in error) ? (error as { status: number }).status : 500

      return NextResponse.json(
        { 
          error: config.isProd ? 'Internal Server Error' : message,
          timestamp: new Date().toISOString()
        },
        { status }
      )
    }
  }
}

import { config } from './config'
