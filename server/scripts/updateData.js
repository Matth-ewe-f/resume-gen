const fs = require('fs');

const filename = 'data/data.json'

fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let obj = JSON.parse(data);
    obj.skills = [
      { name: "Programming Languanges", items: ["C#", "C++", "C", "JS/TypeScript", "Java", "Python"] },
      { name: "Game Audio Software", items: ["Wwise", "Unity Audio System"] },
      { name: "Game Engines", items: ["Unity", "Godot", "RPG Maker VX Ace"] },
      { name: "Languages", items: ["Conversational Japanese"] },
      { name: "Relevant Coursework", items: ["Software System Design", "Object-Oriented Software Engineering", "Data Structures", "Operating Systems", "Sound Design for Games", "Linear Algebra", "Calculus"] }
    ]
    const newData = JSON.stringify(obj);
    fs.writeFile(filename, newData, null, () => {
      console.log("updated data file");
    });
  }
})