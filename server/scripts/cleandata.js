const fs = require('fs');
const uuid = require('uuid');

fs.readFile('data.json', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    let experiences = obj.experiences;
    experiences = experiences.map((item) => {
      item.id = uuid.v4();
      item.bullets = item.bullets.map((bullet) => {
        return { id: uuid.v4(), text: bullet }
      })
      return item;
    })
    const newData = JSON.stringify({ experiences: experiences });
    fs.writeFile('data.json', newData, null, () => {
      console.log("updated data file");
    });
  }
})