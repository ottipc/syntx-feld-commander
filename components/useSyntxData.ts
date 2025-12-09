import { useState, useEffect } from 'react';

// Basis-URL für die ECHTE API, basierend auf deinem Output
const API_BASE_URL = 'https://dev.syntx-system.com'; 

// Definierte Typen für den Zustand des Hooks
interface SyntxDataState<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
}

/**
 * Custom Hook zum Abrufen von Daten von der ECHTEN Syntx-API.
 * @param endpoint Der spezifische Endpunkt, z.B. '/feld/drift'.
 * @returns Ein Objekt mit data, isLoading und isError.
 */
export function useSyntxData<T>(endpoint: string): SyntxDataState<T> {
    const [state, setState] = useState<SyntxDataState<T>>({
        data: null,
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        // Die API-Endpunkte aus deinem Output scheinen keine /v1/ Präfix zu benötigen.
        const fullUrl = `${API_BASE_URL}${endpoint}`;

        const fetchData = async () => {
            // Setze Ladezustand, wenn eine neue Anfrage startet
            setState(prev => ({ ...prev, isLoading: true, isError: false }));
            
            try {
                // Keine künstliche Latenz mehr, da wir die echte API verwenden
                const response = await fetch(fullUrl, {
                    // Füge hier bei Bedarf Header (z.B. Authorization) hinzu
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status} von URL: ${fullUrl}`);
                }

                const result = await response.json();
                
                setState({
                    data: result as T,
                    isLoading: false,
                    isError: false,
                });

            } catch (error) {
                console.error(`[SYNTX-API-FEHLER] Fehler beim Abrufen von ${fullUrl}:`, error);
                setState(prev => ({
                    ...prev,
                    data: null,
                    isLoading: false,
                    isError: true,
                }));
            }
        };

        fetchData();
        
        // Polling (alle 30 Sekunden) beibehalten
        const intervalId = setInterval(fetchData, 30000); 

        return () => clearInterval(intervalId); // Cleanup
    }, [endpoint]); 

    return state;
}
