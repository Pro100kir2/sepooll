export interface Room {
  id: string;
  name: string;
  description: string;
  password?: string;
  publicKey: string;
  privateKey: string;
  userCount?: number;
  createdAt: Date;
}

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  url?: string;
}

export interface Message {
  id: string;
  content: string;
  type: string;
  sender: string;
  timestamp: Date;
  file?: FileInfo;
}

export interface EncryptionStatus {
  isEncrypted: boolean;
  hasKey: boolean;
  key?: string;
}