import { Rate } from './Rate';

export interface ExchangeRate {
    base: string, 
    date: string, 
    rates: Rate[],
} 

