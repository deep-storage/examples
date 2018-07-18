import { DeepStorage, deepStorage } from "deep-storage";

export interface AuthenticationDeepState {
  token?: string;
  started: boolean;
}

export interface Authentication {
  loggedIn: boolean;
  started: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  start: () => Promise<boolean>;
  logOut: () => Promise<void>;
  storage: DeepStorage<AuthenticationDeepState>;
}

export default class MockAuthentication
  implements Authentication {
  public storage: DeepStorage<AuthenticationDeepState>;

  constructor() {
    this.storage = deepStorage({
      started: false
    });
  }

  get loggedIn() {
    return !!this.storage.state.token;
  }
  get started() {
    return !!this.storage.state.started;
  }
  public start = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await this.storage.deep("token").set(token);
        return true;
      }
      return false;
    } finally {
      await this.storage.deep("started").set(true);
    }
  };
  public login = async (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      const token = "token";
      await this.storage.deep("token").set(token);
      localStorage.setItem("token", token);
      return true;
    } else {
      return false;
    }
  };
  public logOut = async () => {
    await this.storage.deep("token").update(() => undefined);
    localStorage.removeItem("token");
  };
}
