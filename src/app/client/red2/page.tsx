import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Red2() {
  return <Client station={Station.RED2} />;
}
