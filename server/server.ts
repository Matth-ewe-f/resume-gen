import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';

const app : Express = express();
const port = 3300;
app.use(cors<Request>());

app.get('/allData', (req: Request, res: Response) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem reading data files");
    } else {
      let obj = JSON.parse(data);
      res.status(200).json(obj);
    }
  })
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});