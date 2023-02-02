"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getCoinData } from "@/api/getCoinData";
import Search from "@/components/Search";
import {
  coinResultAtom,
  searchState,
  searchInputValue,
  allCoinList,
} from "@/atoms/atom";
import { useRecoilState, useRecoilValue } from "recoil";

const page = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const coinResult = useRecoilValue(coinResultAtom);
  const searchCoinState = useRecoilValue(searchState);
  const inputValue = useRecoilValue(searchInputValue);

  const router = useRouter();

  const { status, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinData,
    refetchInterval: 60000,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {(error as Error).message}</span>;
  }

  const numPages = Math.ceil(data.length / limit);

  const pageRouter = e => {
    router.push("/buy");
  };

  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <button
        className="text-3xl text-white font-outline-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        ◀
      </button>
      <div className="mx-16 w-[72rem]">
        <Search />
        <div>
          <div className="bg-white mb-2 h-12 flex flex-row border-2 justify-around items-center border-yellow-200 rounded-lg">
            <p className="w-12 flex items-center justify-center text-xl font-semibold">
              순위
            </p>
            <p className="w-44 flex items-center justify-center text-xl font-semibold">
              코인이름
            </p>
            <p className="w-32 flex items-center justify-center text-xl font-semibold">
              현재가
            </p>
            <p className="w-32 flex items-center justify-center text-xl font-semibold">
              변동률
            </p>
            <p className="w-40 flex items-center justify-center text-xl font-semibold">
              누적체결량
            </p>
            <p className="w-16 flex items-center justify-center text-xl font-semibold">
              그래프
            </p>
          </div>
          {data.slice(offset, offset + limit).map(coin => (
            <div
              className="bg-white my-2 h-12 flex flex-row border-2 justify-around items-center border-yellow-200 rounded-lg hover:cursor-pointer group"
              onClick={() => pageRouter()}
            >
              <p className="w-12 flex items-center justify-center group-hover:font-semibold">
                {data.indexOf(coin) + 1}
              </p>
              <p className="w-44 flex items-center justify-center group-hover:font-semibold">
                {coin.korean_name}
              </p>
              <p className="w-32 flex items-center justify-center group-hover:font-semibold">
                {new Intl.NumberFormat("ko-KR").format(coin.trade_price)}
              </p>
              <p className="w-32 flex items-center justify-center group-hover:font-semibold">
                {(coin.signed_change_rate * 100).toFixed(2)}%
              </p>
              <p className="w-40 flex items-center justify-center group-hover:font-semibold">
                {coin.acc_trade_price_24h}
              </p>
              <p className="w-16 flex items-center justify-center group-hover:font-semibold">
                {coin.change}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="text-3xl text-white font-outline-2"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        ▶
      </button>
    </main>
  );
};

export default page;

// 순위 정렬 방식 sort 구현
// onClick={() => pageRouter()} params로 값 넘겨주기
// data를 filter해주는 것으로 아래 검색항목 걸러내기
