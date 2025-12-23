
export enum SRSSectionType {
  INTRODUCTION = 'INTRODUCTION',
  FUNCTIONAL = 'FUNCTIONAL',
  NON_FUNCTIONAL = 'NON_FUNCTIONAL',
  TECHNICAL = 'TECHNICAL',
  OPTIONAL = 'OPTIONAL'
}

export enum ViewMode {
  SPECIFICATION = 'SPECIFICATION',
  PROTOTYPE = 'PROTOTYPE'
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  examples?: string[];
}

export interface InventoryItem {
  id: string;
  brand: string;
  grade: string;
  stock: number;
  price: number;
  unit: string;
}

export interface Supplier {
  id: string;
  name: string;
  outstandingBalance: number;
  lastPaymentDate: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
