import { API_URL } from "@commons/utils/constans/api";
import { tokenKey } from "@commons/utils/constans/header";
import { parseCookies } from "nookies";
import { CreatePostInterface } from "./dto";

class RevoApi {
  private apiUrl: string;
  private cookies: {
    [key: string]: string;
  };

  constructor() {
    this.apiUrl = API_URL;
    this.cookies = parseCookies();
  }

  public async login(email: string, password: string) {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    return response.json();
  }

  public async getFollowingPosts() {
    const response = await fetch(`${this.apiUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.cookies[tokenKey]}`,
      },
    });

    return response.json();
  }

  public async createPost(data: CreatePostInterface) {
    const response = await fetch(`${this.apiUrl}/posts`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.cookies[tokenKey]}`,
      },
    });

    return response.json();
  }
}

export const revoApi = new RevoApi();
