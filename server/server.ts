import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

const processArgs = () => {
  if (process.argv.length > 2) {
    return `data/${process.argv[2]}`;
  } else {
    return "data/data.json";
  }
}

const app : Express = express();
const dataFilename = processArgs();
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
      delete obj.resumes;
      res.status(200).json(obj);
    }
  })
});

app.get('/resumes', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem reading data files");
    } else {
      let obj = JSON.parse(data);
      res.status(200).json({ resumes: obj.resumes });
    }
  })
})

app.post('/resumes', (req: Request, res: Response) => {
  const newResume = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { resumes: any[] } = JSON.parse(data);
      obj.resumes.push(newResume);
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newResume);
        }
      })
    }
  });
})

app.delete('/resumes/:id', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, nothing was deleted");
    } else {
      let obj : { resumes: any[] } = JSON.parse(data);
      let index = obj.resumes.findIndex((e : any) => e.id == req.params.id);
      if (index >= 0) {
        const deletedItem = obj.resumes[index];
        obj.resumes = [
          ...obj.resumes.slice(0, index),
          ...obj.resumes.slice(index + 1)
        ]
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, nothing was deleted");
          } else {
            res.status(200).json(deletedItem);
          }
        })
      } else {
        res.status(500).send("Problem writing data, nothing was deleted");
      }
    }
  });
})

app.post('/experiences', (req: Request, res: Response) => {
  const newExperience = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { experiences: any[] } = JSON.parse(data);
      obj.experiences.push(newExperience);
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newExperience);
        }
      })
    }
  });
})

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

app.delete('/experiences/:id', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, nothing was deleted");
    } else {
      let obj : { experiences: any[] } = JSON.parse(data);
      let index = obj.experiences.findIndex((e : any) => e.id == req.params.id);
      if (index >= 0) {
        const deletedItem = obj.experiences[index];
        obj.experiences = [
          ...obj.experiences.slice(0, index),
          ...obj.experiences.slice(index + 1)
        ]
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, nothing was deleted");
          } else {
            res.status(200).json(deletedItem);
          }
        })
      } else {
        res.status(500).send("Problem writing data, nothing was deleted");
      }
    }
  });
})

app.post('/contacts', (req: Request, res: Response) => {
  const newContact = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { contacts: any[] } = JSON.parse(data);
      if (obj.contacts.some(cur => cur.name == newContact.name)) {
        res.status(400).send(`${newContact.name} contact already exists`);
        return;
      }
      obj.contacts.push(newContact);
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newContact);
        }
      })
    }
  });
})

app.delete('/contacts/:name', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, nothing was deleted");
    } else {
      let obj : { contacts: any[] } = JSON.parse(data);
      let index = obj.contacts.findIndex(
        (cur : any) => cur.name == req.params.name
      );
      if (index >= 0) {
        const deletedItem = obj.contacts[index];
        obj.contacts = [
          ...obj.contacts.slice(0, index),
          ...obj.contacts.slice(index + 1)
        ]
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, nothing was deleted");
          } else {
            res.status(200).json(deletedItem);
          }
        })
      } else {
        res.status(500).send("Problem writing data, nothing was deleted");
      }
    }
  });
})

app.put('/defaultEducation', (req: Request, res: Response) => {
  const body = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { defaultEducation : string } = JSON.parse(data);
      obj.defaultEducation = body.newEducation;
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(body);
        }
      })
    }
  });
})

app.post('/skillLists', (req : Request, res : Response) => {
  const newSkillList = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { skills : any[] } = JSON.parse(data);
      if (obj.skills.some(cur => cur.name == newSkillList.name)) {
        res.status(400).send(`Skill list ${newSkillList.name} already exists`);
        return;
      }
      obj.skills.push(newSkillList);
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newSkillList);
        }
      })
    }
  });
})

app.put('/skillLists/:name', (req : Request, res : Response) => {
  const newSkillList = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { skills : any[] } = JSON.parse(data);
      const index = obj.skills.findIndex(cur => cur.name == req.params.name);
      obj.skills[index] = newSkillList;
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newSkillList);
        }
      })
    }
  });
})

app.delete('/skillLists/:name', (req : Request, res : Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, nothing was deleted");
    } else {
      let obj : { skills: any[] } = JSON.parse(data);
      let index = obj.skills.findIndex((e : any) => e.name == req.params.name);
      if (index >= 0) {
        const deletedItem = obj.skills[index];
        obj.skills = [
          ...obj.skills.slice(0, index),
          ...obj.skills.slice(index + 1)
        ]
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, nothing was deleted");
          } else {
            res.status(200).json(deletedItem);
          }
        })
      } else {
        res.status(500).send("Problem writing data, nothing was deleted");
      }
    }
  });
})

app.post('/references', (req: Request, res: Response) => {
  const newReference = req.body;
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, no changes made");
    } else {
      let obj : { references: any[] } = JSON.parse(data);
      if (obj.references.some(cur => cur.name == newReference.name)) {
        res.status(400).send(`A reference from ${newReference.name} already exists`);
        return;
      }
      obj.references.push(newReference);
      fs.writeFile(dataFilename, JSON.stringify(obj), err => {
        if (err) {
          res.status(500).send("Problem writing data, no changes made");
        } else {
          res.status(200).json(newReference);
        }
      })
    }
  });
})

app.delete('/references/:name', (req: Request, res: Response) => {
  fs.readFile(dataFilename, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Problem writing data, nothing was deleted");
    } else {
      let obj : { references: any[] } = JSON.parse(data);
      let index = obj.references.findIndex(cur => cur.name == req.params.name);
      if (index >= 0) {
        const deletedItem = obj.references[index];
        obj.references = [
          ...obj.references.slice(0, index),
          ...obj.references.slice(index + 1)
        ]
        fs.writeFile(dataFilename, JSON.stringify(obj), err => {
          if (err) {
            res.status(500).send("Problem writing data, nothing was deleted");
          } else {
            res.status(200).json(deletedItem);
          }
        })
      } else {
        res.status(500).send("Problem writing data, nothing was deleted");
      }
    }
  });
})

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});