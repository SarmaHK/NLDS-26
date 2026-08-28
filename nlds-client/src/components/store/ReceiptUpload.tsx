"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, X, FileText, Image as ImageIcon } from "lucide-react";

interface ReceiptUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const ACCEPTED_EXT = ["jpg", "jpeg", "png", "pdf"];
const MAX_SIZE_MB = 10;

export default function ReceiptUpload({ file, onChange, error }: ReceiptUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateAndSet(f: File) {
    setValidationError(null);
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_EXT.includes(ext) && !ACCEPTED_TYPES.includes(f.type)) {
      setValidationError("Invalid file type. Accepted: JPG, JPEG, PNG, PDF");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setValidationError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }
    onChange(f);
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) validateAndSet(dropped);
  };

  const secured = Boolean(file);
  const displayError = validationError || error;
  const isPDF = file?.type === "application/pdf" || file?.name.endsWith(".pdf");

  return (
    <div
      className="rounded-[4px] overflow-hidden"
      style={{
        background: "#0a0a0c",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 sm:px-8 sm:py-6 flex items-center gap-3"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div style={{ width: 8, height: 8, background: "var(--red)", borderRadius: "50%", boxShadow: "0 0 10px rgba(196,30,58,0.5)" }} />
        <span
          className="font-classified font-bold"
          style={{ fontSize: "11px", letterSpacing: "0.26em", color: "#ffffff" }}
        >
          UPLOAD PAYMENT RECEIPT
        </span>
        <span
          className="font-classified font-bold ml-auto"
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "var(--red)",
            background: "rgba(196,30,58,0.15)",
            border: "1px solid rgba(196,30,58,0.3)",
            padding: "2px 7px",
            borderRadius: "2px",
          }}
        >
          REQUIRED
        </span>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <p
          style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.25rem" }}
        >
          Upload your payment receipt to complete the mission authorization.
        </p>

        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload payment receipt"
          className={`reg-upload ${isDragging ? "reg-upload--active" : ""} ${secured ? "reg-upload--secured" : ""}`}
          style={{ minHeight: 160 }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => !secured && inputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !secured) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/jpg,image/png,application/pdf"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) validateAndSet(f); }}
            id="receipt-upload-input"
          />

          <AnimatePresence mode="wait">
            {secured && file ? (
              <motion.div
                key="secured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                {isPDF ? (
                  <FileText className="w-8 h-8" style={{ color: "var(--text)" }} strokeWidth={1.25} />
                ) : (
                  <CheckCircle className="w-8 h-8" style={{ color: "var(--text)" }} strokeWidth={1.25} />
                )}
                <span
                  className="font-classified"
                  style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--text)" }}
                >
                  ✓ RECEIPT SECURED
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", maxWidth: 280, wordBreak: "break-all" }}
                >
                  {file.name} · {formatBytes(file.size)}
                </span>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                    className="font-classified px-3 py-1.5 transition-colors hover:border-white/30"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.5)",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      cursor: "pointer",
                    }}
                  >
                    REPLACE
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onChange(null); setValidationError(null); }}
                    className="flex items-center gap-1 font-classified px-3 py-1.5 transition-colors"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "rgba(196,30,58,0.6)",
                      background: "transparent",
                      border: "1px solid rgba(196,30,58,0.15)",
                      cursor: "pointer",
                    }}
                  >
                    <X size={9} />
                    REMOVE
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <Upload
                  className={`w-8 h-8 transition-colors ${isDragging ? "text-[var(--red)]" : "text-white/25"}`}
                  strokeWidth={1.25}
                />
                <span
                  className="font-classified"
                  style={{ fontSize: "11px", letterSpacing: "0.22em", color: isDragging ? "var(--red)" : "rgba(255,255,255,0.6)" }}
                >
                  {isDragging ? "DROP TO UPLOAD" : "DROP YOUR RECEIPT HERE"}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  JPG · PNG · PDF · MAX {MAX_SIZE_MB} MB
                </span>
                <span
                  className="font-classified px-3 py-1.5 mt-1"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  CHOOSE FILE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error state */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 mt-3 p-2"
            style={{ background: "rgba(196,30,58,0.06)", border: "1px solid rgba(196,30,58,0.2)" }}
          >
            <AlertCircle size={13} style={{ color: "var(--red)", flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: "11px", color: "var(--red)", lineHeight: 1.5 }}>{displayError}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
