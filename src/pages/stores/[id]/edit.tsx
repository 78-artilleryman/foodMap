import { useRouter } from 'next/router';
import React from 'react';

function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>StoreEditPage</div>;
}

export default StoreEditPage;
