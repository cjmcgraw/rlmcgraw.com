export interface MusingMetadata {
    title: string;
    excerpt: string;
    date: string;
    path: string;
    slug: string;
    component?: React.ComponentType;
}

// Dynamically import all musings
const musingsContext = require.context('../routes/musings', false, /^\.\/[^/]+\.tsx$/);

export const loadMusings = (): MusingMetadata[] => {
    const musings: MusingMetadata[] = [];
    
    musingsContext.keys().forEach((key) => {
        // Skip index.tsx and template files
        if (key === './index.tsx' || key.includes('template') || key.includes('MusingPage')) return;
        
        const module = musingsContext(key);
        const filename = key.replace('./', '').replace('.tsx', '');
        
        // Generate slug from filename (convert PascalCase to kebab-case)
        const slug = filename
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();
        
        // Each musing should export metadata
        if (module.metadata) {
            musings.push({
                ...module.metadata,
                path: `/musings/${slug}`,
                slug: slug,
                component: module.default
            });
        } else {
            // Fallback for musings without metadata
            console.warn(`Musing ${filename} does not export metadata`);
            musings.push({
                title: filename,
                excerpt: 'No description available',
                date: new Date().toISOString().split('T')[0],
                path: `/musings/${slug}`,
                slug: slug,
                component: module.default
            });
        }
    });
    
    // Sort by date descending
    return musings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to get a specific musing by slug
export const getMusingBySlug = (slug: string): MusingMetadata | null => {
    const musings = loadMusings();
    return musings.find(musing => musing.slug === slug) || null;
};