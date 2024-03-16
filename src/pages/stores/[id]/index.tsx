import { useRouter } from 'next/router';
import React from 'react';

function StoreNewPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>StoreNewPage</div>;
}

export default StoreNewPage;
