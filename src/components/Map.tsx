/* global kakao*/
import React from 'react';
import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { locationState, mapState } from '@/atom';

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng),
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}

export default Map;
