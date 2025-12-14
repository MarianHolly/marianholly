"use client";

import React from "react";
import { logError } from "@/lib/error-handler";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for catching React errors
 * Wraps components to prevent errors from crashing the entire app
 * @example
 * <ErrorBoundary componentName="ArticleList" fallback={<div>Failed to load articles</div>}>
 *   <ArticleList />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError(error, `Error in ${this.props.componentName || "component"}`);
    console.error("Error boundary details:", errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
            <h3 className="font-semibold">Something went wrong</h3>
            <p className="text-sm">
              {this.props.componentName
                ? `Error in ${this.props.componentName}`
                : "An unexpected error occurred"}
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="mt-2 overflow-auto text-xs">
                {this.state.error.message}
              </pre>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Hook version for handling errors in functional components
 * @param error - Error to handle
 * @example
 * const [error, setError] = useState<Error | null>(null);
 * useErrorHandler(error);
 */
export function useErrorHandler(error: Error | null): void {
  React.useEffect(() => {
    if (error) {
      logError(error, "Error caught by useErrorHandler");
    }
  }, [error]);
}
