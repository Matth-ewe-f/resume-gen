import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import ReadWriteLock from 'rwlock';

const processArgs = () => {
  if (process.argv.length > 2) {
    return `data/${process.argv[2]}`;
  } else {
    return "data/data.json";
  }
}

const dataFilename = processArgs();
const port = 3300;
const lock = new ReadWriteLock();

const emptyData = { defaultName:"", defaultTagline:"", resumes:[], experiences:[], contacts:[], defaultEducation:"", skillLists:[], references:[] }

const app : Express = express();
app.use(cors<Request>());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const readFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilename, 'utf-8', (err, data) => {
      if (err) {
        if (err.code == 'ENOENT') {
          resolve(structuredClone(emptyData));
        } else {
          reject(err);
        }
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}

const writeChanges = (changes: (obj : any) => [any, any]) => {
  return new Promise((resolve, reject) => {
    lock.writeLock((release) => {
      readFromFile().then((data : any) => {
        let [obj, response] = changes(data);
        if (obj == false) {
          release();
          resolve(false);
          return;
        }
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            release();
            reject();
          } else {
            release();
            resolve(response);
          }
        })
      })
    })
  })
};


const putField = (app : Express, route : string, valueName : string) => {
  app.put(`/${route}`, (req: Request, res: Response) => {
    writeChanges(obj => {
      obj[route] = req.body[valueName];
      return [obj, req.body];
    }).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      res.status(500).send(`Internal Server Error: ${err}`)
    })
  })
};

const postObject = (app : Express, route : string) => {
  postObjectNoDuplicates(app, route, () => false);
}

const postObjectNoDuplicates =
(app: Express, route: string, equalityCheck: (a: any, b: any) => boolean) => {
  app.post(`/${route}`, (req: Request, res: Response) => {
    const body = req.body;
    writeChanges(obj => {
      if (obj[route].some((cur : any) => equalityCheck(cur, body))) {
        return [false, false];
      }
      obj[route].push(body);
      return [obj, body];
    }).then(response => {
      if (response == false) {
        res.status(400).send(`cannot create duplicate ${route}`);
      } else {
        res.status(200).json(response);
      }
    }).catch(err => {
      res.status(500).send(`Internal Server Error: ${err}`);
    }) 
  })
}


const deleteObjectByProperty =
(app : Express, route : string, property : string) => {
  app.delete(`/${route}/:${property}`, (req: Request, res: Response) => {
    writeChanges(obj => {
      let index = obj[route].findIndex(
        (e : any) => e[property] == req.params[property]
      );
      if (index >= 0) {
        const deletedItem = obj[route].splice(index, 1)[0];
        return [obj, deletedItem];
      } else {
        return [false, false];
      }
    }).then(response => {
      if (response == false) {
        res.status(400).send("attempted to delete object that doesn't exist");
      } else {
        res.status(200).json(response);
      }
    }).catch(err => {
      res.status(500).send(`Internal Server Error: ${err}`);
    })
  })
}

const putObjectByProperty =
(app : Express, route : string, property : string) => {
  app.put(`/${route}/:${property}`, (req: Request, res: Response) => {
    const body = req.body;
    writeChanges(obj => {
      let index = obj[route].findIndex(
        (e : any) => e[property] == req.params[property]
      );
      if (index >= 0) {
        obj[route][index] = body;
        return [obj, body];
      } else {
        return [false, false];
      }
    }).then(response => {
      if (response == false) {
        res.status(400).send("attempted to update object that doesn't exist");
      } else {
        res.status(200).json(response);
      }
    }).catch(err => {
      res.status(500).send(`Internal Server Error: ${err}`);
    })
  })
}

app.get('/allData', (req: Request, res: Response) => {
  lock.readLock((release) => {
    readFromFile().then((data : any) => {
      delete data.resumes;
      res.status(200).json(data);
      release();
    }).catch(err => {
      console.error(err);
      res.status(500).send("Problem reading data files");
      release();
    })
  })
});

putField(app, 'defaultName', 'newName');

putField(app, 'defaultTagline', 'newTagline');

putField(app, 'defaultEducation', 'newEducation');

putField(app, 'defaultSummary', 'newSummary');

app.get('/resumes', (req: Request, res: Response) => {
  lock.readLock((release) => {
    readFromFile().then((data : any) => {
      res.status(200).json({ resumes: data.resumes });
      release();
    }).catch(err => {
      console.error(err);
      res.status(500).send("Problem reading data files");
      release();
    });
  });
})

postObject(app, 'resumes');

deleteObjectByProperty(app, 'resumes', 'id');

postObject(app, 'experiences');

putObjectByProperty(app, 'experiences', 'id');

deleteObjectByProperty(app, 'experiences', 'id');

postObjectNoDuplicates(app, "contacts", (a, b) => a.name == b.name);

deleteObjectByProperty(app, 'contacts', 'name');

postObjectNoDuplicates(app, "skillLists", (a, b) => a.name == b.name);

putObjectByProperty(app, 'skillLists', 'name');

deleteObjectByProperty(app, 'skillLists', 'name');

postObjectNoDuplicates(app, "references", (a, b) => a.name == b.name);

deleteObjectByProperty(app, 'references', 'name');

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});