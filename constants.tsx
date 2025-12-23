
import React from 'react';
import { SRSSectionType, Requirement } from './types';

export const SRS_DATA: Record<SRSSectionType, { title: string; subtitle: string; requirements?: Requirement[]; rawText?: string }> = {
  [SRSSectionType.INTRODUCTION]: {
    title: "1. Introduction",
    subtitle: "Foundational purpose and scope for CementFlow ERP",
    rawText: `
      **Purpose:** The goal of this software is to digitize and streamline the daily operations of a small-to-medium retail and wholesale cement shop. It replaces manual ledger entries with a robust digital platform for tracking stock, managing credit sales, and automating billing.

      **Scope:** 
      - End-to-end inventory tracking of various cement grades (OPC 43, OPC 53, PPC).
      - Multi-payment Billing (Cash, UPI, Credit, Card).
      - Supplier (Company) Payment Management for procurement.
      - Customer Ledger management with outstanding balance tracking.
      - Integrated reporting for profitability and tax (GST) compliance.

      **Intended Users:**
      - Shop Owner (Full access to reports & financial ledgers).
      - Billing Clerks (POS & Customer registration).
      - Inventory Managers (Stock updates & supplier receipts).
    `
  },
  [SRSSectionType.FUNCTIONAL]: {
    title: "2. Functional Requirements",
    subtitle: "Core business logic and system features",
    requirements: [
      {
        id: "FR-01",
        title: "Inventory Storage & Tracking",
        description: "Maintain a real-time count of cement bags including historical logs for incoming (stock-in) and outgoing (sales) quantities.",
        priority: "High",
        examples: ["Low stock alerts at 50 bags", "Log of stock received from manufacturers", "Batch number tracking"]
      },
      {
        id: "FR-02",
        title: "Billing & POS",
        description: "A fast-entry interface for sales transactions with GST calculation and immediate inventory deduction.",
        priority: "High",
        examples: ["Split payments", "Print thermal receipts", "Automatic inventory sync"]
      },
      {
        id: "FR-03",
        title: "Accounts Payable (Company Payments)",
        description: "Track and record payments made to cement companies/suppliers for stock procurement.",
        priority: "High",
        examples: ["Record bank transfer reference", "Track credit period from supplier", "Payment due reminders"]
      },
      {
        id: "FR-04",
        title: "Outstanding Payment Tracking (Accounts Receivable)",
        description: "Manage customer credit ledgers with aging analysis and credit limits.",
        priority: "High",
        examples: ["Customer credit statement generation", "SMS reminders for pending dues", "Total outstanding dashboard"]
      },
      {
        id: "FR-05",
        title: "Logistics & Delivery",
        description: "Track delivery from warehouse to site including vehicle and driver details.",
        priority: "Medium",
        examples: ["Vehicle number logging", "Delivery status tracking"]
      }
    ]
  },
  [SRSSectionType.NON_FUNCTIONAL]: {
    title: "3. Non-Functional Requirements",
    subtitle: "Quality attributes and constraints",
    requirements: [
      {
        id: "NFR-01",
        title: "Data Integrity",
        description: "Financial records must be immutable. Every stock movement must have a corresponding transaction ID.",
        priority: "High"
      },
      {
        id: "NFR-02",
        title: "Security",
        description: "Role-based Access Control (RBAC). Clerk cannot modify supplier payment records.",
        priority: "High"
      },
      {
        id: "NFR-03",
        title: "Usability",
        description: "Simplified UI for high-speed counter operations. Mobile-friendly view for yard managers.",
        priority: "Medium"
      },
      {
        id: "NFR-04",
        title: "Reliability",
        description: "Automatic cloud backups and offline-first billing capability.",
        priority: "High"
      }
    ]
  },
  [SRSSectionType.TECHNICAL]: {
    title: "4. Technical Requirements",
    subtitle: "Stack and hardware specifications",
    rawText: `
      **Platform:** 
      - Web Application (React/TypeScript).
      - Cross-platform mobile access.

      **Database:**
      - PostgreSQL for relational transaction and ledger data.

      **Hardware:**
      - Desktop/Tablet with internet connectivity.
      - Thermal Receipt Printer.

      **Hosting:**
      - Managed cloud environment (AWS/Vercel).
    `
  },
  [SRSSectionType.OPTIONAL]: {
    title: "5. Optional/Future Features",
    subtitle: "Growth-oriented enhancements",
    requirements: [
      {
        id: "OPT-01",
        title: "Tally Integration",
        description: "Export daily sales and payment data to Tally XML format.",
        priority: "Low"
      },
      {
        id: "OPT-02",
        title: "Multi-Store Management",
        description: "Track stock and payments across multiple branch locations.",
        priority: "Low"
      }
    ]
  }
};
