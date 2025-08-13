import { auth } from '../firebase';

export async function getIdToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (user) return user.getIdToken();
    return null;
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = await getIdToken();
    const headers = {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
