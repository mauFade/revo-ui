import { API_URL } from "@commons/utils/constans/api";
import { CreatePostInterface, LikePostInterface } from "./dto";
import secureLocalStorage from "react-secure-storage";

class RevoApi {
  private apiUrl: string;
  private token: string;

  constructor() {
    const token = secureLocalStorage.getItem("user-data") as string;

    this.apiUrl = API_URL;
    this.token = token;
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
        Authorization: `Bearer ${this.token}`,
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
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response.json();
  }

  public async likePost(data: LikePostInterface) {
    const response = await fetch(`${this.apiUrl}/posts/like`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response.json();
  }
}

export const revoApi = new RevoApi();
