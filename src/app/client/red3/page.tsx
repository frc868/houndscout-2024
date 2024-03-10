import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Red3() {
  return <Client station={Station.RED3} />;
}
