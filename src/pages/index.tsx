import Map from '@/components/Map';
import Markers from '@/components/Markers';
import * as stores from '@/data/stores_data.json';
import { useState } from 'react';

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  console.log(currentStore);
  const storeDatas = stores['DATA'];
  return (
    <>
      <Map setMap={setMap} />
      <Markers map={map} storeDatas={storeDatas} setCurrentStore={setCurrentStore} />
    </>
  );
}
