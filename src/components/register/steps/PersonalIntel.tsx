"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { FormInput, FormSelect } from "@/components/register/FormField";
import { FileUpload } from "@/components/register/FileUpload";
import { UNIVERSITIES, GENDERS } from "@/lib/register/constants";
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
            {/* Section: Identity */}
            <fieldset className="flex flex-col gap-5">
                <legend className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
                    <span className="label-classified">IDENTITY VERIFICATION</span>
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                        label="Full Name"
                        placeholder="Enter your full name"
                        required
                        error={e?.fullName}
                        {...register("personalIntel.fullName")}
                    />
                    <FormInput
                        label="Preferred Name"
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
                        label="National ID or Passport Number"
                        placeholder="Enter your ID number"
                        required
                        error={e?.nationalIdOrPassport}
                        {...register("personalIntel.nationalIdOrPassport")}
                    />
                    <FormInput
                        label="Date of Birth"
                        type="date"
                        required
                        error={e?.dateOfBirth}
                        {...register("personalIntel.dateOfBirth")}
                    />
                </div>

                <FormSelect
                    label="Gender"
                    options={GENDERS}
                    required
                    error={e?.gender}
                    {...register("personalIntel.gender")}
                />
            </fieldset>

            {/* Section: Profile */}
            <fieldset className="flex flex-col gap-5">
                <legend className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
                    <span className="label-classified">IDENTIFICATION DATA</span>
                </legend>

                <FileUpload
                    label="Profile Picture"
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

                {/* Hidden input to strictly validate in Zod */}
                <input type="hidden" {...register("personalIntel.profilePicture")} />
                {e?.profilePicture && (
                    <div className="text-[var(--red)] text-sm -mt-4 mb-4">{e.profilePicture.message}</div>
                )}
            </fieldset>
        </div>
    );
}
