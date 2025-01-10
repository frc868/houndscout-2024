import Client from "@/app/Client";
import { Station } from "@prisma/client";
//AAAAAAAAAAAAAAAAAAAAAGH! CAN YOU JUST STOP DOING THIS AND GO TO Client.tsx PLEASE?
export default function Red2() {
  return <Client station={Station.RED2} />;
}
