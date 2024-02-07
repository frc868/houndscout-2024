"use client";
import Link from 'next/link';

export default function Home() {
  return <>
  <h1>Houndscout 2024</h1>
  <h3><Link href="/admin">Admin</Link></h3>
  <p><Link href="/client/red1">Red 1</Link></p>
  <p><Link href="/client/red2">Red 2</Link></p>
  <p><Link href="/client/red3">Red 3</Link></p>
  <p><Link href="/client/blue1">Blue 1</Link></p>
  <p><Link href="/client/blue2">Blue 2</Link></p>
  <p><Link href="/client/blue3">Blue 3</Link></p>
  </>;
}
