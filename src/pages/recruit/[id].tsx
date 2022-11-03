import Map from '@components/recruit/detail/Map';

export default function RecruitDetail() {
  const address = '서울특별시 강남구 봉은사로 644(삼성동)';
  const markerName = '엠서클';
  return (
    <>
      <Map address={address} markerName={markerName} />
    </>
  );
}
