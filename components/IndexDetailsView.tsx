import { IndexViewType } from "@/types/index-view-type";
import { TokenType } from "@/types/token-type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IndexDetailsView: React.FunctionComponent<IndexViewType> = ({ indexData }) => {
    return (
        <div className="index-details-view flex flex-row w-[95vw] items-start justify-start gap-12">
            <div className="index-details-view-stats-container w-[320px] h-[600px] border border-gray-200 rounded p-6">
                <div className="index-headline-wrapper flex flex-row items-center justify-start gap-3">
                    <span className="index-logo-wrapper">
                        <Image src={indexData?.indexLogo} width={"50"} height={"50"} alt="index-logo" />
                    </span>
                    <h1 className="index-title leading-snug text-xl font-semibold">{indexData?.indexName}</h1>
                </div>
                <div className="index-pricing-details-layer-wrapper my-6 flex flex-row items-start justify-start gap-8">
                    <div className="index-pricing-details__current-price-wrapper flex flex-col items-start justify-start">
                        <span className="text-base text-gray-500 font-medium">{"Current Price"}</span>
                        <span className="current-price-content-wrapper text-2xl font-semibold">
                            {indexData?.indexPricing?.currentPrice?.currency}{indexData?.indexPricing?.currentPrice?.amount}
                        </span>
                    </div>
                    <div className="index-pricing-details__change-wrapper flex flex-col items-start justify-start">
                        <span className="text-base text-gray-500 font-medium">{"Change"}</span>
                        <span className={`change-rate-content-wrapper text-2xl font-semibold 
                            ${indexData?.indexPricing?.isChangeRateGrowing ? "text-green-500" : "text-red-500" }`}>
                            {indexData?.indexPricing?.changePercentage + "%"}
                        </span>
                    </div>
                </div>
                <div className="index-pricing-description-wrapper flex flex-col items-start justify-start gap-1.5">
                    <h2 className="leading-snug text-base font-medium text-gray-500">{"Description"}</h2>
                    <p className="leading text-base font-normal">{indexData?.indexDescription}</p>
                </div>
                <div className="index-pricing-stats-breakdown-layer-wrapper my-8">
                    <h2 className="leading-snug text-lg font-medium text-gray-900">{"Index Stats"}</h2>
                    <div className="grid grid-cols-2 w-fit gap-x-20 gap-y-6 items-center justify-start mt-6">
                        <div className="index-pricing-stats-breadown__market-cap-wrapper flex flex-col items-start justify-start">
                            <span className="text-base text-gray-500 font-medium">{"Market Cap"}</span>
                            <span className="market-cap-content-wrapper text-2xl font-semibold">
                                {indexData?.stats?.marketCap?.currency}{indexData?.stats?.marketCap?.amount}
                            </span>
                        </div>
                        <div className="index-pricing-stats-breadown__volume-wrapper flex flex-col items-start justify-start">
                            <span className="text-base text-gray-500 font-medium">{"Market Cap"}</span>
                            <span className="volume-content-wrapper text-2xl font-semibold">
                                {indexData?.stats?.volume}
                            </span>
                        </div>
                        <div className="index-pricing-stats-breakdown__current-supply-wrapper flex flex-col items-start justify-start">
                            <span className="text-base text-gray-500 font-medium">{"Current Supply"}</span>
                            <span className="current-supply-content-wrapper text-2xl font-semibold">
                                {indexData?.stats?.currentSupply}
                            </span>
                        </div>
                        <div className="index-pricing-stats-breakdown__streaming-fee-wrapper flex flex-col items-start justify-start">
                            <span className="text-base text-gray-500 font-medium">{"Streaming Fee"}</span>
                            <span className="streaming-fee-content-wrapper text-2xl font-semibold">
                                {indexData?.stats?.streamingFee + "%"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="index-buying-interface-container w-[860px] h-[600px]">
                <div className="underlying-tokens-layer-wrapper flex flex-col items-start justify-start gap-1">
                    <h1 className="leading-snug text-lg font-medium">{"Underlying Tokens"}</h1>
                    <div className="underlying-tokens-list-wrapper flex flex-row items-center justify-start gap-4 mt-3">
                        {indexData?.underlyingTokens?.map((token: TokenType, tokenIndex: number) => (
                            <div className="flex flex-col items-center justify-center gap-1 w-fit h-auto" key={tokenIndex}>
                                <Image src={token?.tokenLogo} width={"50"} height={"50"} alt="token-logo" />
                                <span className="underlying-token-name text-sm font-medium">{token?.tokenName}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="index-buying-form-view-container my-10">
                    <IndexBuyingFormView indexData={indexData} />
                </div>
            </div>
        </div>
    )
};

const IndexBuyingFormView: React.FunctionComponent<IndexViewType> = ({ indexData }) => {
    return (
        <div className="index-buying-form-view w-full h-[445px] p-4 bg-gray-50 overflow-y-scroll">
            <h1 className="leading-snug text-lg font-medium">{`Invest in ${indexData?.indexName}`}</h1>
            <div className="pay-input-wrapper my-10 flex flex-col items-start justify-start gap-2">
                <h4 className="leading-snug text-base font-semibold">{"Pay"}</h4>
                <div className="flex flex-row items-center justify-start gap-2">
                    <input type="number" className="w-[300px] px-4 py-2 border border-gray-300" placeholder="Amount to invest"/>
                    <span className="currency-type-label uppercase font-medium">{"USDC"}</span>
                </div>
            </div>
            <div className="underlying-token-composition-list-container">
                <UnderlyingTokenComposition underlyingTokensData={indexData?.underlyingTokens} />
            </div>
        </div>
    )
};

const UnderlyingTokenComposition: React.FunctionComponent<Array<TokenType>> = ({ underlyingTokensData }) => {
    const UnderlyingTokensDataRef = useRef(underlyingTokensData);
    
    let defaultValue = 100 / underlyingTokensData?.length;

    return (
        <div className="underlying-token-compositions-list grid grid-cols-1">
            {UnderlyingTokensDataRef.current?.map((underlyingToken: TokenType, underlyingTokenIndex: number) => (
                <div className="underlying-token-composition-component py-3 grid grid-cols-2 items-center justify-start border-t border-gray-200" 
                    key={underlyingTokenIndex}
                >
                    <div className="underlying-token-details flex flex-row items-center justify-start gap-x-3 w-fit h-auto">
                        <Image src={underlyingToken?.tokenLogo} width={"36"} height={"36"} alt="token-logo" />
                        <p className="underlying-token-name font-medium text-base">{underlyingToken?.tokenName}</p>
                    </div>
                    <div className="underlying-token-composition-wrapper">
                        <input type="range" 
                            className="form-range"
                            defaultValue={defaultValue}
                            onChange={(rangeEvent) => 
                                console.log("changing composition rate for token:", underlyingToken?.tokenName, "of value", rangeEvent?.target?.value)
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    )
};

export default IndexDetailsView;