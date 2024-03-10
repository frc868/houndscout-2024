import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Blue2() {
  return <Client station={Station.BLUE2} />;
}
