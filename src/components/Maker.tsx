import { mapState } from '@/atom';
import { StoreApiResponse, StoreType } from '@/interface';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface MarkersProps {
  store: StoreType;
}

function Marker({ store }: MarkersProps) {
  const map = useRecoilValue(mapState);

  const loadKakaoMarker = useCallback(() => {
    if (map && store) {
      //햔제 선택한 식당 데이터 마커 기능

      const imageSrc = store?.category ? `/images/markers/${store?.category}.png` : `/images/markers/default.png`; // 마커 이미지 주소
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지 사이즈
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      const marketImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커 위치
      const markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lag);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: marketImage,
      });
      // 마커 지도 표시
      marker.setMap(map);

      // 마커 커서가 오버되었을 때 마커 위에 표시할 윈포윈도우 생성
      const content = `<div class="infowindow">${store?.name}</div>`; //인포윈도우에 표실될 내용

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버시 커스텀오버레이를 마커위에 표시
        customOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마커에 마우스오버시 커스텀오버레이를 마커위에 제거
        customOverlay.setMap(null);
      });
    }
  }, [map, store]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker, map]);
  return <></>;
}

export default Marker;
