"use client";

import { useRecoilValue } from "recoil";

import { userUidAssetData } from "@/atoms/atom";
import { IcurrentPrice } from "@/interface/interface";

import { RiBitCoinFill } from "react-icons/ri";

const MyAssetCoinList = ({ currentPrice }: { currentPrice: IcurrentPrice }) => {
  const userAssetData = useRecoilValue(userUidAssetData);
  console.log(userAssetData.asset?.data);

  return (
    <div>
      {userAssetData.asset?.data &&
        Object.entries(userAssetData.asset.data).map(([name, value]) => {
          const averagePurchasePrice = Math.round(
            value.buyAmount / value.numberOfShares,
          );
          const equitiesValue = Math.round(
            +currentPrice * value.numberOfShares,
          );
          const equitiesProfitOrLoss: number = equitiesValue - value.buyAmount;
          const earningRate = (equitiesProfitOrLoss / value.buyAmount).toFixed(
            2,
          );

          return (
            <div key={name}>
              <figure className="h-12 px-2.5 pt-1 border-b border-grey">
                <div className="flex items-center">
                  <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
                  <p className="w-[30%] flex justify-center">{name}</p>
                  <p className="w-[30%] flex justify-center">
                    {equitiesProfitOrLoss}
                  </p>
                  <p className="w-[30%] flex justify-center">{earningRate}%</p>
                </div>
              </figure>
              <figure>
                <div className="flex py-1">
                  <div className="w-1/2 flex flex-col items-end px-2.5">
                    <p>{`${value.numberOfShares} ${name}`}</p>
                    <p>보유수량</p>
                  </div>
                  <div className="w-1/2 flex flex-col items-end px-2.5">
                    <p>{`${averagePurchasePrice} KRW`}</p>
                    <p>매수평균가</p>
                  </div>
                </div>
                <div className="flex py-1">
                  <div className="w-1/2 flex flex-col items-end px-2.5">
                    <p>{`${new Intl.NumberFormat("ko-KR").format(
                      equitiesValue,
                    )} KRW`}</p>
                    <p>평가금액</p>
                  </div>
                  <div className="w-1/2 flex flex-col items-end px-2.5">
                    <p>{`${new Intl.NumberFormat("ko-KR").format(
                      value.buyAmount,
                    )} KRW`}</p>
                    <p>매수금액</p>
                  </div>
                </div>
              </figure>
            </div>
          );
        })}
    </div>
  );
};

export default MyAssetCoinList;
