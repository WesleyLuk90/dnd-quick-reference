export class HttpService {
    static async getJson<T>(path: string): Promise<T> {
        return fetch(path).then(t => t.json());
    }
}
