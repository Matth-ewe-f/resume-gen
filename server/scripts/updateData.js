const fs = require('fs');

const filename = 'data/data.json'

fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    obj.contacts = [
      { name: "phone", value: "215-760-8565" },
      { name: "email", value: "matthew.flynn.sound@gmail.com", link: "mailto:matthew.flynn.sound@gmail.com"},
      { name: "website", value: "http://matthewflynnmusic.com/", link: "http://matthewflynnmusic.com/" },
      { name: "reel", value: "https://play.reelcrafter.com/FlynnSound/Reel/", link: "https://play.reelcrafter.com/FlynnSound/Reel/" },
    ]
    const newData = JSON.stringify(obj);
    fs.writeFile(filename, newData, null, () => {
      console.log("updated data file");
    });
  }
})