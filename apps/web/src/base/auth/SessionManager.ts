import decodeJwt from 'jwt-decode';

type AuthPayload = {
  id: string;
  avatarUrl: string;
  displayName: string;
  email: Email;
};

type Email = string;

type Store = {
  displayName: string;
  avatarUrl: string;
  token: string;
};

export class SessionManager {
  private static readonly SESSION_KEY = 'the-secret-store';

  private getStorageKey() {
    return SessionManager.SESSION_KEY;
  }

  private static getStorage(): Store {
    return JSON.parse(sessionStorage.getItem(SessionManager.SESSION_KEY) ?? '{}');
  }

  private static setStorage(value: Store) {
    sessionStorage.setItem(SessionManager.SESSION_KEY, JSON.stringify(value));
  }

  private static clearStorage() {
    sessionStorage.removeItem(SessionManager.SESSION_KEY);
  }

  constructor(private store: Store = SessionManager.getStorage()) {}

  public isAuthenticated(): boolean {
    return !!this.store.token;
  }

  public getToken(): string {
    return this.store.token;
  }

  public getDisplayName(): string {
    return this.store.displayName;
  }

  public getAvatarUrl(): string {
    return this.store.avatarUrl;
  }

  public clearSession(): void {
    SessionManager.clearStorage();
    this.store = SessionManager.getStorage();
  }

  public setSession(token: string) {
    const { displayName, avatarUrl } = decodeJwt(token) as AuthPayload;
    SessionManager.setStorage({
      avatarUrl,
      displayName,
      token,
    });
  }
}
