const fs = require('fs');

const filename = 'data/data.json'

fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    obj.skills.map(list => {
      console.log(list.items);
      list.items = list.items.map(item => {
        return { text: item }
      })
      return list;
    })
    const newData = JSON.stringify(obj);
    fs.writeFile(filename, newData, null, () => {
      console.log("updated data file");
    });
  }
})