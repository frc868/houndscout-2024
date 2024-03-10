import Client from "@/app/Client";
import { Station } from "@prisma/client";

export default function Red1() {
  return <Client station={Station.RED1} />;
}
