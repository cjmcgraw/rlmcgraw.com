// webapp/src/utils/musingsLoader.ts
export interface MusingMetadata {
    title: string;
    excerpt: string;
    date: string;
    path: string;
    component?: React.ComponentType;
}

// Dynamically import all musings
const musingsContext = require.context('../routes/musings', false, /^\.\/[^/]+\.tsx$/);

export const loadMusings = (): MusingMetadata[] => {
    const musings: MusingMetadata[] = [];
    
    musingsContext.keys().forEach((key) => {
        // Skip index.tsx
        if (key === './index.tsx') return;
        
        const module = musingsContext(key);
        const filename = key.replace('./', '').replace('.tsx', '');
        
        // Each musing should export metadata
        if (module.metadata) {
            musings.push({
                ...module.metadata,
                path: `/musings/${filename}`,
                component: module.default
            });
        }
    });
    
    // Sort by date descending
    return musings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};