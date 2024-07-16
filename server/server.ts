import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

const app : Express = express();
const dataFilename = "data/data.json"
const port = 3300;
app.use(cors<Request>());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/allData', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem reading data files");
    } else {
      let obj = JSON.parse(data);
      res.status(200).json(obj);
    }
  })
});

app.put('/experiences/:id', (req: Request, res: Response) => {
  const newExperience = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { experiences: any[] } = JSON.parse(data);
      let index = obj.experiences.findIndex((e : any) => e.id == req.params.id);
      if (index >= 0) {
        obj.experiences[index] = newExperience;
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, no changes made");
          } else {
            res.status(200).json(newExperience);
          }
        })
      } else {
        res.status(500).send("Problem writing data, no changes made");
      }
    }
  });
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});