export interface Rate {
    currency: string,
    rate: number,
    trading?: string,
    difference?: number,
    differencesPercentage?: string
};