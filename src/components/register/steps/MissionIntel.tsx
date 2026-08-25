"use client";

import { useFormContext } from "react-hook-form";
import { FormTextarea } from "@/components/register/FormField";
import { Globe } from "lucide-react";
import type { MissionIntelData } from "@/lib/register/types";

export default function MissionIntel() {
    const {
        register,
        formState: { errors },
    } = useFormContext<{ missionIntel: MissionIntelData }>();

    const e = errors.missionIntel;

    return (
        <div className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-8">
                <legend className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
                    <span className="label-classified">MISSION OBJECTIVES</span>
                </legend>

                <FormTextarea
                    label="What do you hope to accomplish by accepting the NLDS 2026 mission?"
                    placeholder="Provide a meaningful response describing your motivation..."
                    required
                    error={e?.missionGoal}
                    {...register("missionIntel.missionGoal")}
                />

                <FormTextarea
                    label="Is there anything you would like the Conference Team to know or clarify before the mission begins? (Optional)"
                    placeholder="List any clarifications or extra info here..."
                    error={e?.additionalInformation}
                    {...register("missionIntel.additionalInformation")}
                />
            </fieldset>

            {/* Tactical Quote Graphic */}
            <div
                className="relative flex flex-col items-center justify-center px-6 py-12 mt-4 overflow-hidden rounded-md cursor-default select-none group"
                style={{
                    backgroundColor: "rgba(10, 10, 10, 0.4)",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                }}
            >
                {/* Tech Corner Borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-[var(--red)] opacity-50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-[var(--red)] opacity-50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-[var(--red)] opacity-50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-[var(--red)] opacity-50" />

                {/* Subtile grid/dot background pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                    }}
                />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <span
                        className="text-[var(--red)] text-6xl font-serif absolute -top-8 -left-12 opacity-80 select-none"
                        style={{ fontFamily: "Georgia, serif", lineHeight: 1 }}
                    >
                        “
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[0.1em] mb-1 uppercase">
                        Your Mission.
                    </h3>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[0.1em] mb-4 uppercase">
                        Your Impact.
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#a3a3a3] uppercase mb-1 drop-shadow-md">
                        Together, we make the
                    </p>
                    <p className="text-xs sm:text-sm font-bold tracking-widest text-[var(--red)] uppercase mb-6 drop-shadow-md">
                        Impossible possible.
                    </p>

                    {/* Minimalist target/crosshair SVG */}
                    <div className="relative flex justify-center items-center opacity-80 mt-2 w-full h-[120px]">
                        {/* Globe background */}
                        <div className="absolute inset-0 flex justify-center items-center text-white/5 pointer-events-none group-hover:scale-105 transition-transform duration-700">
                            <Globe size={160} strokeWidth={0.8} />
                        </div>
                        {/* Radar Target */}
                        <svg className="relative z-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="30" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="3 4" />
                            <circle cx="50" cy="50" r="12" stroke="var(--red)" strokeWidth="1.2" />
                            <circle cx="50" cy="50" r="2" fill="var(--red)" />

                            <path d="M50 5 L50 15" stroke="var(--red)" strokeWidth="1.2" />
                            <path d="M50 95 L50 85" stroke="var(--red)" strokeWidth="1.2" />
                            <path d="M5 50 L15 50" stroke="var(--red)" strokeWidth="1.2" />
                            <path d="M95 50 L85 50" stroke="var(--red)" strokeWidth="1.2" />

                            <path d="M50 15 L50 25" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="2 4" />
                            <path d="M50 85 L50 75" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="2 4" />
                            <path d="M85 50 L75 50" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="2 4" />
                            <path d="M15 50 L25 50" stroke="var(--red)" strokeWidth="1.2" strokeDasharray="2 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
