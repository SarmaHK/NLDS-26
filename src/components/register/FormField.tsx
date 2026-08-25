"use client";

import { forwardRef, useState } from "react";
import { type FieldError } from "react-hook-form";

function fieldClass(error?: FieldError, filled?: boolean) {
    return `reg-field ${!error && filled ? "reg-field--valid" : ""}`;
}

/* ─── Text / Email / Date / Tel Input ────────────────────── */

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    hint?: string;
    extraLabel?: string;
    required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, hint, extraLabel, required, id, className, onChange, onFocus, onBlur, defaultValue, value, ...props }, ref) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
        const [filled, setFilled] = useState(() => Boolean(value ?? defaultValue));

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={inputId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : filled ? "rgba(240,237,232,0.72)" : "rgba(255,255,255,0.45)" }}
                >
                    <div className="flex justify-between items-center w-full gap-3">
                        <span>
                            {label}
                            {required && (
                                <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                            )}
                        </span>
                        {extraLabel && (
                            <span className="opacity-70 ml-2 normal-case tracking-normal font-sans text-[10px]" style={{ color: "inherit" }}>
                                {extraLabel}
                            </span>
                        )}
                    </div>
                </label>

                <input
                    ref={ref}
                    id={inputId}
                    className={`${fieldClass(error, filled)} ${className ?? ""}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    value={value}
                    defaultValue={defaultValue}
                    {...props}
                    onChange={(e) => {
                        setFilled(e.target.value.trim().length > 0);
                        onChange?.(e);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                <div className="min-h-[18px] flex items-start">
                    {error ? (
                        <span
                            id={`${inputId}-error`}
                            className="font-classified text-[9px] tracking-[0.12em]"
                            style={{ color: "var(--red)" }}
                            role="alert"
                        >
                            ⚠ {error.message}
                        </span>
                    ) : hint ? (
                        <span
                            id={`${inputId}-hint`}
                            className="font-sans text-[11px]"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                            {hint}
                        </span>
                    ) : null}
                </div>
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
    ({ label, options, error, placeholder = "Select...", required, id, onChange, defaultValue, value, ...props }, ref) => {
        const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
        const [filled, setFilled] = useState(() => Boolean(value ?? defaultValue));

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={selectId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : filled ? "rgba(240,237,232,0.72)" : "rgba(255,255,255,0.45)" }}
                >
                    {label}
                    {required && (
                        <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                    )}
                </label>

                <select
                    ref={ref}
                    id={selectId}
                    className={fieldClass(error, filled)}
                    aria-invalid={!!error}
                    value={value}
                    defaultValue={defaultValue}
                    {...props}
                    style={{
                        appearance: "none",
                        cursor: "pointer",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "40px",
                        ...(props.style || {}),
                    }}
                    onChange={(e) => {
                        setFilled(e.target.value.trim().length > 0);
                        onChange?.(e);
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

                <div className="min-h-[18px] flex items-start">
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
    ({ label, error, hint, required, id, onChange, defaultValue, value, ...props }, ref) => {
        const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");
        const [filled, setFilled] = useState(() => Boolean(value ?? defaultValue));

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={textareaId}
                    className="font-classified text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: error ? "var(--red)" : filled ? "rgba(240,237,232,0.72)" : "rgba(255,255,255,0.45)" }}
                >
                    {label}
                    {required && (
                        <span style={{ color: "var(--red)", marginLeft: "4px" }}>*</span>
                    )}
                </label>

                <textarea
                    ref={ref}
                    id={textareaId}
                    className={fieldClass(error, filled)}
                    aria-invalid={!!error}
                    rows={3}
                    value={value}
                    defaultValue={defaultValue}
                    style={{
                        resize: "vertical",
                        minHeight: "96px",
                        ...(props.style || {}),
                    }}
                    {...props}
                    onChange={(e) => {
                        setFilled(e.target.value.trim().length > 0);
                        onChange?.(e);
                    }}
                />

                <div className="min-h-[18px] flex items-start">
                    {error ? (
                        <span
                            className="font-classified text-[9px] tracking-[0.12em]"
                            style={{ color: "var(--red)" }}
                            role="alert"
                        >
                            ⚠ {error.message}
                        </span>
                    ) : hint ? (
                        <span
                            className="font-sans text-[11px]"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                            {hint}
                        </span>
                    ) : null}
                </div>
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
