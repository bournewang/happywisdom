export async function loadJson(path: string) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading JSON from ${path}:`, error);
        throw error;
    }
} 