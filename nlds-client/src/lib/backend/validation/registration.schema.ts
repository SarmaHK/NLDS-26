import { z } from "zod";

export const ServerRegistrationSchema = z.object({
  fullName: z.string().min(2).max(100),
  preferredName: z.string().min(2).max(50),
  personalEmail: z
    .string()
    .email()
    .max(150)
    .refine(
      (val) => !val.toLowerCase().endsWith("@aiesec.net"),
      "Cannot use an AIESEC email as personal email.",
    ),
  phone: z
    .string()
    .regex(/^(?:0[0-9]{9}|\+94[0-9]{9})$/, "Invalid phone format"),
  profilePicture: z.string().max(1000),
  gender: z.string().max(20),
  dateOfBirth: z.string().max(20),
  nationalIdOrPassport: z
    .string()
    .regex(
      /^(?:[0-9]{9}[vVxX]|[0-9]{12}|[a-zA-Z0-9]{7,12})$/,
      "Invalid NIC/Passport format",
    ),
  participantType: z.enum(["NEWBIE", "OLDBIE"]),
  aiesecEmail: z.string().max(150).optional().nullable(),

  entityId: z.string().min(1),
  initiativeGroupId: z.string().optional().nullable(),
  customInitiativeGroup: z.string().max(100).optional().nullable(),

  currentPosition: z.string().max(100),
  foodPreference: z.string().max(100),
  medicalConditions: z.string().max(500).optional().nullable(),
  guardianName: z.string().min(2).max(100),
  guardianContact: z
    .string()
    .regex(/^(?:0[0-9]{9}|\+94[0-9]{9})$/, "Invalid phone format"),

  missionGoal: z.string().max(1000),
  additionalInformation: z.string().max(1500).optional().nullable(),
  readinessLevel: z.string().max(50),

  documents: z
    .array(
      z.object({
        type: z.enum(["CV", "MEDICAL_CERT", "OTHER"]),
        urlReference: z.string().max(1000),
        consentGiven: z.boolean().nullable().optional(),
      }),
    )
    .max(5),
});
