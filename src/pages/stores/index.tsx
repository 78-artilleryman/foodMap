import { StoreApiResponse, StoreType } from '@/interface';
import Image from 'next/image';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import Loding from '@/components/Loding';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/Loader';
import SearchFilter from '@/components/SearchFilter';

function StoreListPage() {
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q: q,
    district: district,
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(['stores', searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) => (lastPage.data?.length > 0 ? lastPage.page + 1 : undefined),
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    // 로딩중일때 보여줄 결과
    return (
      <span className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">다시 시도해주세요</span>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-12">
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loding />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i: number) => (
                <li key={i} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <Image
                      src={store?.category ? `/images/markers/${store?.category}.png` : `/images/markers/default.png`}
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">{store?.name}</div>
                      <div className="mt-1 text-sx text-sm font-semibold leading-5 text-gray-500">
                        {store?.stroeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm: flex-col sm: items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">{store?.address}</div>
                    <div className="mt-1 text-sx text-sm font-semibold leading-5 text-gray-500">
                      {store.phone || '번호없음'} | {store?.foodCertifyName} | {store?.category || '구분없음'}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref}></div>
    </div>
  );
}

export default StoreListPage;
