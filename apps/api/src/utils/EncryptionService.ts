import { CipherGCMTypes, createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class EncryptionService {
  constructor(private readonly key: string, private readonly algorithm: CipherGCMTypes) {}

  encryptValues(keyPlainTextPair: Record<string, string>) {
    if (!keyPlainTextPair) return {};

    return Object.fromEntries(
      Object.entries(keyPlainTextPair).map(([key, value]) => {
        return [key, this.encrypt(value)];
      })
    );
  }

  decryptValues(keyCipherTextPair: Record<string, string>) {
    if (!keyCipherTextPair) return {};

    return Object.fromEntries(
      Object.entries(keyCipherTextPair).map(([key, value]) => {
        return [key, this.decrypt(value)];
      })
    );
  }

  encrypt(plainText: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.key, 'hex'), iv);

    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    return `${iv.toString('hex')}.${encrypted.toString('hex')}.${cipher
      .getAuthTag()
      .toString('hex')}`;
  }

  decrypt(cipherText: string) {
    const [iv, encrypted, authTag] = cipherText.split('.');
    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(this.key, 'hex'),
      Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    return Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]).toString();
  }
}
