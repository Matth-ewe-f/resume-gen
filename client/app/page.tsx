"use client";
import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import ContactPopup from "@/components/ContactPopup";
import ExperiencePopup from "@/components/ExperiencePopup";
import RightColBuilder from "@/components/RightColBuilder";
import LeftColBuilder from "@/components/LeftColBuilder";
import SkillsPopup from "@/components/SkillsPopup";
import ReferencePopup from "@/components/ReferencePopup";
import EducationPopup from "@/components/EducationPopup";
import SavePopup from "@/components/SavePopup";
import LoadPopup from "@/components/LoadPopup";
import HeaderPopup from "@/components/HeaderPopup";
import { v4 } from "uuid";
import Resume from "@/components/Resume";

const Page : FC = () => {
  // header state
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  // state for the right column
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);
  const [focusedRightItem, setFocusedRightItem] = useState(-1);
  const [focusedIsNew, setFocusedIsNew] = useState(false);
  // state for the left column
  const [contacts, setContacts] = useState<contact[]>([]);
  const [educationText, setEducationText] = useState("");
  const [skills, setSkills] = useState<skillList[]>([]);
  const [focusedSkill, setFocusedSkill] = useState(-1);
  const [references, setReferences] = useState<reference[]>([]);
  // general state
  const [currentPopup, setCurrentPopup] = useState("");
  const [widgets, setWidgets] = useState(true);
  const widgetsRef = useRef(widgets);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3300/allData').then(response => {
      setName(response.data.defaultName);
      setTagline(response.data.defaultTagline);
      setRightColumn(response.data.experiences.map(
        (item : experience) => {
          item.bullets = item.bullets.map(bullet => {
            bullet.shown = bullet.shown == undefined ? true : bullet.shown;
            return bullet;
          })
          item.shown = false;
          return item;
        }
      ));
      setContacts(response.data.contacts.map(
        (item : contact) => {
          item.shown = false;
          return item;
        }
      ));
      setEducationText(response.data.defaultEducation);
      setSkills(response.data.skillLists.map(
        (list : skillList) => {
          list.shown = false;
          list.items = list.items.map(item => {
            item.shown = true; return item 
          });
          return list;
        }
      ));
      setReferences(response.data.references.map((item : reference) => {
        item.shown = false;
        return item;
      }));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setErrorText("An Error Occured");
    });

    const handleKeyPress = () => {
      if (!widgetsRef.current) {
        console.log("!!");
        setWidgets(true);
        widgetsRef.current = true;
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const showPopup = (popupName : string) => {
    if (widgets) {
      setCurrentPopup(popupName);
    }
  }

  const hideWidgets = () => {
    setCurrentPopup("");
    setWidgets(false);
  }

  const generateSaveLoad = () => {
    return (
      <div
        className={"fixed top-12 w-[19rem] pl-8 py-4 flex gap-x-4 " +
        "bg-stone-300 rounded-2xl shadow-lg trasition-all duration-500 " +
        (widgets ? '-right-5' : '-right-80')}
      >
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={() => showPopup("save")}>
          Save
        </button>
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={() => showPopup("load")}>
          Load
        </button>
      </div>
    );
  }

  const generateWidgetToggle = () => {
    const onClick = () => {
      alert("Widgets will be hidden so that the page can be downloaded as a PDF. Press any key to show them again.");
      hideWidgets();
      widgetsRef.current = false;
    }

    return (
      <div 
        className={"fixed top-12 w-72 pl-8 py-4 bg-stone-300 rounded-2xl " +
        "shadow-lg transition-all duration-500 " +
        (widgets ? '-left-5' : '-left-72')}
      >
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={onClick}>
          Hide Widgets
        </button>
      </div>
    );
  }

  const generateNameTaglineEdit = () => {
    const onSubmit = (name : string, tagline : string) => {
    setName(name);
    setTagline(tagline);
    showPopup("header");
  }

  const onOverwrite = (newName : string, newTagline : string) => {
    const url = 'http://localhost:3300/';
    let nameSet = newName == name;
    let taglineSet = newTagline == tagline;
    if (!nameSet) {
      axios.put(`${url}defaultName`, { newName : newName }).then(() => {
        setName(newName);
        alert("Updated default name");
      }).catch((err) => {
        alert("There was an error. Default name was not updated");
        console.error(err);
      }).finally(() => {
        nameSet = true;
        console.log(nameSet, taglineSet);
        if (!(nameSet && taglineSet)) {
          showPopup("");
        }
      });
    }
    if (!taglineSet) {
      const body = { newTagline : newTagline }
      axios.put(`${url}defaultTagline`, body).then(() => {
        setTagline(newTagline);
        alert("Updated default tagline");
      }).catch((err) => {
        alert("There was an error. Default tagline was not updated");
        console.error(err);
      }).finally(() => {
        taglineSet = true;
        console.log(nameSet, taglineSet);
        if (!(nameSet && taglineSet)) {
          showPopup("");
        }
      });
    }
  }

  return (
    <div className="fixed top-0 p-16 w-screen h-screen flex items-center
    justify-center bg-white bg-opacity-70">
      <HeaderPopup
        oldName={name}
        oldTagline={tagline}
        onClose={() => showPopup("")}
        onSubmit={onSubmit}
        onOverwrite={onOverwrite}
      />
    </div>
  )
  }

  const generateNewContactInput = () => {
    const onClose = () => {
      showPopup("")
    }

    const onSubmit = (newContact : contact) => {
      newContact.shown = true;
      const url = `http://localhost:3300/contacts/`;
      axios.post(url, newContact).then(response => {
        let newAllContacts = contacts.slice();
        newAllContacts.push(response.data);
        setContacts(newAllContacts);
        alert("New contact info created");
      }).catch(err => {
        alert("Something went wrong, no new contact info created");
        console.error(err);
      })
      showPopup("");
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <ContactPopup onClose={onClose} onSubmit={onSubmit}/>
      </div>
    )
  }

  const generateEducationEditor = () => {
    const onSubmit = (text : string) => {
      setEducationText(text);
      showPopup("");
    }

    const onOverwrite = (text : string) => {
      const body = { newEducation : text };
      const url = 'http://localhost:3300/defaultEducation';
      axios.put(url, body).then(() => {
        onSubmit(text);
        alert("Updated default education");
      }).catch((err) => {
        alert("There was an error. Default education was not updated");
        console.error(err);
      })
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <EducationPopup
          oldText={educationText}
          onClose={() => showPopup("")}
          onSubmit={onSubmit}
          onOverwrite={onOverwrite}
        />
      </div>
    )
  }

  const generateNewReferenceInput = () => {
    const onSubmit = (newReference : reference) => {
      delete newReference.shown;
      const url = 'http://localhost:3300/references/';
      axios.post(url, newReference).then(response => {
        let newReferences = references.slice();
        newReferences.push({...response.data, shown: true });
        setReferences(newReferences);
        alert("New reference created");
      }).catch(err => {
        alert("Something went wrong; no new reference was created");
        console.error(err);
      })
      showPopup("");
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <ReferencePopup
          onClose={ () => showPopup("") }
          onSubmit={onSubmit}
        />
      </div>
    )
  }

  const generateFocusedSkill = (index : number) => {

    const updateFocused = (newItem : skillList) => {
      if (index >= 0) {
        setSkills([
          ...skills.slice(0, index),
          newItem,
          ...skills.slice(index + 1)
        ])
      }
    }

    const saveChanges = (newItem : skillList) => {
      const url = `http://localhost:3300/skillLists/${newItem.name}`;
      axios.put(url, newItem).then(response => {
        let newSkills = skills.slice();
        let posted : skillList = response.data;
        const index = newSkills.findIndex(cur => cur.name == posted.name);
        posted.shown = newSkills[index].shown;
        posted.items = posted.items.map(item => {
          item.shown = newSkills[index].shown;
          return item;
        });
        newSkills[index] = posted;
        alert("Skill list edited");
        setSkills(newSkills);
      }).catch(() => {
        alert("There was an error, changes not written");
      })
    }

    const saveNew = (newItem : skillList) => {
      let body = structuredClone(newItem);
      body.items = newItem.items.map(cur => {
        let clone = structuredClone(cur);
        delete clone.shown;
        return clone;
      });
      const url = "http://localhost:3300/skillLists/";
      axios.post(url, body).then(response => {
        let newSkills = skills.slice();
        let posted : skillList = response.data;
        posted.shown = true;
        posted.items = posted.items.map((item, index) => {
          item.shown = newItem.items[index].shown;
          return item;
        });
        newSkills.push(posted);
        setSkills(newSkills);
        alert("New skill list created");
      }).catch(err => {
        alert("There was an error. No new skills created");
        console.error(err);
      })
    }

    const onClose = () => {
      setFocusedSkill(-1);
      showPopup("");
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <SkillsPopup 
          skillList={ index < 0 ? undefined : skills[focusedSkill] }
          updateSkillList={ updateFocused }
          saveSkillList={ index < 0 ? saveNew : saveChanges }
          onClose={ onClose }
        />
      </div>
    )
  }

  const generateLeftColumnBuilder = () => {
    return <LeftColBuilder
      show={widgets}
      contacts={contacts}
      updateContacts={setContacts}
      onAddContact={ () => showPopup("contact") }
      skills={skills}
      updateSkills={setSkills}
      onAddSkill={ () => { showPopup("skills") }}
      references={references}
      updateReferences={setReferences}
      onAddReference={ () => { showPopup("references") } }
    />
  }

  const generateRightColumnBuilder = () => {
    const onAddExperience = () => {
      setFocusedIsNew(true);
      showPopup("experience");
      setFocusedRightItem(0);
    }

    return <RightColBuilder
      shown={ widgets }
      allItems={ rightColumn }
      updateItems={ setRightColumn }
      onAddExperience={ onAddExperience }
    />
  }

  const generateSavePopup = () => {
    const onSave = (resumeName : string) => {
      let savedRightCol : rightColumnItem[] = [];
      let index = 0;
      while (index < rightColumn.length &&
      (rightColumn[index].isHeading || rightColumn[index].shown)) {
        let cur = structuredClone(rightColumn[index]);
        delete cur.shown;
        if (!cur.isHeading) {
          cur = cur as experience;
          delete cur.oldVer;
          cur.bullets = cur.bullets.filter(bullet => bullet.shown);
          cur.bullets = cur.bullets.map(bullet => {
            delete bullet.shown;
            return bullet;
          })
        }
        savedRightCol.push(cur);
        index++;
      }
      let savedContacts : contact[] = [];
      contacts.forEach(cur => {
        if (cur.shown) {
          let newContact = structuredClone(cur);
          delete newContact.shown;
          savedContacts.push(newContact);
        }
      })
      let savedSkills : skillList[] = [];
      skills.forEach(cur => {
        if (cur.shown) {
          let newSkill = structuredClone(cur);
          delete newSkill.shown;
          delete newSkill.oldVer;
          newSkill.items = newSkill.items.filter(item => item.shown);
          newSkill.items = newSkill.items.map(item => {
            delete item.shown;
            return item;
          })
          savedSkills.push(newSkill);
        }
      })
      let savedReferences : reference[] = [];
      references.forEach(cur => {
        if (cur.shown) {
          let newReference = structuredClone(cur);
          delete newReference.shown;
          savedReferences.push(newReference);
        }
      })
      const body : resume = {
        id: v4(),
        name: resumeName,
        headerName: name,
        tagline: tagline,
        rightColumn: savedRightCol,
        contacts: savedContacts,
        education: educationText,
        skillLists: savedSkills,
        references: savedReferences,
        dateSaved: new Date().toISOString()
      }
      axios.post('http://localhost:3300/resumes/', body).then(() => {
        alert("Resume was saved");
      }).catch(err => {
        alert("There was an error. The resume was not saved");
        console.log(err);
      })
      showPopup("");
    }

    return <SavePopup
      onSave={ onSave }
      onCancel={ () => showPopup("") }
    />
  }

  const generateLoadPopup = () => {
    // TODO
    // What if an item gets deleted, but is still in an old resume??
    // What if there are differences between the old version and the saved?

    const onSelect = (selected : resume) => {
      selected.rightColumn = selected.rightColumn.map(cur => {
        if (cur.isHeading) {
          return cur;
        }
        cur = cur as experience;
        cur.bullets = cur.bullets.map(bullet => {
          bullet.shown = true;
          return bullet;
        })
        const saved = rightColumn.find(s => 
          !s.isHeading && (s as experience).id == cur.id
        ) as experience;
        if (saved) {
          cur.bullets.push(
            ...saved.bullets.filter(
              b1 => !cur.bullets.some(b2 => b1.id == b2.id)
            ).map(b => {
              b.shown = false;
              return b;
            })
          );
        }
        cur.shown = true;
        return cur;
      })
      selected.rightColumn.push(
        ...rightColumn.filter(cur => {
          return !cur.isHeading && !selected.rightColumn.some(i => 
            !i.isHeading && (i as experience).id == (cur as experience).id
          )
        }).map(cur => {
          cur.shown = false;
          return cur;
        })
      );
      selected.contacts = selected.contacts.map(cur => {
        cur.shown = true;
        return cur;
      })
      selected.contacts.push(
        ...contacts.filter(cur => 
          !selected.contacts.some(c => c.name == cur.name)
        ).map(cur => {
          cur.shown = false;
          return cur;
        })
      );
      selected.skillLists = selected.skillLists.map(cur => {
        cur.shown = true;
        cur.items = cur.items.map(item => {
          item.shown = true;
          return item;
        })
        const saved = skills.find(s => s.name == cur.name);
        if (saved) {
          cur.items.push(
            ...saved.items.filter(
              i1 => !cur.items.some(i2 => i1.id == i2.id)
            ).map(item => {
              item.shown = false;
              return item;
            })
          )
        }
        return cur;
      })
      selected.skillLists.push(
        ...skills.filter(cur => 
          !selected.skillLists.some(s => s.name == cur.name)
        ).map(cur => {
          cur.shown = false;
          return cur;
        })
      )
      selected.references = selected.references.map(cur => {
        cur.shown = true;
        return cur;
      })
      selected.references.push(
        ...references.filter(cur => 
          !selected.references.some(r => r.name == cur.name)
        ).map(cur => {
          cur.shown = false;
          return cur;
        })
      )
      setName(selected.headerName);
      setTagline(selected.tagline);
      setRightColumn(selected.rightColumn);
      setContacts(selected.contacts);
      setEducationText(selected.education);
      setSkills(selected.skillLists);
      setReferences(selected.references);
      showPopup("");
    }

    return <LoadPopup
      onSelect={onSelect}
      onCancel={ () => showPopup("") }
    />
  }

  const generateFocusedExperience = (index : number) => {
    if (rightColumn.length <= index || rightColumn[index].isHeading) {
      return <></>;
    }

    const experience = rightColumn[index] as experience;

    const updateFocused = (experience : experience) => {
      setRightColumn([
        ...rightColumn.slice(0, index),
        experience,
        ...rightColumn.slice(index + 1)
      ])
    }

    const saveChanges = (body : experience) => {
      let url;
      if (focusedIsNew) {
        url = `http://localhost:3300/experiences/`;
      } else {
        url = `http://localhost:3300/experiences/${experience.id}`;
      }
      (focusedIsNew ? axios.post(url, body) : axios.put(url, body))
      .then((response) => {
        let newAllRight = rightColumn.slice();
        if (focusedIsNew) {
          response.data.bullets = response.data.bullets.map((b : bullet) => {
            b.shown = true;
            return b;
          })
          response.data.shown = true;
          newAllRight = [
            response.data,
            ...newAllRight.slice(1),
          ];
        } else {
          const index = newAllRight.findIndex(
            e => !e.isHeading && (e as experience).id === experience.id
          );
          response.data.bullet = response.data.bullets.map((b : bullet) => {
            b.shown = experience.bullets.find(i => i.id == b.id)?.shown
          })
          newAllRight[index] = response.data;
          newAllRight[index].shown = true;
        }
        setRightColumn(newAllRight);
        alert("Changes saved");
        if (focusedIsNew) {
          setFocusedIsNew(false);
          showPopup("");
          setFocusedRightItem(-1);
        }
      }).catch(() => {
        alert("There was an error, changes not written");
      })
    }

    const deleteItem = () => {
      let msg = "This will permanently delete this resume item. Are you sure?";
      if (confirm(msg)) {
        const url = `http://localhost:3300/experiences/${experience.id}`;
        axios.delete(url).then((data) => {
          let newAllRight = rightColumn.slice();
          const index = newAllRight.findIndex(
            e => !e.isHeading && (e as experience).id == data.data.id
          );
          newAllRight = [
            ...newAllRight.slice(0, index),
            ...newAllRight.slice(index + 1)
          ];
          setRightColumn(newAllRight);
          alert("The item was deleted");
          showPopup("");
          setFocusedRightItem(-1);
        }).catch(() => {
          alert("There was an error, nothing was deleted");
        })
      }
    }

    const onClose = () => {
      setFocusedRightItem(-1);
      showPopup("");
      setFocusedIsNew(false)
      if (focusedIsNew) {
        setRightColumn([...rightColumn.slice(1)]);
      }
    }

    return (
      <ExperiencePopup
        experience={experience}
        isNewItem={focusedIsNew}
        updateExperience={updateFocused}
        saveChanges={saveChanges}
        delete={deleteItem}
        onClose={onClose}
      />
    )
  }

  const generatePopupsJSX = () => {
    if (currentPopup == "experience") {
      return generateFocusedExperience(focusedRightItem);
    } else if (currentPopup == "header") {
      return generateNameTaglineEdit();
    } else if (currentPopup == "contact") {
      return generateNewContactInput();
    } else if (currentPopup == "education") {
      return generateEducationEditor();
    } else if (currentPopup == "skills") {
      return generateFocusedSkill(focusedSkill);
    } else if (currentPopup == "references") {
      return generateNewReferenceInput();
    } else if (currentPopup == "save") {
      return generateSavePopup();
    } else if (currentPopup == "load") {
      return generateLoadPopup();
    }
  }

  if (errorText) {
    return <div className="w-full mt-16 flex justify-center">
      <h3 className="font-grotesk text-2xl tracking-ultra">
        {errorText}
      </h3>
    </div>
  }

  if (loading) {
    return <div className="w-full mt-16 flex justify-center">
      <h3 className="font-grotesk text-4xl uppercase tracking-ultra">
        Loading...
      </h3>
    </div>
  }

  return <>
    <Resume
      border={widgets}
      name={name}
      tagline={tagline}
      rightColumn={rightColumn}
      contacts={contacts}
      education={educationText}
      skills={skills}
      references={references}
      showPopup={showPopup}
      setFocusedRightItem={setFocusedRightItem}
      setRightColumn={setRightColumn}
      setFocusedSkill={setFocusedSkill}
    />
    { generateWidgetToggle() }
    { generateLeftColumnBuilder() }
    { generateSaveLoad() }
    { generateRightColumnBuilder() }
    { widgets && generatePopupsJSX() }
  </>;
}

export default Page;