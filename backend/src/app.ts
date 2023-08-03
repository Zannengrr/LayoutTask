import { config } from "dotenv";
import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import fs from "fs";
import path from "path";

config();

const allowedOrigins = ['http://localhost:3000'];
const pathtoData = path.join(__dirname, "data.json");
const options: CorsOptions = {
  origin: allowedOrigins
};
const app: Application = express();
app.options("*", cors(options));
app.use(cors(options));

let debounceTimeout: NodeJS.Timeout | null = null;

function readDataFromFile(): string {
  const data = fs.readFileSync(pathtoData, "utf8");
  return data;
}

//Server side event
const notifyListeners = (res: Response) => {
  console.log('Detected change in data.json. Reloading data...');
  setTimeout(() => {
    try {
      const updatedData = JSON.parse(readDataFromFile());
      if (updatedData) {
        res.write(`data: ${JSON.stringify(updatedData)}\n\n`);
        console.log('Data reloaded:');
      }
    } catch (error) {
      console.error('Error parsing updated data:', error);
    }
  }, 500);
}


app.get("/sse", (req: Request, res: Response) => {
  console.log("Client Connected");
  if (req.headers.accept && req.headers.accept === 'text/event-stream') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const watcher = fs.watch(pathtoData, (eventType, filename) => {
      if (filename && eventType === 'change') {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
          notifyListeners(res);
          debounceTimeout = null;
        }, 300);
      }
    });

    // Close the connection when the client disconnects
    req.on('close', () => {
      console.log('Client disconnected');
      watcher.close();
      res.end();
    });
  } else {
    res.status(404).send('Server side event on path /sse not found');
  }
});

//Route for getting data in root path
app.get("/", (req: Request, res: Response) => {
  res.send(readDataFromFile());
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});