import Client from "@/app/Client";
import { Station } from "@prisma/client";
//I seriously hope you're not just toying with me. Go to Client.tsx, the page info is there.
export default function Blue3() {
  return <Client station={Station.BLUE3} />;
}
