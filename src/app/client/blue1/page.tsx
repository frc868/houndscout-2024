import Client from "@/app/Client";
import { Station } from "@prisma/client";
//You don't need to look at this. The page info is in Client.tsx.
export default function Blue1() {
  return <Client station={Station.BLUE1} />;
}
