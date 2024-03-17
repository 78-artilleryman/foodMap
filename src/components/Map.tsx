/* global kakao*/
import React from 'react';
import Script from 'next/script';
import * as stores from '@/data/stores_data.json';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

function Map() {
  const loadKakaMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      //식당 데이터 마커 기능
      stores?.['DATA'].map(store => {
        // 마커 위치
        const markerPosition = new window.kakao.maps.LatLng(store?.y_dnts, store?.x_cnts);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커 지도 표시
        marker.setMap(map);
      });
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
