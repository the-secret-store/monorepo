export class PersistentStorageManager {
  private static readonly SESSION_KEY = 'the-secret-store';

  private static writeToStorage(value: Record<string, unknown>) {
    localStorage.setItem(PersistentStorageManager.SESSION_KEY, JSON.stringify(value));
  }

  private static getAllProperties(): Record<string, unknown> {
    return JSON.parse(localStorage.getItem(PersistentStorageManager.SESSION_KEY) ?? '{}');
  }

  static getProperty(key: string) {
    return PersistentStorageManager.getAllProperties()[key];
  }

  static setProperty(key: string, value: unknown) {
    PersistentStorageManager.writeToStorage({
      ...PersistentStorageManager.getAllProperties(),
      [key]: value,
    });
  }

  static removeProperty(key: string) {
    const storage = PersistentStorageManager.getAllProperties();
    delete storage[key];
    PersistentStorageManager.writeToStorage(storage);
  }
}
