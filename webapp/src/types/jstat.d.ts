// Type definitions for jstat
declare module 'jstat' {
    export const beta: {
        pdf: (x: number, alpha: number, beta: number) => any;
        inv: (p: number, alpha: number, beta: number) => any;
    };
}
