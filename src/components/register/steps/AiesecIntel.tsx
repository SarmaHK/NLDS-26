"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormSelect, FormInput } from "@/components/register/FormField";
import { AIESEC_ENTITIES, ENTITY_IG_MAPPING, OTHER_ENTITY_IGS, AIESEC_POSITIONS } from "@/lib/register/constants";
import type { AiesecIntelData } from "@/lib/register/types";

export default function AiesecIntel() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<{ aiesecIntel: AiesecIntelData }>();

    const e = errors.aiesecIntel;

    const participantType = useWatch({ control, name: "aiesecIntel.participantType" });
    const entity = useWatch({ control, name: "aiesecIntel.entity" });
    const initiativeGroup = useWatch({ control, name: "aiesecIntel.initiativeGroup" });

    const igOptions = useMemo(() => {
        if (!entity) return [];
        if (entity === "Other") return OTHER_ENTITY_IGS;
        return ENTITY_IG_MAPPING[entity] || [];
    }, [entity]);

    // When entity changes, if the current IG is not in the new options list, clear it
    useEffect(() => {
        if (entity) {
            if (initiativeGroup && !igOptions.includes(initiativeGroup as any)) {
                setValue("aiesecIntel.initiativeGroup", "", { shouldValidate: true });
                setValue("aiesecIntel.customInitiativeGroup", "", { shouldValidate: true });
            }
        }
    }, [entity, igOptions, initiativeGroup, setValue]);

    // If IG changes away from Other IG, clear custom IG name
    useEffect(() => {
        if (initiativeGroup !== "Other IG") {
            setValue("aiesecIntel.customInitiativeGroup", "", { shouldValidate: true });
        }
    }, [initiativeGroup, setValue]);

    return (
        <div className="flex flex-col gap-8">
            {/* Section: Entity */}
            <fieldset className="flex flex-col gap-5">
                <legend className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
                    <span className="label-classified">AIESEC AFFILIATION & IDENTITY VERIFICATION</span>
                </legend>

                {/* Section: Newbie or Oldbie */}
                <div className="flex flex-col gap-3 mb-2">
                    <label className="text-[11px] font-classified tracking-widest text-[#F9B62A] uppercase">
                        Are you a Newbie or Oldbie? <span className="text-[var(--red)]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer border p-4 flex flex-col items-center justify-center gap-2 transition-all ${participantType === "NEWBIE" ? "border-[#F9B62A] bg-[#F9B62A]/10 text-white" : "border-[var(--border)] text-white/50 hover:border-white/30"}`}>
                            <input type="radio" value="NEWBIE" className="hidden" {...register("aiesecIntel.participantType")} />
                            <span className="font-bebas text-xl tracking-widest">NEWBIE</span>
                            <span className="text-[10px] uppercase font-sans tracking-wide opacity-70">New to AIESEC</span>
                        </label>
                        <label className={`cursor-pointer border p-4 flex flex-col items-center justify-center gap-2 transition-all ${participantType === "OLDBIE" ? "border-[#F9B62A] bg-[#F9B62A]/10 text-white" : "border-[var(--border)] text-white/50 hover:border-white/30"}`}>
                            <input type="radio" value="OLDBIE" className="hidden" {...register("aiesecIntel.participantType")} />
                            <span className="font-bebas text-xl tracking-widest">OLDBIE</span>
                            <span className="text-[10px] uppercase font-sans tracking-wide opacity-70">Existing member</span>
                        </label>
                    </div>
                    {e?.participantType && (
                        <p className="text-[11px] text-red-500 font-medium m-0">{e.participantType.message}</p>
                    )}
                </div>

                <FormInput
                    label="AIESEC Email"
                    type="email"
                    placeholder="Enter your AIESEC email (name@aiesec.net)"
                    required={participantType === "OLDBIE"}
                    extraLabel={participantType === "NEWBIE" ? "Optional for Newbies" : participantType === "OLDBIE" ? "Required for Oldbies" : ""}
                    error={e?.aiesecEmail}
                    {...register("aiesecIntel.aiesecEmail")}
                />

                <FormSelect
                    label="AIESEC Entity"
                    options={AIESEC_ENTITIES}
                    placeholder="Identify your AIESEC entity"
                    required
                    error={e?.entity}
                    {...register("aiesecIntel.entity")}
                />

                {entity && igOptions.length > 0 && (
                    <FormSelect
                        label="Initiative Group (IG)"
                        options={igOptions}
                        placeholder="Select your Initiative Group (IG)"
                        error={e?.initiativeGroup}
                        {...register("aiesecIntel.initiativeGroup")}
                    />
                )}

                {entity && igOptions.length === 0 && entity !== "Other" && (
                    <p className="font-classified text-[10px] tracking-[0.12em] text-white/40 uppercase p-4 mt-2" style={{ border: "1px dashed var(--border-strong)", borderRadius: "4px" }}>
                        No mapped Initiative Groups for {entity}. Please proceed.
                    </p>
                )}

                {entity === "Other" && initiativeGroup === "Other IG" && (
                    <FormInput
                        label="Custom Initiative Group Name"
                        placeholder="Enter your Initiative Group name"
                        error={e?.customInitiativeGroup}
                        {...register("aiesecIntel.customInitiativeGroup")}
                    />
                )}

                <FormSelect
                    label="Current AIESEC Position"
                    options={AIESEC_POSITIONS}
                    placeholder="Declare your current position"
                    required
                    error={e?.currentPosition}
                    {...register("aiesecIntel.currentPosition")}
                />
            </fieldset>
        </div>
    );
}
