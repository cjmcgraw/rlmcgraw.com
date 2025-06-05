// Type definitions for jstat
declare module 'jstat' {
    export const beta: {
        pdf: (x: number, alpha: number, beta: number) => any;
        inv: (p: number, alpha: number, beta: number) => any;
        sample: (alpha: number, beta: number) => any;
    };

    export const binomial: {
        pdf: (x: number, alpha: number, beta: number) => any;
        inv: (p: number, alpha: number, beta: number) => any;
        sample: (alpha: number, beta: number) => any;
    };

    export default function(x: any): any;
}
