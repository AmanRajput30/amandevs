/**
 * AmanDevs Privacy-First Event Telemetry
 * Tracks conversion actions without third-party cookies or collecting user PII.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_start"
  | "form_submit_quick"
  | "form_submit_full"
  | "portfolio_modal_view"
  | "service_detail_view"
  | "solution_detail_view";

export interface AnalyticsPayload {
  category?: string;
  label?: string;
  value?: string | number;
  [key: string]: unknown;
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...payload,
  };

  // Dispatch standard custom DOM event for zero-dependency observability
  window.dispatchEvent(
    new CustomEvent("amandevs:event", {
      detail: eventData,
    })
  );

  // In development, log telemetry to console
  if (process.env.NODE_ENV !== "production") {
    console.log(`[AmanDevs Analytics] 📊 ${event}`, eventData);
  }
}
