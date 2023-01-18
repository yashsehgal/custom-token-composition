import { TokenType } from "./token-type";

type IndexViewType = {
    indexName?: string;
    indexDescription?: string;
    indexLogo?: string;
    indexPricing?: {
        currentPrice?: PriceType;
        changePercentage?: number | string;
        isChangeRateGrowing?: boolean;
    };
    stats?: {
        marketCap?: PriceType;
        volume?: number | string;
        currentSupply?: number | string | BigInt;
        streamingFee?: number | string;
    };
    underlyingTokens?: TokenType[];
} | any;

type PriceType = {
    currency?: string;
    amount?: string | number;
};

export type { IndexViewType, PriceType };