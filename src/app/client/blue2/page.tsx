import Client from "@/app/Client";
import { Station } from "@prisma/client";
//You still don't need to look at this. Again, the page info is in Client.tsx.
export default function Blue2() {
  return <Client station={Station.BLUE2} />;
}
