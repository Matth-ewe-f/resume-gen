const fs = require('fs');
const uuid = require('uuid');

const filename = 'data/data.json'

fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    obj.references = [
      {
        name: "Daniel Kluger",
        subtitle: "Most Recent Employer",
        contact1: { text: "daniel.kluger@icloud.com", icon : "email" },
        contact2: { text: "https://www.danielkluger.com/", icon: "website" },
        shown: true
      },
      {
        name: "Phillip Klassen",
        subtitle: "Game Audio Professor",
        contact1: { text: "phillip.klassen@oxidegames.com", icon : "email" },
        contact2: { 
          text: "https://www.linkedin.com/in/phillip-klassen-ab4108105",
          icon: "linkedin" 
        },
        shown: true
      }
    ];
    const newData = JSON.stringify(obj);
    fs.writeFile(filename, newData, null, () => {
      console.log("updated data file");
    });
  }
})