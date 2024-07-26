const fs = require('fs');
const uuid = require('uuid');

const filename = 'data/data.json'

fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    obj.skills.map(list => {
      list.items = list.items.map(item => {
        return { id : uuid.v4(), ...item }
      })
      return list;
    })
    const newData = JSON.stringify(obj);
    fs.writeFile(filename, newData, null, () => {
      console.log("updated data file");
    });
  }
})