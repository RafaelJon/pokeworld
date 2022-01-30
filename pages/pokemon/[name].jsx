import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Pokemon() {
  const router = useRouter()
  const [name, setname] = useState(router.query.name);
  
  return <div>{name}</div>;
}
