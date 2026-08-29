export type RegistrationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export const ALLOWED_TRANSITIONS: Record<
  RegistrationStatus,
  RegistrationStatus[]
> = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["CANCELLED"],
  REJECTED: ["CANCELLED"],
  CANCELLED: ["DRAFT"],
};

export class RegistrationStateMachine {
  static canTransition(
    current: RegistrationStatus,
    next: RegistrationStatus,
  ): boolean {
    const allowed = ALLOWED_TRANSITIONS[current];
    return allowed?.includes(next) || false;
  }

  static transition(
    current: RegistrationStatus,
    next: RegistrationStatus,
  ): RegistrationStatus {
    if (!this.canTransition(current, next)) {
      throw new Error(`Invalid state transition from ${current} to ${next}`);
    }
    return next;
  }
}
