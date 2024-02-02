import { NEWS_API_KEY, NEWS_API_URL } from "@commons/utils/constans/api";

class NewsApi {
  private url: string;
  private apiKey: string;

  constructor() {
    this.url = NEWS_API_URL;
    this.apiKey = NEWS_API_KEY;
  }

  public async getTechNews() {
    const response = await fetch(
      `${this.url}/top-headlines?country=us&category=technology&apiKey=${this.apiKey}`
    );

    return response.json();
  }
}

export const newsApi = new NewsApi();
