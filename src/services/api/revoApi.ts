import { API_URL } from "@commons/utils/constans/api";

class RevoApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = API_URL;
  }

  public async login(email: string, password: string) {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    return response.json();
  }
}

export const revoApi = new RevoApi();
