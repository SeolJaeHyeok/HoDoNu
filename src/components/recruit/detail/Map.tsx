import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  markerName: string;
  address: string;
}

export default function Map({ markerName, address }: MapProps) {
  const apiKey =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_KAKAOMAP_APIKEY
      : process.env.NEXT_PUBLIC_PRODUCTION_KAKAOMAP_APIKEY;

  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!mapLoaded) return;
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(127.065696948747, 37.5148700847434),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result: any, status: number) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          let marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${markerName}</div>`,
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        } else {
          console.log('정확한 주소를 입력해주세요!');
        }
      });
    });
  }, [mapLoaded, address, markerName]);

  return (
    <>
      <div id="map" style={{ width: '500px', height: '500px' }}></div>
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        onLoad={() => setMapLoaded(true)}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`}
      />
    </>
  );
}

{
  /* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=Javascript Key&libraries=services&autoload=false"></script> */
}
