import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Blue1() {
  return <Client station={Station.BLUE1} />;
}
