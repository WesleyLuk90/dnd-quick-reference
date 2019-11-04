const cache: Map<string, Promise<any>> = new Map();

export class HttpService {
    static async getJson<T>(path: string): Promise<T> {
        if (cache.has(path)) {
            return cache.get(path);
        }
        const promise = fetch(path).then(t => t.json());
        cache.set(path, promise);
        return promise;
    }
}
