import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Blue3() {
  return <Client station={Station.BLUE3} />;
}
