"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FormInput, FormSelect, FormTextarea } from "@/components/register/FormField";
import { FileUpload } from "@/components/register/FileUpload";
import SectionLabel from "@/components/register/SectionLabel";
import { FOOD_PREFERENCES, CONSENT_OPTIONS } from "@/lib/register/constants";
import type { AgentProfileData } from "@/lib/register/types";

export default function AgentProfile() {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext<{ agentProfile: AgentProfileData }>();

    const e = errors.agentProfile;

    // Watch the CV link to conditionally render CV Consent
    const cvLink = useWatch({ name: "agentProfile.cvLink" });

    useEffect(() => {
        // Clear consent if cvLink is empty
        if (!cvLink || cvLink.trim() === "") {
            setValue("agentProfile.cvConsent", "");
        }
    }, [cvLink, setValue]);

    return (
        <div className="flex flex-col gap-8">
            {/* Section: Guardian/Emergency */}
            <fieldset className="flex flex-col gap-5">
                <SectionLabel>EMERGENCY PROTOCOL</SectionLabel>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                        label="Provide the name of your guardian, someone we can reach if needed."
                        placeholder="Name of your guardian"
                        required
                        error={e?.guardianName}
                        {...register("agentProfile.guardianName")}
                    />
                    <FormInput
                        label="Provide your guardian's contact number."
                        type="tel"
                        placeholder="+94 7X XXX XXXX"
                        required
                        error={e?.guardianContact}
                        {...register("agentProfile.guardianContact")}
                    />
                </div>
            </fieldset>

            {/* Section: Medical & Dietary */}
            <fieldset className="flex flex-col gap-5">
                <SectionLabel>AGENT WELLBEING</SectionLabel>

                <FormSelect
                    label="Food Preference"
                    options={FOOD_PREFERENCES}
                    placeholder="Select your food preference"
                    required
                    error={e?.foodPreference}
                    {...register("agentProfile.foodPreference")}
                />

                <FormTextarea
                    label="Medical Conditions / Allergies (Optional)"
                    placeholder="List any medical conditions or allergies our mission team should be aware of. Leave empty if none."
                    error={e?.medicalConditions}
                    {...register("agentProfile.medicalConditions")}
                />
            </fieldset>

            {/* Section: Experience / CV */}
            <fieldset className="flex flex-col gap-5">
                <SectionLabel>MISSION DOCUMENTS</SectionLabel>

                <FileUpload
                    label="Upload your CV, a file that gives us a glimpse into your experience."
                    classification="CLASSIFIED FILE"
                    dropLabel="DROP YOUR CV HERE"
                    successLabel="✓ CV UPLOADED"
                    accept="application/pdf"
                    maxSizeMB={4}
                    uploadUrl="/api/register/upload/cv"
                    icon="document"
                    hint="Please upload your CV mapping your background for OC selection (PDF only)."
                    onUploadSuccess={(fileId) => {
                        setValue("agentProfile.cvLink", fileId, { shouldValidate: true });
                    }}
                    currentFileId={cvLink}
                />

                {/* Hidden input to strictly validate in Zod implicitly */}
                <input type="hidden" {...register("agentProfile.cvLink")} />
                {e?.cvLink && (
                    <div className="text-[var(--red)] text-sm -mt-4 mb-4">{e.cvLink.message}</div>
                )}

                <AnimatePresence>
                    {cvLink && cvLink.trim() !== "" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 border border-white/10 bg-[#0c0c0e] relative group transition-colors hover:border-white/20">
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--red)] opacity-70 group-hover:opacity-100 transition-opacity" />
                                <FormSelect
                                    label="Do you consent to sharing your CV with the NLDS 2026 partners?"
                                    extraLabel=""
                                    options={CONSENT_OPTIONS}
                                    placeholder="Select Yes or No..."
                                    required
                                    error={e?.cvConsent}
                                    {...register("agentProfile.cvConsent")}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </fieldset>
        </div>
    );
}
