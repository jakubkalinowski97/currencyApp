import { HistoryRate } from './HistoryRate';

export interface HistoryExchangeRate {
    start_at: string,
    end_at: string,
    base: string,
    rates: HistoryRate[],
}