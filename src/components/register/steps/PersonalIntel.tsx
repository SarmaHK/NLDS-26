"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { FormInput, FormSelect } from "@/components/register/FormField";
import { FileUpload } from "@/components/register/FileUpload";
import SectionLabel from "@/components/register/SectionLabel";
import { GENDERS } from "@/lib/register/constants";
import type { PersonalIntelData } from "@/lib/register/types";

export default function PersonalIntel() {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext<{ personalIntel: PersonalIntelData }>();

    const e = errors.personalIntel;

    return (
        <div className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-5">
                <SectionLabel>IDENTITY VERIFICATION</SectionLabel>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                        label="Agent, state your full name. We need to know who is accepting the mission."
                        placeholder="Enter your full name"
                        hint="Enter your legal name as it appears on official documents."
                        required
                        error={e?.fullName}
                        {...register("personalIntel.fullName")}
                    />
                    <FormInput
                        label="reveal your preferred name."
                        placeholder="What should we call you?"
                        required
                        error={e?.preferredName}
                        {...register("personalIntel.preferredName")}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                        label="Personal Email"
                        type="email"
                        placeholder="your.name@gmail.com"
                        required
                        error={e?.personalEmail}
                        {...register("personalIntel.personalEmail")}
                    />
                    <FormInput
                        label="Phone Number"
                        type="tel"
                        placeholder="+94 7X XXX XXXX"
                        required
                        error={e?.phone}
                        {...register("personalIntel.phone")}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                        label="Enter your National ID or Passport number for mission identification."
                        placeholder="Enter your ID number"
                        required
                        error={e?.nationalIdOrPassport}
                        {...register("personalIntel.nationalIdOrPassport")}
                    />
                    <FormInput
                        label="Enter your date of birth, the beginning of your story."
                        type="date"
                        required
                        error={e?.dateOfBirth}
                        {...register("personalIntel.dateOfBirth")}
                    />
                </div>

                <FormSelect
                    label="Identify your gender."
                    options={GENDERS}
                    required
                    error={e?.gender}
                    {...register("personalIntel.gender")}
                />
            </fieldset>

            <fieldset className="flex flex-col gap-5">
                <SectionLabel>IDENTIFICATION DATA</SectionLabel>

                <FileUpload
                    label="Profile Picture"
                    classification="IDENTITY FILE"
                    dropLabel="DROP YOUR PROFILE PHOTO HERE"
                    successLabel="✓ PROFILE PHOTO SECURED"
                    accept="image/jpeg, image/png, image/webp, image/jpg"
                    maxSizeMB={5}
                    uploadUrl="/api/register/upload/photo"
                    icon="image"
                    hint="Please upload a clear professional headshot mapping your face securely."
                    onUploadSuccess={(fileId) => {
                        setValue("personalIntel.profilePicture", fileId, { shouldValidate: true });
                    }}
                    currentFileId={useWatch({ name: "personalIntel.profilePicture" })}
                />

                <input type="hidden" {...register("personalIntel.profilePicture")} />
                {e?.profilePicture && (
                    <div className="text-[var(--red)] text-sm -mt-4 mb-4">{e.profilePicture.message}</div>
                )}
            </fieldset>
        </div>
    );
}
