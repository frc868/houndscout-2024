import axios from "axios";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface TBATeam {
  city?: string;
  country?: string;
  nickname: string;
  state_prov?: string;
  team_number: number;
}

interface TBAMatch {
  alliances: {
    blue: {
      team_keys: string[];
    };
    red: {
      team_keys: string[];
    };
  };
  match_number: number;
  comp_level: string;
  key: string;
}

//adminDataSlice/uploadOnlineTBADataAsync (TBA)
//Updates database with data sourced directly from The Blue Alliance API.
//Please note that this function requires an event with the specified code must be created first.
//This function will also delete any pre-existing matches in the event.
//Ensure you have an Blue Alliance API key.
export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  let teams;
  let matches;
  try {
    const teamData = (
      await axios.get(
        `https://thebluealliance.com/api/v3/event/${params.code}/teams`,
        { headers: { "X-TBA-Auth-Key": process.env.TBA_API_KEY } }
      )
    ).data as TBATeam[];

    teamData.forEach(async (team) => {
      let newTeam = await prisma.team.upsert({
        where: {
          number: team.team_number,
        },
        update: {
          events: { connect: { code: params.code } },
        },
        create: {
          number: team.team_number,
          name: team.nickname,
          location: `${team.city}, ${team.state_prov}, ${team.country}`,
          events: { connect: { code: params.code } },
        },
        include: {
          pitData: true,
        }
      });
      if (newTeam.pitData==null){
        await prisma.pitData.create({
          data: {team: { connect: { number: team.team_number } } }
        });
      }
    });

    const matchData = (
      (
        await axios.get(
          `https://thebluealliance.com/api/v3/event/${params.code}/matches/simple`,
          { headers: { "X-TBA-Auth-Key": process.env.TBA_API_KEY } }
        )
      ).data as TBAMatch[]
    )
      .filter((match) => match.comp_level === "qm")
      .sort((a, b) => b.match_number - a.match_number);

    await prisma.match.deleteMany({
      where: {
        eventCode: params.code,
      },
    });

    matchData.forEach(async (match) => {
      await prisma.match.create({
        data: {
          key: match.key,
          name: match.key.split("_")[1],
          number: match.match_number,
          event: { connect: { code: params.code } },
          red1Team: {
            connect: {
              number: Number(
                match.alliances.red.team_keys[0].replace("frc", "")
              ),
            },
          },
          red2Team: {
            connect: {
              number: Number(
                match.alliances.red.team_keys[1].replace("frc", "")
              ),
            },
          },
          red3Team: {
            connect: {
              number: Number(
                match.alliances.red.team_keys[2].replace("frc", "")
              ),
            },
          },
          blue1Team: {
            connect: {
              number: Number(
                match.alliances.blue.team_keys[0].replace("frc", "")
              ),
            },
          },
          blue2Team: {
            connect: {
              number: Number(
                match.alliances.blue.team_keys[1].replace("frc", "")
              ),
            },
          },
          blue3Team: {
            connect: {
              number: Number(
                match.alliances.blue.team_keys[2].replace("frc", "")
              ),
            },
          },
          red1TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.red.team_keys[0].replace("frc", "")
                  ),
                },
              },
            },
          },
          red2TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.red.team_keys[1].replace("frc", "")
                  ),
                },
              },
            },
          },
          red3TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.red.team_keys[2].replace("frc", "")
                  ),
                },
              },
            },
          },
          blue1TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.blue.team_keys[0].replace("frc", "")
                  ),
                },
              },
            },
          },
          blue2TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.blue.team_keys[1].replace("frc", "")
                  ),
                },
              },
            },
          },
          blue3TeamScore: {
            create: {
              team: {
                connect: {
                  number: Number(
                    match.alliances.blue.team_keys[2].replace("frc", "")
                  ),
                },
              },
            },
          },
        },
      });
    });

    const event = await prisma.event.findUnique({
      where: { code: params.code },
      include: {
        teams: true,
        matches: true,
      },
    });
    teams = event?.teams;
    matches = event?.matches;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ teams, matches, ok: true });
}
