"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, AlertCircle, File, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
    label: string;
    accept: string;
    maxSizeMB: number;
    uploadUrl: string;
    onUploadSuccess: (fileId: string) => void;
    currentFileId?: string; // If already uploaded
    hint?: string;
    icon?: "document" | "image";
}

export function FileUpload({ label, accept, maxSizeMB, uploadUrl, onUploadSuccess, currentFileId, hint, icon = "document" }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(currentFileId ? "Uploaded successfully (hidden per secure sync)" : null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const IconElement = icon === "document" ? File : ImageIcon;

    const handleUpload = async (file: File) => {
        setError(null);

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        let validTypes = [];
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

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(uploadUrl, {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed.");
            }

            setFileName(data.fileName);
            onUploadSuccess(data.fileId); // Secure internal drive ID
        } catch (err: any) {
            // Next.js intercepts raw console.errors aggressively; suppress overlay visually:
            setError(err.message || "Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    };

    return (
        <div className="flex flex-col gap-2 relative z-10 w-full mb-6">
            <label className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                {label}
            </label>
            <div
                className={`w-full group relative flex flex-col items-center justify-center p-6 border-2 border-dashed transition-all duration-300 font-mono text-sm leading-relaxed overflow-hidden cursor-pointer
                    ${isDragging ? "border-[var(--red)] bg-[rgba(196,30,58,0.05)]" : (fileName ? "border-[--cyan] bg-[rgba(6,182,212,0.05)]" : "border-gray-800 bg-gray-900/50")}
                    hover:border-gray-600`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={accept}
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />

                <AnimatePresence mode="wait">
                    {isUploading ? (
                        <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[var(--red)] border-t-transparent animate-spin" />
                            <span className="text-gray-400">Uploading secured transmission...</span>
                        </motion.div>
                    ) : fileName ? (
                        <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-3 w-full">
                            <CheckCircle className="w-8 h-8 text-[var(--cyan)]" />
                            <span className="text-[var(--cyan)] text-center break-all">{fileName}</span>
                            <span className="text-gray-500 text-xs uppercase tracking-wide mt-2 px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">Click to Replace</span>
                        </motion.div>
                    ) : (
                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-3">
                            <Upload className={`w-8 h-8 transition-colors ${isDragging ? "text-[var(--red)]" : "text-gray-500 group-hover:text-[var(--red)]"}`} />
                            <span className="text-gray-300">DROP YOUR FILE HERE OR CLICK TO BROWSE</span>
                            <span className="text-gray-500 text-xs">{(accept.includes("pdf") ? "PDF" : "JPG / PNG / WEBP")} &bull; MAX {maxSizeMB} MB</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <div className="flex items-start gap-2 mt-1 text-[var(--red)] text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-[2px]" />
                    <span>{error}</span>
                </div>
            )}
            {!error && hint && !fileName && (
                <div className="text-xs text-gray-500 mt-1">{hint}</div>
            )}

            {fileName && !error && (
                <div className="text-xs text-[var(--cyan)] mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> SECURE DRIVELINK ENCRYPTED & LINKED
                </div>
            )}
        </div>
    );
}
