export type RealtimeRegistrationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export interface OTPEventPayload {
  email: string;
}

export interface RegistrationStatusChangedPayload {
  registrationId: string;
  referenceCode?: string;
  status: RealtimeRegistrationStatus;
}

export interface RegistrationCreatedPayload {
  registrationId: string;
  referenceCode: string;
  status: RealtimeRegistrationStatus;
  submittedAt: string;
}

export interface ServerToClientEvents {
  // Participant specific events
  OTP_SENT: (payload: OTPEventPayload) => void;
  AIESEC_EMAIL_VERIFIED: (payload: OTPEventPayload) => void;
  REGISTRATION_DRAFT_SAVED: (payload: { id: string }) => void;
  REGISTRATION_SUBMITTED: (payload: RegistrationCreatedPayload) => void;

  // Admin & Participant specific events mapped securely
  REGISTRATION_STATUS_CHANGED: (
    payload: RegistrationStatusChangedPayload,
  ) => void;

  // Admin explicitly mapped events
  REGISTRATION_CREATED: (payload: RegistrationCreatedPayload) => void;
  ADMIN_CONNECTED: (payload: { adminId: string; timestamp: string }) => void;
  ADMIN_DISCONNECTED: (payload: { adminId: string; timestamp: string }) => void;
}

export interface ClientToServerEvents {
  // Explicit server joining handles based on session intrinsically bypassing untrusted args
  request_reconnect_sync: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userType: "PARTICIPANT" | "ADMIN";
  userId: string; // participantId | adminId
  permissions: string[]; // only populated for admins natively mapping against RBAC
}
