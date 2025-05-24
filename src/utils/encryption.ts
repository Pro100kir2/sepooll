import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

// Generate a random public key
export const generatePublicKey = (): string => {
  return uuidv4().substr(0, 16);
};

// Generate a random private key
export const generatePrivateKey = (): string => {
  return uuidv4().substr(0, 32);
};

// Encrypt a message using the key
export const encryptMessage = (message: string, key: string): string => {
  try {
    return CryptoJS.AES.encrypt(message, key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return message;
  }
};

// Decrypt a message using the key
export const decryptMessage = (encryptedMessage: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedMessage;
  }
};

// Check if a message can be decrypted with the given key
export const canDecrypt = (encryptedMessage: string, key: string): boolean => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText.length > 0;
  } catch (error) {
    return false;
  }
};

// Encrypt file data
export const encryptFile = async (file: File, key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        if (!event.target || !event.target.result) {
          reject(new Error('Failed to read file'));
          return;
        }

        const fileContent = event.target.result.toString();
        const encrypted = CryptoJS.AES.encrypt(fileContent, key).toString();
        resolve(encrypted);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsDataURL(file);
  });
};

// Decrypt file data
export const decryptFile = (encryptedData: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('File decryption error:', error);
    throw new Error('Decryption failed');
  }
};