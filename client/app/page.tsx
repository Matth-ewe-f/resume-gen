"use client";
import { Github, LinkedinIcon, Mail, MousePointer, Music, Phone, Square } from "lucide-react";
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
import { FaGithub } from "react-icons/fa";
const uuid = require("uuid");

const Page : FC = () => {
  // state for the right column
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);
  const [focusedRightItem, setFocusedRightItem] = useState(-1);
  const [focusedIsNew, setFocusedIsNew] = useState(false);
  // state for the left column
  const [contacts, setContacts] = useState<contact[]>([]);
  const [enteringNewContact, setEnteringNewContact] = useState(false);
  const [educationText, setEducationText] = useState("");
  const [editingEducation, setEditingEducation] = useState(false);
  const [skills, setSkills] = useState<skillList[]>([]);
  const [focusedSkill, setFocusedSkill] = useState(-1);
  const [refrences, setReferences] = useState<reference[]>([]);
  const [enteringNewReference, setEnteringNewReference] = useState(false);
  // general state
  const [widgets, setWidgets] = useState(true);
  const widgetsRef = useRef(widgets);
  const [saving, setSaving] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3300/allData').then(response => {
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
          item.shown = true;
          return item;
        }
      ));
      setEducationText(response.data.defaultEducation);
      setSkills(response.data.skills.map(
        (list : skillList) => {
          list.shown = true;
          list.items = list.items.map(item => {
            item.shown = true; return item 
          });
          return list;
        }
      ));
      setReferences(response.data.references.map((item : reference) => {
        item.shown = true;
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

  const getIconForContact = (type : string) => {
    const className = "text-stone-600 shrink-0";
    if (type == "phone") {
      return <Phone className={className} size={16} strokeWidth={1}/>;
    } else if (type == "email") {
      return <Mail className={className} size={16} strokeWidth={1}/>;
    } else if (type == "website") {
      return (
        <MousePointer className={className} size={16} strokeWidth={1}/>
      );
    } else if (type == "reel") {
      return <Music className={className} size={16} strokeWidth={1}/>;
    } else if (type == "linkedin") {
      return (
        <LinkedinIcon className={className} size={16} strokeWidth={1}/>
      );
    } else if (type == "github") {
      return <FaGithub/>
    } else {
      return <Square className={className} size={16} strokeWidth={1}/>;
    }
  }

  const generateSaveLoad = () => {
    return (
      <div className="fixed -right-5 top-12 w-[19rem] pl-8 py-4 flex gap-x-4
      bg-stone-300 rounded-2xl shadow-lg">
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={() => setSaving(true)}>
          Save
        </button>
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={() => setShowLoad(true)}>
          Load
        </button>
      </div>
    );
  }

  const generateWidgetToggle = () => {
    const onClick = () => {
      alert("Widgets will be hidden so that the page can be downloaded as a PDF. Press any key to show them again.");
      setWidgets(false);
      widgetsRef.current = false;
    }

    return (
      <div className="fixed -left-5 top-12 w-72 pl-8 py-4 bg-stone-300
      rounded-2xl shadow-lg">
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={onClick}>
          Hide Widgets
        </button>
      </div>
    );
  }

  const generateNewContactInput = () => {
    const onClose = () => {
      setEnteringNewContact(false)
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
      setEnteringNewContact(false);
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
      setEditingEducation(false);
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
          onClose={() => setEditingEducation(false)}
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
        let newReferences = refrences.slice();
        newReferences.push({...response.data, shown: true });
        setReferences(newReferences);
        alert("New reference created");
      }).catch(err => {
        alert("Something went wrong; no new reference was created");
        console.error(err);
      })
      setEnteringNewReference(false);
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <ReferencePopup
          onClose={ () => setEnteringNewReference(false) }
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
        setSkills(newSkills);
      }).catch(() => {
        alert("There was an error, changes not written.");
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
      })
    }

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <SkillsPopup 
          skillList={ index == -2 ? undefined : skills[focusedSkill] }
          updateSkillList={ updateFocused }
          saveSkillList={ index == -2 ? saveNew : saveChanges }
          onClose={ () => setFocusedSkill(-1) }
        />
      </div>
    )
  }

  const generateLeftColumnBuilder = () => {
    return <LeftColBuilder
      onEditEducation={() => setEditingEducation(true)}
      contacts={contacts}
      updateContacts={setContacts}
      onAddContact={ () => { setEnteringNewContact(true) } }
      skills={skills}
      updateSkills={setSkills}
      onAddSkill={ () => { setFocusedSkill(-2) }}
      references={refrences}
      updateReferences={setReferences}
      onAddReference={ () => { setEnteringNewReference(true) } }
    />
  }

  const generateRightColumnBuilder = () => {
    const onAddExperience = () => {
      setFocusedIsNew(true);
      setFocusedRightItem(0);
    }

    return <RightColBuilder
      allItems={ rightColumn }
      updateItems={ setRightColumn }
      onAddExperience={ onAddExperience }
    />
  }

  const generateSavePopup = () => {
    const onSave = (name : string) => {
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
      refrences.forEach(cur => {
        if (cur.shown) {
          let newReference = structuredClone(cur);
          delete newReference.shown;
          savedReferences.push(newReference);
        }
      })
      const body : resume = {
        id: uuid.v4(),
        name: name,
        rightColumn: savedRightCol,
        contacts: savedContacts,
        education: educationText,
        skills: savedSkills,
        references: savedReferences,
        dateSaved: new Date().toISOString()
      }
      axios.post('http://localhost:3300/resumes/', body).then(() => {
        alert("Resume was saved");
      }).catch(err => {
        alert("There was an error. The resume was not saved");
        console.log(err);
      })
      setSaving(false);
    }

    return <SavePopup
      onSave={ onSave }
      onCancel={ () => setSaving(false) }
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
      console.log(selected.rightColumn);
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
      selected.skills = selected.skills.map(cur => {
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
      selected.skills.push(
        ...skills.filter(cur => 
          !selected.skills.some(s => s.name == cur.name)
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
        ...refrences.filter(cur => 
          !selected.references.some(r => r.name == cur.name)
        ).map(cur => {
          cur.shown = false;
          return cur;
        })
      )
      setRightColumn(selected.rightColumn);
      setContacts(selected.contacts);
      setEducationText(selected.education);
      setSkills(selected.skills);
      setReferences(selected.references);
      setShowLoad(false);
    }

    return <LoadPopup
      onSelect={onSelect}
      onCancel={ () => setShowLoad(false) }
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
          setFocusedRightItem(-1);
        }).catch(() => {
          alert("There was an error, nothing was deleted");
        })
      }
    }

    const onClose = () => {
      setFocusedRightItem(-1);
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

  const generateContactSection = () => {
    const getTextForContact = (contact : contact) => {
      if (contact.link) {
        return (
          <a className="max-w-44 mr-4 text-mini flex flex-wrap"
          href={contact.link}>
            {contact.value.split('/').map((fragment, index, arr) => {
              return <span>
                {fragment}{index == arr.length - 1 ? '' : '/'}
              </span>
            })}
          </a>
        );
      } else {
        return <span className="text-mini">{contact.value}</span>
      }
    }

    return <>
      <h5 className="pt-4 mb-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Contact
      </h5>
      { contacts.map(contact => {
        if (contact.shown) {
          return (
            <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2"
            key={`contact-${contact.name}`}>
              { getIconForContact(contact.name) }
              { getTextForContact(contact) }
            </div>
          )
        }
      })}
    </>
  }

  const generateEducationSection = () => {
    return <>
      <h5 className="my-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Education
      </h5>
      { educationText != "" &&
        <div className="text-mini leading-tight">
          { educationText.split("\n").map(line => {
            return <p className="min-h-2">
              {line.split("**").map((piece, index) => {
                if (index % 2 == 0) {
                  return piece;
                } else {
                  return <span className="font-bold">{piece}</span>
                }
              })}
            </p>
          }) }
        </div>
      }
    </>
  }

  const generateSkillsSection = () => {
    const createListString = (list : skillList) => {
      let s = list.items.filter(i => i.shown).map(i => i.text).join(', ');
      return s
    }

    return <>
      <h5 className="my-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Skills
      </h5>
      <div className="text-mini leading-tight">
        { skills.map((list, index) => {
          if (list.shown) {
            return (
              <button className="block w-full text-left"
              onClick={ () => setFocusedSkill(index) }>
                <p className="font-bold">{list.name}</p>
                <p className="mr-6 mb-2 text-justify">
                  { createListString(list) }
                </p>
              </button>
            );
          }
        }) }
      </div>
    </>
  }

  const generateReferencesSection = () => {
    const getContactLine = (contact : referenceContact) => {
      const link = getContactLink(contact);
      return (
        <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
          { getIconForContact(contact.icon) }
          { link ?
            <a className="text-mini" href={link}>{ contact.text }</a>
          :
            <p className="text-mini">{ contact.text }</p>
          }
        </div>
      );
    }

    const getContactLink = (contact : referenceContact) => {
      if (contact.icon == "phone") {
        return undefined;
      } else if (contact.text.includes("@")) {
        return `mailto:${contact.text}`;
      } else {
        return contact.text;
      }
    }

    return <>
      <h5 className="pl-4 pt-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        References
      </h5>
      <div className="mt-2 flex flex-col gap-y-4">
        { refrences.map(reference => {
          if (reference.shown) {
            return (
              <div className="text-mini leading-tight">
                <div className="mr-4 bg-stone-200 min-h-4 pt-3 px-4 pb-2">
                  <p className="font-bold">{reference.name}</p>
                  <p>{reference.subtitle}</p>
                  { getContactLine(reference.contact1) }
                  { getContactLine(reference.contact2) }
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  }

  const generateHeadingJSX = 
  (heading : heading, index : number, className?: string) => {

    const onHeadingChange = (value : string) => {
      let newColumn = rightColumn.slice();
      (newColumn[index] as heading).text = value;
      setRightColumn(newColumn);
    }

    return (
      <input
        className={`w-full font-grotesk font-medium uppercase ` +
        `tracking-widest ${className}`}
        value={heading.text}
        onChange={(e) => onHeadingChange(e.target.value)}
      />
    )
  }

  const generateExperienceJSX = 
  (experience : experience, index : number, className?: string) => {
    if (className == undefined) {
      className = "";
    }

    return (
      <button 
        key={`right-col-${index}`}
        className={`block w-full ${className}`}
        onClick={ () => setFocusedRightItem(index) }
      >
        <div className="text-left leading-tight">
          <div className="flex flex-row justify-between items-end">
            <h3 className="flex-grow font-semibold text-sm max-w-96">
              { experience.title }
            </h3>
            <span className="text-right text-mini">
              { experience.dates }
            </span>
          </div>
          <span className="relative -top-[5px] w-full text-mini">
            { experience.subtitle }
          </span>
          <ul className="-mt-1.5 ml-4 text-mini list-disc text-justify">
            {experience.bullets.map((bullet, j) => {
              if (bullet.shown) {
                return (
                  <li key={`bullet-${index}-${j}`}>
                    {bullet.text}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </button>
    );
  }

  const generatePopupsJSX = () => {
    if (focusedRightItem >= 0) {
      return generateFocusedExperience(focusedRightItem);
    } else if (enteringNewContact) {
      return generateNewContactInput();
    } else if (editingEducation) {
      return generateEducationEditor();
    } else if (focusedSkill >= 0 || focusedSkill == -2) {
      return generateFocusedSkill(focusedSkill);
    } else if (enteringNewReference) {
      return generateNewReferenceInput();
    } else if (saving) {
      return generateSavePopup();
    } else if (showLoad) {
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
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className={"w-[816px] h-[1056px] border-black "
        + (widgets ? 'border' : '')}>
        <button className="w-full mt-8 text-4.5xl text-center font-medium uppercase
        font-grotesk tracking-ultra">
          Matthew Flynn
        </button>
        <h3 className="mb-4 text-center uppercase font-light
        tracking-widest">
          Programmer, Composer
        </h3>
        <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
        <div className="flex flex-row w-full">
          <div className="w-[19rem] flex-shrink-0 flex flex-col">
            <div className="pl-[4.5rem] bg-stone-100 pb-1">
              { generateContactSection() }
              <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
              { generateEducationSection() }
              <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
              { generateSkillsSection() }
              <hr className="mt-4 mr-8 border-dashed border-t border-stone-600"/>
            </div>
            <div className="pl-[3.5rem] bg-stone-100">
              { generateReferencesSection() }
            </div>
            <div className="flex-grow bg-stone-100 min-h-4"/>
          </div>
          <div className="flex-grow pl-6 pr-20 pt-2 pb-2">
            {rightColumn.map((item, index) => {
              if (item.isHeading) {
                return generateHeadingJSX(item as heading, index, "mt-1")
              } else if (item.shown) {
                return generateExperienceJSX(item as experience, index, "my-2.5");
              }
            })}
          </div>
        </div>
        <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
      </div>
    </div>
    { widgets ?
      <>
        { generateWidgetToggle() }
        { generateSaveLoad() }
        { generateLeftColumnBuilder() }
        { generateRightColumnBuilder() }
        { generatePopupsJSX() }
      </>
    :
      ''
    }
  </>;
}

export default Page;