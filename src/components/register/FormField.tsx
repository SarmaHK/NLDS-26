"use client";

import { forwardRef } from "react";
import { type FieldError } from "react-hook-form";

/* ─── Text / Email / Date / Tel Input ────────────────────── */

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    hint?: string;
    extraLabel?: string;
    required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, hint, extraLabel, required, id, ...props }, ref) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={inputId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : "rgba(255,255,255,0.45)" }}
                >
                    <div className="flex justify-between items-center w-full">
                        <span>
                            {label}
                            {required && (
                                <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                            )}
                        </span>
                        {extraLabel && (
                            <span className="opacity-60 ml-2 normal-case" style={{ color: "inherit" }}>
                                {extraLabel}
                            </span>
                        )}
                    </div>
                </label>

                <input
                    ref={ref}
                    id={inputId}
                    className="form-field"
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        background: "var(--surface-1)",
                        border: `1px solid ${error ? "var(--red)" : "var(--border-strong)"}`,
                        outline: "none",
                        transition: "border-color 0.25s, box-shadow 0.25s",
                        ...(props.style || {}),
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--red)";
                        e.target.style.boxShadow = "0 0 0 1px rgba(196,30,58,0.2)";
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? "var(--red)" : "var(--border-strong)";
                        e.target.style.boxShadow = "none";
                        props.onBlur?.(e);
                    }}
                />

                {hint && !error && (
                    <span
                        id={`${inputId}-hint`}
                        className="font-classified text-[9px] tracking-[0.12em]"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                        {hint}
                    </span>
                )}

                {error && (
                    <span
                        id={`${inputId}-error`}
                        className="font-classified text-[9px] tracking-[0.12em]"
                        style={{ color: "var(--red)" }}
                        role="alert"
                    >
                        ⚠ {error.message}
                    </span>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";

/* ─── Select Dropdown ────────────────────────────────────── */

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: readonly string[];
    error?: FieldError;
    placeholder?: string;
    required?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, options, error, placeholder = "Select...", required, id, ...props }, ref) => {
        const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={selectId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : "rgba(255,255,255,0.45)" }}
                >
                    {label}
                    {required && (
                        <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                    )}
                </label>

                <select
                    ref={ref}
                    id={selectId}
                    className="form-field"
                    aria-invalid={!!error}
                    {...props}
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        background: "var(--surface-1)",
                        border: `1px solid ${error ? "var(--red)" : "var(--border-strong)"}`,
                        outline: "none",
                        appearance: "none",
                        cursor: "pointer",
                        transition: "border-color 0.25s",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "40px",
                        ...(props.style || {}),
                    }}
                >
                    <option value="" disabled style={{ color: "rgba(255,255,255,0.25)" }}>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt} style={{ background: "#0E0E11", color: "#F0EDE8" }}>
                            {opt}
                        </option>
                    ))}
                </select>

                {error && (
                    <span
                        className="font-classified text-[9px] tracking-[0.12em]"
                        style={{ color: "var(--red)" }}
                        role="alert"
                    >
                        ⚠ {error.message}
                    </span>
                )}
            </div>
        );
    }
);

FormSelect.displayName = "FormSelect";

/* ─── Textarea ───────────────────────────────────────────── */

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
    hint?: string;
    required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, hint, required, id, ...props }, ref) => {
        const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={textareaId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : "rgba(255,255,255,0.45)" }}
                >
                    {label}
                    {required && (
                        <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                    )}
                </label>

                <textarea
                    ref={ref}
                    id={textareaId}
                    aria-invalid={!!error}
                    rows={3}
                    {...props}
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        background: "var(--surface-1)",
                        border: `1px solid ${error ? "var(--red)" : "var(--border-strong)"}`,
                        outline: "none",
                        resize: "vertical",
                        minHeight: "80px",
                        transition: "border-color 0.25s, box-shadow 0.25s",
                        ...(props.style || {}),
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--red)";
                        e.target.style.boxShadow = "0 0 0 1px rgba(196,30,58,0.2)";
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? "var(--red)" : "var(--border-strong)";
                        e.target.style.boxShadow = "none";
                        props.onBlur?.(e);
                    }}
                />

                {hint && !error && (
                    <span
                        className="font-classified text-[9px] tracking-[0.12em]"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                        {hint}
                    </span>
                )}

                {error && (
                    <span
                        className="font-classified text-[9px] tracking-[0.12em]"
                        style={{ color: "var(--red)" }}
                        role="alert"
                    >
                        ⚠ {error.message}
                    </span>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = "FormTextarea";

/* ─── Checkbox ───────────────────────────────────────────── */

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    error?: FieldError;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
    ({ label, error, id, ...props }, ref) => {
        const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1">
                <label
                    htmlFor={checkboxId}
                    className="flex items-start gap-3 cursor-pointer group"
                >
                    <input
                        ref={ref}
                        type="checkbox"
                        id={checkboxId}
                        className="sr-only peer"
                        aria-invalid={!!error}
                        {...props}
                    />
                    {/* Custom checkbox */}
                    <div
                        className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center
                       peer-checked:border-[var(--red)] peer-checked:bg-[var(--red)]
                       transition-all duration-200"
                        style={{
                            border: `1px solid ${error ? "var(--red)" : "var(--border-strong)"}`,
                            background: "var(--surface-1)",
                        }}
                    >
                        <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            className="opacity-0 peer-checked:opacity-100 transition-opacity"
                        >
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <span
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
                    >
                        {label}
                    </span>
                </label>

                {error && (
                    <span
                        className="font-classified text-[9px] tracking-[0.12em] ml-8"
                        style={{ color: "var(--red)" }}
                        role="alert"
                    >
                        ⚠ {error.message}
                    </span>
                )}
            </div>
        );
    }
);

FormCheckbox.displayName = "FormCheckbox";
