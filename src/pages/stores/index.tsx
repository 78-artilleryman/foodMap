import { StoreType } from '@/interface';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loding from '@/components/Loding';

function StoreListPage() {
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery('stores', async () => {
    const { data } = await axios('/api/stores');
    return data as StoreType[];
  });

  if (isError) {
    // 로딩중일때 보여줄 결과
    return (
      <span className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">다시 시도해주세요</span>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loding />
        ) : (
          stores?.map((store, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <Image
                  src={store?.category ? `/images/markers/${store?.category}.png` : `/images/markers/default.png`}
                  width={48}
                  height={48}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="text-sm font-semibold leading-6 text-gray-900">{store?.name}</div>
                  <div className="mt-1 text-sx text-sm font-semibold leading-5 text-gray-500">{store?.stroeType}</div>
                </div>
              </div>
              <div className="hidden sm:flex sm: flex-col sm: items-end">
                <div className="text-sm font-semibold leading-6 text-gray-900">{store?.address}</div>
                <div className="mt-1 text-sx text-sm font-semibold leading-5 text-gray-500">
                  {store.phone || '번호없음'} | {store?.foodCertifyName} | {store?.category || '구분없음'}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default StoreListPage;
