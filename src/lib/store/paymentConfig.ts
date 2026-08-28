/**
 * NLDS'26 Store — Payment Configuration
 *
 * ⚠️  IMPORTANT: Replace ALL placeholder values below with the official
 * NLDS'26 bank account details before going live.
 *
 * These values are displayed to the customer on the checkout page.
 * The receipt upload is also required before order submission.
 */

export interface PaymentConfig {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  referenceFormat: string; // Describes how to format the payment reference
  referenceExample: string;
}

/**
 * REPLACE THESE VALUES WITH THE OFFICIAL BANK DETAILS.
 */
export const PAYMENT_CONFIG: PaymentConfig = {
  bankName: "PEOPLE'S BANK",
  accountName: "AIESEC IN SRI LANKA",
  accountNumber: "XXXX XXXX XXXX XXXX", // ← Replace with real account number
  branch: "YOUR BRANCH NAME",            // ← Replace with real branch
  referenceFormat: "Your full name + NLDS26 (e.g. JOHN DOE NLDS26)",
  referenceExample: "JOHN DOE NLDS26",
};
