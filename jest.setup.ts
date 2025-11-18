import '@testing-library/jest-dom'
import { webcrypto } from 'crypto';

// Polyfill para crypto.randomUUID no ambiente de testes
if (!global.crypto) {
  (global as any).crypto = webcrypto;
}

if (!global.crypto.randomUUID) {
  (global.crypto as any).randomUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
