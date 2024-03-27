import { exec } from "child_process";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Define backup file path and name
    const backupDir = path.join(process.cwd(), "backups");
    const backupFileName = `backup-${Date.now()}.psql`;
    const backupFilePath = path.join(backupDir, backupFileName);

    // Ensure the backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Database credentials and details
    const dbName = "houndscout";
    const dbUser = "techhounds";
    // Customize these details according to your PostgreSQL setup

    // Construct the pg_dump command
    const command = `pg_dump -U ${dbUser} -d ${dbName} -f ${backupFilePath}`;

    // Execute the pg_dump command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing pg_dump: ${error}`);
        return res
          .status(500)
          .json({ success: false, message: "Failed to backup database" });
      }

      // Set headers to indicate a file download
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(backupFilePath)}"`
      );

      // Stream the file to the client
      const readStream = fs.createReadStream(backupFilePath);
      readStream.pipe(res);
    });
  } else {
    // Handle any non-GET requests
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
