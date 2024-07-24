"use client";
import { ChevronDown, ChevronUp, LinkedinIcon, Mail, MousePointer, Music, Phone, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import ContactInput from "@/components/ContactInput";
import ExperiencePopup from "@/components/ExperiencePopup";
const uuid = require("uuid");

const Home : FC = () => {
  // state for the right column
  const [allRightColumn, setAllRightColumn] = useState<rightColumnItem[]>([]);
  const [focusedRightItem, setFocusedRightItem] = useState(-1);
  const [focusedIsNew, setFocusedIsNew] = useState(false);
  // state for the left column
  const [allContacts, setAllContacts] = useState<contact[]>([]);
  const [contacts, setContacts] = useState<contact[]>([]);
  const [enteringNewContact, setEnteringNewContact] = useState(false);
  // general state
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3300/allData').then(response => {
      setAllRightColumn(response.data.experiences.map(
        (item : experience) => {
          item.bullets = item.bullets.map(bullet => {
            bullet.shown = bullet.shown == undefined ? true : bullet.shown;
            return bullet;
          })
          item.shown = false;
          return item;
        }
      ));
      setAllContacts(response.data.contacts);
      setContacts(response.data.contacts);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setErrorText("An Error Occured");
    });
  }, []);

  const capitalize = (s : string) => {
    return s.split(' ').map(
      word => word[0].toUpperCase() + word.slice(1)
    ).join(' ');
  }

  const generateNewContactInput = () => {
    const onClose = () => {
      setEnteringNewContact(false)
    }

    const onSubmit = (newContact : contact) => {
      const url = `http://localhost:3300/contacts/`;
      axios.post(url, newContact).then(response => {
        let newAllContacts = allContacts.slice();
        newAllContacts.push(response.data);
        setAllContacts(newAllContacts);
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
        <ContactInput onClose={onClose} onSubmit={onSubmit}/>
      </div>
    )
  }

  const generateLeftColumnBuilder = () => {
    const addContact = () => {
      setEnteringNewContact(true);
    }

    const deleteContact = (contact : contact) => {
      const msg = "This line of contact info will be permanently deleted. Are you sure?";
      if (window.confirm(msg)) {
        const url = `http://localhost:3300/contacts/${contact.name}`;
        axios.delete(url).then(response => {
          const deleted = response.data;
          let index = allContacts.findIndex(cur => cur.name == deleted.name);
          setAllContacts([
            ...allContacts.slice(0, index),
            ...allContacts.slice(index + 1),
          ])
          let index2 = contacts.findIndex(cur => cur.name == deleted.name);
          if (index2 >= 0) {
            setContacts([
              ...contacts.slice(0, index),
              ...contacts.slice(index + 1),
            ])
          }
          alert("Contact info successfully deleted");
        }).catch((err) => {
          console.error(err);
          alert("There was an error; no contact info was deleted");
        })
      }
    }

    const isContactChecked = (contact : contact) => {
      return contacts.findIndex(cur => cur.name == contact.name) != -1;
    }

    const checkContact = (contact : contact) => {
      let index1 = 0;
      let index2 = 0;
      while (allContacts[index1].name !== contact.name) {
        if (isContactChecked(allContacts[index1++])) {
          index2++;
        }
      }
      setContacts([
        ...contacts.slice(0, index2),
        contact,
        ...contacts.slice(index2)
      ]);
    }

    const uncheckContact = (contact : contact) => {
      let index = contacts.findIndex(cur => cur.name == contact.name);
      setContacts([
        ...contacts.slice(0, index),
        ...contacts.slice(index + 1)
      ]);
    }

    const swapContacts = (index1 : number, index2 : number) => {
      if (index1 < 0 || index2 < 0 || index1 >= allContacts.length
      || index2 >= allContacts.length) {
        return;
      }
      let newAllContacts = allContacts.slice();
      let temp = newAllContacts[index1];
      newAllContacts[index1] = newAllContacts[index2];
      newAllContacts[index2] = temp;
      if (isContactChecked(newAllContacts[index1])
      || isContactChecked(newAllContacts[index2])) {
        let newContacts : contact[] = [];
        newAllContacts.forEach(contact => {
          if (isContactChecked(contact)) {
            newContacts.push(contact);
          }
        })
        setContacts(newContacts);
      }
      setAllContacts(newAllContacts);
    }

    return (
      <div className="fixed -left-5 top-12 pl-8 pr-6 py-4 bg-stone-300
      rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          Contact
        </h3>
        { allContacts.map((contact, index) => {
          return <div className="my-1 flex gap-x-2 items-center justify-between">
            <div className="flex gap-x-2">
              { isContactChecked(contact) ? 
                <button onClick={() => uncheckContact(contact)}>
                  <SquareCheckBig size={16}/>
                </button>
              :
                <button onClick={() => checkContact(contact)}>
                  <Square size={16}/>
                </button>
              }
              <span className={"inline-block min-w-20 " + 
              (isContactChecked(contact) ? '' : 'text-stone-500')}>
                {capitalize(contact.name)}
              </span>
            </div>
            <div className="flex gap-x-2">
              <button onClick={() => swapContacts(index, index - 1)}>
                <ChevronUp size={16}/>
              </button>
              <button onClick={() => swapContacts(index, index + 1)}>
                <ChevronDown size={16}/>
              </button>
              <button onClick={() => deleteContact(contact)}>
                <X size={16} className="text-red-600"/>
              </button>
            </div>
          </div>
        })}
        <button className="flex items-center gap-x-1" onClick={addContact}>
          <Plus size={16} className="text-stone-500"/>
          <span className="text-stone-500">Add Contact Field</span>
        </button>
      </div>
    )
  }

  const getNumShownRightItems = () => {
    let count = 0;
    let condition = true;
    while (condition) {
      const cur = allRightColumn[count];
      condition = allRightColumn.length > count;
      condition = condition && (cur.shown == true || cur.isHeading == true);
      count++;
    }
    return count - 1;
  }

  const checkRightColumnItem = (index : number) => {
    let newColumn = allRightColumn.slice();
    let newIndex = getNumShownRightItems();
    newColumn[index].shown = true;
    newColumn = [
      ...newColumn.slice(0, newIndex),
      newColumn[index],
      ...newColumn.slice(newIndex, index),
      ...newColumn.slice(index + 1)
    ]
    setAllRightColumn(newColumn);
  }

  const uncheckRightColumnItem = (index : number) => {
    let newColumn = allRightColumn.slice();
    let newIndex = getNumShownRightItems();
    newColumn[index].shown = false;
    newColumn = [
      ...newColumn.slice(0, index),
      ...newColumn.slice(index + 1, newIndex),
      newColumn[index],
      ...newColumn.slice(newIndex)
    ]
    setAllRightColumn(newColumn);
  }

  const switchRightColumnItems =
  (index1 : number, index2 : number) => {
    const bound = allRightColumn.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newColumn = allRightColumn.slice();
    const temp = newColumn[index1];
    newColumn[index1] = newColumn[index2];
    newColumn[index2] = temp;
    setAllRightColumn(newColumn);
  }

  const generateVisibleRightBuilderItem =
  (item : rightColumnItem, indexInVisible : number) => {

    const onHeadingChange = (value : string) => {
      let newColumn = allRightColumn.slice();
      (newColumn[indexInVisible] as heading).text = value;
      setAllRightColumn(newColumn);
    }

    const ChevronUpClick = () => { 
      switchRightColumnItems(indexInVisible, indexInVisible - 1)
    };

    const ChevronDownClick = () => {
      switchRightColumnItems(indexInVisible, indexInVisible + 1)
    };
    
    if (item.isHeading) {
      return (
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button onClick={() => uncheckRightColumnItem(indexInVisible)}>
              <X size={16}/>
            </button>
            <input 
              className="max-w-40 bg-transparent font-grotesk uppercase
              tracking-widest line-clamp-1 text-ellipsis"
              value={ (item as heading).text }
              onChange={(e) => onHeadingChange(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button onClick={ ChevronUpClick }>
              <ChevronUp size={20}/>
            </button>
            <button onClick={ ChevronDownClick }>
              <ChevronDown size={20}/>
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button onClick={() => uncheckRightColumnItem(indexInVisible)}>
              <SquareCheckBig size={16}/>
            </button>
            <h5 className="max-w-48 line-clamp-1 text-ellipsis">
              { (item as experience).subtitle }
            </h5>
          </div>
          <div className="flex items-center">
            <button onClick={ ChevronUpClick }>
              <ChevronUp size={20}/>
            </button>
            <button onClick={ ChevronDownClick }>
              <ChevronDown size={20}/>
            </button>
          </div>
        </div>
      );
    }
  }

  const generateUncheckedRightBuilderItem = 
  (item : experience, index : number) => {
    return (
      <div key={`right-col-builder-unchecked-${index}`}
      className="flex my-1 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <button onClick={() => checkRightColumnItem(index)}>
            <Square size={16}/>
          </button>
          <h5 className="max-w-48 line-clamp-1 text-ellipsis">
            {item.subtitle}
          </h5>
        </div>
        <div className="min-w-10"/>
      </div>
    );
  }

  const generateRightColumnBuilder = () => {
    const addHeading = () => {
      const index = getNumShownRightItems();
      setAllRightColumn([
        ...allRightColumn.slice(0, index),
        { text: "New Heading", isHeading: true },
        ...allRightColumn.slice(index)
      ]);
    }

    const addExperience = () => {
      let newExperience : experience = {
        id: uuid.v4(),
        title: "New Item",
        dates: "XXX - Present",
        subtitle: "Job Title",
        bullets: [],
        shown: true,
      }
      let newColumn = [newExperience, ...allRightColumn];
      setAllRightColumn(newColumn);
      setFocusedIsNew(true);
      setFocusedRightItem(0);
    }

    return (
      <div className="fixed -right-5 top-12 px-6 py-4 bg-stone-300 rounded-2xl
      shadow-lg">
        <h3 className="mb-2 text-lg font-grotesk font-semibold uppercase
        tracking-ultra">
          Shown
        </h3>
        { allRightColumn.map((element, index) => {
          if (element.shown || element.isHeading) {
            return <div key={`right-col-builder-checked-${index}`}>
              { generateVisibleRightBuilderItem(element, index) }
            </div>
          }
        })}
        <button className="my-1.5 flex items-center gap-x-1 text-stone-500"
        onClick={addHeading}>
          <Plus size={16} className="mr-1"/>Add Heading
        </button>
        <button className="my-1.5 flex items-center gap-x-1 text-stone-500"
        onClick={addExperience}>
          <Plus size={16} className="mr-1"/>Create New Item
        </button>
        <h3 className="my-2 text-lg font-grotesk font-semibold uppercase
        tracking-ultra">
          Hidden
        </h3>
        { allRightColumn.map((element, index) => {
          if (!element.shown && !element.isHeading) {
            let exp = element as experience;
            return generateUncheckedRightBuilderItem(exp, index);
          }
        })}
      </div>
    )
  }

  const generateFocusedRightItem = (index : number) => {
    if (allRightColumn.length <= index || allRightColumn[index].isHeading) {
      return <></>;
    }

    const experience = allRightColumn[index] as experience;

    const updateFocused = (experience : experience) => {
      setAllRightColumn([
        ...allRightColumn.slice(0, index),
        experience,
        ...allRightColumn.slice(index + 1)
      ])
    }

    const revertChanges = () => {
      if (focusedIsNew) {
        setAllRightColumn([...allRightColumn.slice(1)]);
        return;
      }
      let newExperience = structuredClone(experience.oldVer) as experience;
      setAllRightColumn([
        ...allRightColumn.slice(0, index),
        newExperience,
        ...allRightColumn.slice(index + 1)
      ]);
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
        let newAllRight = allRightColumn.slice();
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
        setAllRightColumn(newAllRight);
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
          let newAllRight = allRightColumn.slice();
          const index = newAllRight.findIndex(
            e => !e.isHeading && (e as experience).id == data.data.id
          );
          newAllRight = [
            ...newAllRight.slice(0, index),
            ...newAllRight.slice(index + 1)
          ];
          setAllRightColumn(newAllRight);
          alert("The item was deleted");
          setFocusedRightItem(-1);
        }).catch(() => {
          alert("There was an error, nothing was deleted");
        })
      }
    }

    return (
      <ExperiencePopup
        experience={experience}
        isNewItem={focusedIsNew}
        updateExperience={updateFocused}
        saveChanges={saveChanges}
        revertChanges={revertChanges}
        delete={deleteItem}
        onClose={() => { setFocusedRightItem(-1); setFocusedIsNew(false) }}
      />
    )
  }

  const generateContactSection = () => {
    const getIconForContact = (contact : contact) => {
      if (contact.name == "phone") {
        return <Phone className="text-stone-600" size={16} strokeWidth={1}/>;
      } else if (contact.name == "email") {
        return <Mail className="text-stone-600" size={16} strokeWidth={1}/>;
      } else if (contact.name == "website") {
        return (
          <MousePointer className="text-stone-600" size={16} strokeWidth={1}/>
        );
      } else if (contact.name == "reel") {
        return <Music className="text-stone-600" size={16} strokeWidth={1}/>;
      } else {
        return <Square className="text-stone-600" size={16} strokeWidth={1}/>;
      }
    }

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
        return (
          <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2"
          key={`contact-${contact.name}`}>
            { getIconForContact(contact) }
            { getTextForContact(contact) }
          </div>
        )
      })}
    </>
  }

  const generateEducationSection = () => {
    return <>
      <h5 className="my-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Education
      </h5>
      <div className="text-mini leading-tight">
        <p className="font-bold">B.S. in Computer Science</p>
        <p>Johns Hopkins University, Baltimore MD</p>
        <p>May 2024</p>
        <p>GPA: 3.77 (Combined B.S. and B.M.)</p>
        <p className="font-bold mt-2">B.M. in Music for New Media</p>
        <p>Peabody Institute, Baltimore MD</p>
        <p>May 2024</p>
      </div>
    </>
  }

  const generateSkillsSection = () => {
    return <>
      <h5 className="my-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Skills
      </h5>
      <div className="text-mini leading-tight">
        <p className="font-bold">Programming Languages</p>
        <p>C#, C++, C, JS/TypeScript, Java, Python</p>
        <p className="mt-2 font-bold">Game Audio Software</p>
        <p>Wwise, Unity Audio System</p>
        <p className="mt-2 font-bold">Game Engines</p>
        <p>Unity, Godot, RPG Maker VX Ace</p>
        <p className="mt-2 font-bold">Languages</p>
        <p>Conversational Japanese</p>
        <p className="mt-2 font-bold">Relevant Coursework</p>
        <p className="mr-6 text-justify">Software System Design, Object-Oriented Software Engineering, Data Structures, Operating Systems, Sound Design for Games, Linear Algebra, Calculus</p>
      </div>
    </>
  }

  const generateReferencesSection = () => {
    return <>
      <h5 className="pl-4 py-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        References
      </h5>
      <div className="text-mini leading-tight">
        <div className="mr-4 bg-stone-200 min-h-4 pt-3 px-4 pb-2">
          <p className="font-bold">Daniel Kluger</p>
          <p>Most Recent Employer</p>
          <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
            <Mail className="text-stone-600" size={16} strokeWidth={1}/>
            <a className="text-mini" href="mailto:daniel.kluger@icloud.com">
              daniel.kluger@icloud.com
            </a>
          </div>
          <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
            <MousePointer className="text-stone-600" size={16} strokeWidth={1}/>
            <a className="text-mini underline"
            href="https://www.danielkluger.com/">
              https://www.danielkluger.com/
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 text-mini leading-tight">
        <div className="mr-4 bg-stone-200 min-h-4 pt-3 px-4 pb-2">
          <p className="font-bold">Phillip Klassen</p>
          <p>Game Audio Professor</p>
          <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
            <Mail className="text-stone-600 shrink-0" size={16}
            strokeWidth={1}/>
            <a className="text-mini" href="mailto:phillip.klassen@oxidegames.com">
              phillip.klassen@oxidegames.com
            </a>
          </div>
          <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
            <LinkedinIcon className="text-stone-600 shrink-0" size={16}
            strokeWidth={1}/>
            <a className="text-mini underline break-all"
            href="https://www.linkedin.com/in/phillip-klassen-ab4108105">
              https://www.linkedin.com/in/phillip-klassen-ab4108105
            </a>
          </div>
        </div>
      </div>
    </>
  }

  const generateHeadingJSX = 
  (heading : heading, index : number, className?: string) => {

    const onHeadingChange = (value : string) => {
      let newColumn = allRightColumn.slice();
      (newColumn[index] as heading).text = value;
      setAllRightColumn(newColumn);
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
      <div className="w-[816px] h-[1056px] border-black border">
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
          <div className="max-w-[19rem] flex-grow-[8] flex flex-col">
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
          <div className="flex-grow-[13] pl-6 pr-20 pt-2 pb-2">
            {allRightColumn.map((item, index) => {
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
    { generateLeftColumnBuilder() }
    { generateRightColumnBuilder() }
    { focusedRightItem >= 0 ? generateFocusedRightItem(focusedRightItem) : "" }
    { enteringNewContact ? generateNewContactInput() : '' }
  </>;
}

export default Home;