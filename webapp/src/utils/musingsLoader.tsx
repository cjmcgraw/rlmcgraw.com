// webapp/src/utils/musingsLoader.ts
export interface MusingMetadata {
    title: string;
    excerpt: string;
    date: string;
    slug: string; // Just the filename/slug, not full path
    component?: React.ComponentType;
}

// Dynamically import all musings
const musingsContext = require.context('../routes/musings', false, /^\.\/[^/]+\.tsx$/);

export const loadMusings = (): MusingMetadata[] => {
    const musings: MusingMetadata[] = [];
    
    musingsContext.keys().forEach((key) => {
        // Skip index.tsx and MusingPage.tsx
        if (key === './index.tsx' || key === './MusingPage.tsx') return;
        
        const module = musingsContext(key);
        const filename = key.replace('./', '').replace('.tsx', '');
        
        // Each musing should export metadata
        if (module.metadata) {
            musings.push({
                ...module.metadata,
                slug: filename, // Store just the slug
                component: module.default
            });
        }
    });
    
    // Sort by date descending
    return musings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};