"use client";
import SmartTextArea from "@/components/SmartTextArea";
import { ChevronDown, ChevronUp, LinkedinIcon, Mail, MousePointer, Phone, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import axios from "axios";
const uuid = require("uuid");

const Home : FC = () => {
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);
  const [allRightColumn, setAllRightColumn] = useState<experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [focusedRightItem, setFocusedRightItem] = useState(-1);
  const [extraBullets, setExtraBullets] = useState<bullet[]>([]);

  useEffect(() => {
    setRightColumn([]);
    axios.get('http://localhost:3300/allData').then(response => {
      setAllRightColumn(response.data.experiences);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setErrorText("An Error Occured");
    });
  }, []);

  const visibleInRightColumn = (item : rightColumnItem) => {
    for (let i = 0;i < rightColumn.length;i++) {
      const cur = rightColumn[i];
      if (item.isHeading && cur.isHeading) {
        if ((item as heading).text === (cur as heading).text) {
          return true;
        }
      } else if (!item.isHeading && !cur.isHeading) {
        if ((item as experience).id === (cur as experience).id) {
          return true;
        }
      }
    }
    return false;
  }

  const checkRightColumnItem = (indexInAll : number) => {
    let newColumn = rightColumn.slice();
    newColumn.push(structuredClone(allRightColumn[indexInAll]));
    setRightColumn(newColumn);
  }

  const uncheckRightColumnItem = (indexInVisible : number) => {
    setRightColumn([
      ...rightColumn.slice(0, indexInVisible),
      ...rightColumn.slice(indexInVisible + 1)
    ]);
  }

  const switchRightColumnItems =
  (indexInVisible1 : number, indexInVisible2 : number) => {
    if (indexInVisible1 < 0 || indexInVisible2 < 0
    || indexInVisible1 >= rightColumn.length
    || indexInVisible2 >= rightColumn.length) {
      return;
    }
    let newColumn = rightColumn.slice();
    const temp = newColumn[indexInVisible1];
    newColumn[indexInVisible1] = newColumn[indexInVisible2];
    newColumn[indexInVisible2] = temp;
    setRightColumn(newColumn);
  }

  const generateVisibleRightBuilderItem =
  (item : rightColumnItem, indexInVisible : number) => {
    const onHeadingChange = (value : string) => {
      let newColumn = rightColumn.slice();
      (newColumn[indexInVisible] as heading).text = value;
      setRightColumn(newColumn);
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
      setRightColumn([
        { text: "New Heading", isHeading: true },
        ...rightColumn
      ]);
    }

    return (
      <div className="fixed -right-5 top-12 px-6 py-4 bg-stone-300 rounded-2xl
      shadow-lg">
        <h3 className="mb-2 text-lg font-grotesk font-semibold uppercase
        tracking-ultra">
          Shown
        </h3>
        <button className="flex items-center gap-x-1 text-stone-500"
        onClick={addHeading}>
          <Plus size={16}/>Add Heading
        </button>
        { rightColumn.map((element, index) => {
          return <div key={`right-col-builder-checked-${index}`}>
            { generateVisibleRightBuilderItem(element, index) }
          </div>
        })}
        <h3 className="my-2 text-lg font-grotesk font-semibold uppercase
        tracking-ultra">
          Hidden
        </h3>
        { allRightColumn.map((element, index) => {
          if (!visibleInRightColumn(element)) {
            return generateUncheckedRightBuilderItem(element, index);
          }
        })}
      </div>
    )
  }

  const generateFocusedRightItem = (indexInVisible : number) => {
    if (rightColumn.length <= indexInVisible
    || rightColumn[indexInVisible].isHeading) {
      return <></>;
    }

    const experience = rightColumn[indexInVisible] as experience;

    const getSavedVersion = () => {
      for (let i = 0;i < allRightColumn.length;i++) {
        if (allRightColumn[i].id == experience.id) {
          return allRightColumn[i];
        }
      }
      return { id: "", title: "", dates: "", subtitle: "", bullets: [] };
    }

    const savedVersion = getSavedVersion();

    const isBulletShowing = (id : string) => {
      for (let i = 0;i < experience.bullets.length;i++) {
        if (experience.bullets[i].id == id) {
          return true;
        }
      }
      return false;
    }

    const onClose = () => {
      setFocusedRightItem(-1);
      setExtraBullets([]);
    }

    const onTitleChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[indexInVisible] as experience).title = value;
      setRightColumn(newColumn);
    }

    const onSubtitleChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[indexInVisible] as experience).subtitle = value;
      setRightColumn(newColumn);
    }

    const onDateChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[indexInVisible] as experience).dates = value;
      setRightColumn(newColumn);
    }

    const onBulletChange =
    (event : ChangeEvent<HTMLTextAreaElement>, bulletIndex : number) => {
      let newColumn = rightColumn.slice(0);
      const text = event.target.value;
      if (text[text.length - 1] == '\n') {
        let newBullets = (newColumn[indexInVisible] as experience).bullets;
        newBullets = [
          ...newBullets.slice(0, bulletIndex + 1),
          { id : uuid.v4(), text: "" },
          ...newBullets.slice(bulletIndex + 1)
        ];
        (newColumn[indexInVisible] as experience).bullets = newBullets;
      } else {
        (newColumn[indexInVisible] as experience).bullets[bulletIndex].text = text;
      }
      setRightColumn(newColumn);
    }

    const onBulletKeyDown = (e : any, bulletIndex : number) => {
      if (e.keyCode == 8) {
        let bullets = (rightColumn[indexInVisible] as experience).bullets;
        if (bullets[bulletIndex].text == "") {
          let newColumn = rightColumn.slice(0);
          bullets = [
            ...bullets.slice(0, bulletIndex),
            ...bullets.slice(bulletIndex + 1)
          ];
          (newColumn[indexInVisible] as experience).bullets = bullets;
          setRightColumn(newColumn);
        }
      }
    }

    const addNewBullet = () => {
      const newBullet = { id: uuid.v4(), text: "New Bullet" };
      let newColumn = rightColumn.slice();
      (newColumn[indexInVisible] as experience).bullets.push(newBullet);
      setRightColumn(newColumn);
      let newExtras = extraBullets.slice();
      newExtras.push(newBullet);
      setExtraBullets(newExtras);
    }

    const showBullet = (bullet : bullet) => {
      let newColumn = rightColumn.slice();
      (newColumn[indexInVisible] as experience).bullets.push(bullet);
      setRightColumn(newColumn);
    }

    const hideBullet = (id : string) => {
      let newColumn = rightColumn.slice();
      let experience = newColumn[indexInVisible] as experience;
      let index = experience.bullets.findIndex(bullet => bullet.id == id);
      experience.bullets = [
        ...experience.bullets.slice(0, index),
        ...experience.bullets.slice(index + 1)
      ];
      setRightColumn(newColumn);
    }

    const swapBullets = (index1 : number, index2 : number) => {
      if (index1 < 0 || index2 < 0 || index1 >= experience.bullets.length
      || index2 >= experience.bullets.length) {
        return;
      }
      let newColumn = rightColumn.slice();
      let newExperience = newColumn[indexInVisible] as experience;
      const temp = newExperience.bullets[index1];
      newExperience.bullets[index1] = newExperience.bullets[index2];
      newExperience.bullets[index2] = temp;
      setRightColumn(newColumn);
    }

    const longDate = experience.dates.length > 20;

    return (
      <div className="fixed top-0 p-16 w-screen h-screen flex items-center
      justify-center bg-white bg-opacity-70">
        <div className="w-[575px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-xl font-grotesk uppercase tracking-ultra">
              Edit Item
            </h3>
            <button onClick={ onClose }>
              <X size={32} className="hover:text-stone-400"/>
            </button>
          </div>
          <hr className="mb-3 border-t border-stone-700"/>
          <div className="leading-tight [&_*]:bg-transparent">
            <div className="flex flex-row justify-between items-end">
              <input
                className="flex-grow font-semibold text-lg max-w-96"
                value={experience.title}
                onChange={(e) => onTitleChange(e.target.value)}
              />
              <input
                className={`pb-0.5 text-right text-sm ` +
                `${longDate ? 'w-52' : 'w-40'}`}
                value={experience.dates}
                onChange={(e) => onDateChange(e.target.value)}
              />
            </div>
            <input
              className="relative -top-[5px] w-full text-sm"
              value={experience.subtitle}
              onChange={(e) => onSubtitleChange(e.target.value)}
            />
            <ul className="-mt-1 ml-2 text-sm list-none text-justify">
              { experience.bullets.map((bullet, i) => {
                return (
                  <li className="flex flex-row gap-x-1"
                  key={`bullet-focused-enabled-${i}`}>
                    <button className="h-fit w-5" 
                    onClick={ () => hideBullet(bullet.id) }>
                      <SquareCheckBig size={20} className="pt-0.5"/>
                    </button>
                    <button className="h-fit w-5"
                    onClick={ () => swapBullets(i, i - 1) }>
                      <ChevronUp size={20}/>
                    </button>
                    <button className="h-fit w-5"
                    onClick={ () => swapBullets(i, i + 1) }>
                      <ChevronDown size={20}/>
                    </button>
                    <SmartTextArea
                      className="w-full resize-none"
                      text={bullet.text}
                      onChange={(e) => onBulletChange(e, i)}
                      onKeyDown={(e) => onBulletKeyDown(e, i)}
                    />
                  </li>
                )
              })}
            </ul>
            <hr className="my-2 ml-16 border-t border-stone-700
            border-dashed"/>
            <ul className="ml-2 text-sm list-none text-justify">
              { [...savedVersion.bullets, ...extraBullets].map((bullet, i) => {
                if (!isBulletShowing(bullet.id)) {
                  return (
                    <li className="flex flex-row gap-x-1"
                    key={`bullet-focused-disabled-${i}`}>
                      <button className="h-fit w-5"
                      onClick={ () => showBullet(bullet) }>
                        <Square size={20} className="pt-0.5"/>
                      </button>
                      <div className="w-[3.25rem]"/>
                      <SmartTextArea
                        className="w-full resize-none  text-stone-400"
                        text={bullet.text}
                        disabled={true}
                      />
                    </li>
                  )
                }
              })}
            </ul>
            <button className="ml-2 mt-2 flex gap-x-2 items-center"
            onClick={ addNewBullet }>
              <Plus size={20}/>
              <span className="pt-0.5 text-sm">Add Bullet Point</span>
            </button>
          </div>
          <hr className="my-4 border-t border-stone-600"/>
          <button className="px-3 py-1.5 bg-stone-800 hover:bg-stone-600
          text-stone-200 rounded-md">
            Save
          </button>
        </div>
      </div>
    )
  }

  const generateContactSection = () => {
    return <>
      <h5 className="pt-4 mb-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Contact
      </h5>
      <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
        <Mail className="text-stone-600" size={16} strokeWidth={1}/>
        <a className="text-mini" href="mailto:matthew.flynn.sound@gmail.com">
          matthew.flynn.sound@gmail.com
        </a>
      </div>
      <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
        <Phone className="text-stone-600" size={16} strokeWidth={1}/>
        <span className="text-mini">215-760-8565</span>
      </div>
      <div className="my-2 flex flex-row items-center flex-nowrap gap-x-2">
        <MousePointer className="text-stone-600" size={16} strokeWidth={1}/>
        <a className="text-mini underline"
        href="http://matthewflynnmusic.com/">
          http://matthewflynnmusic.com/
        </a>
      </div>
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
  (experience : experience, indexInVisible : number, className?: string) => {
    if (className == undefined) {
      className = "";
    }

    // const onTitleChange = (value : string) => {
    //   let newColumn = rightColumn.slice(0);
    //   (newColumn[index] as experience).title = value;
    //   setRightColumn(newColumn);
    // }

    // const onSubtitleChange = (value : string) => {
    //   let newColumn = rightColumn.slice(0);
    //   (newColumn[index] as experience).subtitle = value;
    //   setRightColumn(newColumn);
    // }

    // const onDateChange = (value : string) => {
    //   let newColumn = rightColumn.slice(0);
    //   (newColumn[index] as experience).dates = value;
    //   setRightColumn(newColumn);
    // }

    // const onBulletChange =
    // (event : ChangeEvent<HTMLTextAreaElement>, bulletIndex : number) => {
    //   let newColumn = rightColumn.slice(0);
    //   const text = event.target.value;
    //   if (text[text.length - 1] == '\n') {
    //     let newBullets = (newColumn[index] as experience).bullets;
    //     newBullets = [
    //       ...newBullets.slice(0, bulletIndex + 1),
    //       "",
    //       ...newBullets.slice(bulletIndex + 1)
    //     ];
    //     (newColumn[index] as experience).bullets = newBullets;
    //   } else {
    //     (newColumn[index] as experience).bullets[bulletIndex] = text;
    //   }
    //   setRightColumn(newColumn);
    // }

    // const onBulletKeyDown = (e : any, bulletIndex : number) => {
    //   if (e.keyCode == 8) {
    //     let bullets = (rightColumn[index] as experience).bullets;
    //     if (bullets[bulletIndex] == "") {
    //       let newColumn = rightColumn.slice(0);
    //       bullets = [
    //         ...bullets.slice(0, bulletIndex),
    //         ...bullets.slice(bulletIndex + 1)
    //       ];
    //       (newColumn[index] as experience).bullets = bullets;
    //       setRightColumn(newColumn);
    //     }
    //   }
    // }

    return (
      <button 
        key={`right-col-${indexInVisible}`}
        className={`block ${className}`}
        onClick={ () => setFocusedRightItem(indexInVisible) }
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
              return (
                <li key={`bullet-${indexInVisible}-${j}`}>
                  {bullet.text}
                </li>
              )
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
            {rightColumn.map((item, index) => {
              if (item.isHeading) {
                return generateHeadingJSX(item as heading, index, "mt-1")
              } else {
                return generateExperienceJSX(item as experience, index, "my-2.5");
              }
            })}
          </div>
        </div>
        <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
      </div>
    </div>
    { generateRightColumnBuilder() }
    { focusedRightItem >= 0 ?
      generateFocusedRightItem(focusedRightItem)
    :
      ""
    }
  </>;
}

export default Home;