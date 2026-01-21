export const getIconsSpellChamp = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getIconsSpellChamp:', error);
        throw error; 
    }
}

