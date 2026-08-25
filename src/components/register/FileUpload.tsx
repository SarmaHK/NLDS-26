"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, File, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
    label: string;
    accept: string;
    maxSizeMB: number;
    uploadUrl: string;
    onUploadSuccess: (fileId: string) => void;
    currentFileId?: string;
    hint?: string;
    icon?: "document" | "image";
    classification?: string;
    dropLabel?: string;
    successLabel?: string;
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
    label,
    accept,
    maxSizeMB,
    uploadUrl,
    onUploadSuccess,
    currentFileId,
    hint,
    icon = "document",
    classification,
    dropLabel,
    successLabel,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(currentFileId ? "File secured" : null);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const IconElement = icon === "document" ? File : ImageIcon;
    const acceptSummary = accept.includes("pdf") ? "PDF" : "JPG / PNG / WEBP";
    const inputId = `upload-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const handleUpload = async (file: File) => {
        setError(null);

        const fileExt = file.name.split(".").pop()?.toLowerCase();
        const validTypes: string[] = [];
        if (accept.includes("pdf")) validTypes.push("pdf");
        if (accept.includes("jpeg")) validTypes.push("jpeg", "jpg");
        if (accept.includes("png")) validTypes.push("png");
        if (accept.includes("webp")) validTypes.push("webp");

        if (fileExt && !validTypes.includes(fileExt)) {
            setError(`Invalid file type. Accepted: ${validTypes.join(", ").toUpperCase()}`);
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File is too large. Maximum size is ${maxSizeMB} MB.`);
            return;
        }

        setIsUploading(true);
        setProgress(null);

        try {
            const data = await uploadWithProgress(uploadUrl, file, (pct) => setProgress(pct));
            setFileName(data.fileName || file.name);
            setFileSize(formatBytes(file.size));
            onUploadSuccess(data.fileId);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Upload failed. Please try again.";
            setError(message);
        } finally {
            setIsUploading(false);
            setProgress(null);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    };

    const openPicker = () => {
        if (!isUploading) fileInputRef.current?.click();
    };

    const secured = Boolean(fileName) && !isUploading;

    return (
        <div className="flex flex-col gap-2 relative z-10 w-full mb-2">
            {classification && (
                <span className="label-classified">{classification}</span>
            )}
            <label htmlFor={inputId} className="font-classified text-[10px] tracking-[0.22em] uppercase text-white/50">
                {label}
            </label>
            <div
                role="button"
                tabIndex={0}
                aria-label={label}
                className={`reg-upload ${isDragging || isUploading ? "reg-upload--active" : ""} ${secured ? "reg-upload--secured" : ""}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={openPicker}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openPicker();
                    }
                }}
            >
                <input
                    id={inputId}
                    type="file"
                    ref={fileInputRef}
                    className="sr-only"
                    accept={accept}
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />

                <AnimatePresence mode="wait">
                    {isUploading ? (
                        <motion.div
                            key="uploading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-3 w-full"
                        >
                            <span className="font-classified text-[11px] tracking-[0.28em] text-white/80">
                                UPLOADING...
                            </span>
                            <div className={`reg-progress ${progress == null ? "reg-progress--indet" : ""}`}>
                                <div
                                    className="reg-progress__bar"
                                    style={progress != null ? { width: `${progress}%` } : undefined}
                                />
                            </div>
                            <span className="font-classified text-[9px] tracking-[0.2em] text-white/35">
                                {progress != null ? `SECURING FILE  ${progress}%` : "SECURING FILE"}
                            </span>
                        </motion.div>
                    ) : fileName ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-3 w-full"
                        >
                            <CheckCircle className="w-7 h-7" style={{ color: "var(--text)" }} />
                            <span className="font-classified text-[11px] tracking-[0.22em] text-white">
                                {successLabel || "✓ FILE SECURED"}
                            </span>
                            <span className="font-sans text-[13px] text-white/70 text-center w-full max-w-[240px] truncate px-3">
                                {fileName}
                                {fileSize ? `  ·  ${fileSize}` : ""}
                            </span>
                            <span className="font-classified text-[9px] tracking-[0.2em] text-white/40 border border-white/15 px-3 py-1.5">
                                REPLACE
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-3"
                        >
                            <IconElement
                                className={`w-8 h-8 transition-colors ${isDragging ? "text-[var(--red)]" : "text-white/35"}`}
                                strokeWidth={1.25}
                            />
                            <span className="font-classified text-[11px] tracking-[0.22em] text-white/80">
                                {dropLabel || "DROP YOUR FILE HERE"}
                            </span>
                            <span className="font-sans text-[11px] text-white/35">
                                {acceptSummary}  ·  MAX {maxSizeMB} MB
                            </span>
                            <span className="font-classified text-[9px] tracking-[0.2em] text-white/50 border border-white/15 px-3 py-1.5 mt-1">
                                CHOOSE FILE
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <div className="flex items-start gap-2 mt-2 text-[var(--red)] bg-[rgba(196,30,58,0.06)] border border-[rgba(196,30,58,0.2)] p-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-[1px]" />
                    <span className="font-sans text-[11px] sm:text-xs leading-relaxed break-words whitespace-pre-wrap">{error}</span>
                </div>
            )}
            {!error && hint && !fileName && (
                <div className="font-sans text-[11px] text-white/30 mt-1">{hint}</div>
            )}
        </div>
    );
}

function uploadWithProgress(
    uploadUrl: string,
    file: File,
    onProgress: (pct: number) => void
): Promise<{ fileId: string; fileName?: string }> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);

        xhr.open("POST", uploadUrl);
        xhr.withCredentials = true;

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && event.total > 0) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        };

        xhr.onload = () => {
            try {
                const data = JSON.parse(xhr.responseText || "{}");
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({ fileId: data.fileId, fileName: data.fileName });
                } else {
                    reject(new Error(data.error || "Upload failed."));
                }
            } catch {
                reject(new Error("Upload failed."));
            }
        };

        xhr.onerror = () => reject(new Error("Upload failed. Please try again."));
        xhr.send(formData);
    });
}
