// API Base URL from environment variables
const API_URL =
    (import.meta.env.VITE_API_URL || "http://localhost:5000")
        .replace(/\/+$/, "");

export const apiCall = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const normalizedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;
    const url = `${API_URL}${normalizedEndpoint}`;
    
    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
    }

    return response.json();
};

export default API_URL;
