import {
  CipherCCMTypes,
  CipherGCMTypes,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';

export class EncryptionService {
  constructor(
    private readonly key: string,
    private readonly algorithm: CipherCCMTypes | CipherGCMTypes
  ) {}

  encryptValues(keyPlainTextPair: Record<string, string>) {
    return Object.fromEntries(
      Object.entries(keyPlainTextPair).map(([key, value]) => {
        return [key, this.encrypt(value)];
      })
    );
  }

  decryptValues(keyCipherTextPair: Record<string, string>) {
    return Object.fromEntries(
      Object.entries(keyCipherTextPair).map(([key, value]) => {
        return [key, this.decrypt(value)];
      })
    );
  }

  encrypt(plainText: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.key), iv);

    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
  }

  decrypt(cipherText: string) {
    const [iv, encrypted] = cipherText.split('.');
    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      Buffer.from(iv, 'hex')
    );

    return Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]).toString();
  }
}
