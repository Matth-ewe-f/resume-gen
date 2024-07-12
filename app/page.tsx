"use client";
import SmartTextArea from "@/components/SmartTextArea";
import { ChevronDown, ChevronUp, LinkedinIcon, Mail, MousePointer, Phone, Square, SquareCheckBig } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { cv } from "@/data";

const Home : FC = () => {
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);
  const [rightColumnIndices, setRightColumnIndices] = useState<number[]>([]);
  const [allRightColumn, setAllRightColumn] = useState<experience[]>([]);
  const [nextInRightColumn, setNextInRightColumn] = useState(0);

  const isHeading = (item: any) => { return item.text !== undefined }

  useEffect(() => {
    setAllRightColumn(cv);
    let checks : number[] = [];
    for (let i = 0;i < cv.length;i++) {
      checks[i] = -1;
    }
    setRightColumnIndices(checks);
    setRightColumn([]);
  }, []);

  useEffect(() => {
    let newColumn : rightColumnItem[] = [];
    rightColumnIndices.forEach((value, index) => {
      if (value >= 0) {
        newColumn[value] = allRightColumn[index];
      }
    })
    setRightColumn(newColumn);
  }, [rightColumnIndices]);

  const rightColumnAnythingShown = () => {
    for (let i = 0;i < rightColumnIndices.length;i++) {
      if (rightColumnIndices[i] >= 0){
        return true;
      }
    }
    return false;
  }

  const checkRightColumnItem = (index : number) => {
    let newIndices = rightColumnIndices.slice();
    newIndices[index] = nextInRightColumn;
    setNextInRightColumn(nextInRightColumn + 1);
    setRightColumnIndices(newIndices);
  }

  const uncheckRightColumnItem = (displayIndex : number) => {
    let index = -1;
    rightColumnIndices.forEach((value, i) => {
      if (value == displayIndex) {
        index = i;
      }
    })
    if (index == -1) {
      return;
    }
    let newIndices = rightColumnIndices.slice();
    if (newIndices[index] == -1) {
      newIndices[index] = nextInRightColumn;
      setNextInRightColumn(nextInRightColumn + 1);
    } else {
      let removal = newIndices[index];
      for (let i = 0;i < newIndices.length;i++) {
        if (newIndices[i] > removal) {
          newIndices[i]--;
        }
      }
      newIndices[index] = -1;
      setNextInRightColumn(nextInRightColumn - 1);
    }
    setRightColumnIndices(newIndices);
  }

  const switchRightColumnItems = (a : number, b : number) => {
    if (a < 0 || b < 0) {
      return;
    }
    let index1 = -1;
    let index2 = -1;
    rightColumnIndices.forEach((value, index) => {
      if (value == a) {
        index1 = index;
      } else if (value == b) {
        index2 = index;
      }
    })
    if (index1 >= 0 && index2 >= 0) {
      let newIndices = rightColumnIndices.slice();
      let temp = newIndices[index1];
      newIndices[index1] = newIndices[index2];
      newIndices[index2] = temp;
      setRightColumnIndices(newIndices);
    }
  }

  const generateCheckedRightBuilderItem =
  (item : rightColumnItem, index : number) => {
    const ChevronUpClick = () => { switchRightColumnItems(index, index - 1) };
    const ChevronDownClick = () => { switchRightColumnItems(index, index + 1) };

    if (!isHeading(item)) {
      item = item as experience;
      return (
        <div key={`right-col-builder-checked-${index}`}
        className="flex my-1 items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button onClick={() => uncheckRightColumnItem(index)}>
              <SquareCheckBig size={16}/>
            </button>
            <h5 className="max-w-48 line-clamp-1 text-ellipsis">
              {item.subtitle}
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
    return (
      <div className="fixed -right-5 top-12 px-6 py-4 bg-stone-300 rounded-2xl">
        <h3 className="font-grotesk font-semibold uppercase tracking-ultra">
          Shown
        </h3>
        { rightColumn.map((element, index) => {
          return generateCheckedRightBuilderItem(element, index);
        })}
        { !rightColumnAnythingShown() ? 
          <span className="text-sm text-stone-500">(Nothing)</span>
        :
          ""
        }
        <h3 className="font-grotesk font-semibold uppercase tracking-ultra">
          Hidden
        </h3>
        { allRightColumn.map((element, index) => {
          if (rightColumnIndices[index] < 0) {
            return generateUncheckedRightBuilderItem(element, index);
          }
        })}
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

  const generateExperienceJSX = 
  (experience : experience, index : number, className?: string) => {
    if (className == undefined) {
      className = "";
    }

    const onTitleChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[index] as experience).title = value;
      setRightColumn(newColumn);
    }

    const onSubtitleChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[index] as experience).subtitle = value;
      setRightColumn(newColumn);
    }

    const onDateChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[index] as experience).dates = value;
      setRightColumn(newColumn);
    }

    const onBulletChange =
    (event : ChangeEvent<HTMLTextAreaElement>, bulletIndex : number) => {
      let newColumn = rightColumn.slice(0);
      const text = event.target.value;
      if (text[text.length - 1] == '\n') {
        let newBullets = (newColumn[index] as experience).bullets;
        newBullets = [
          ...newBullets.slice(0, bulletIndex + 1),
          "",
          ...newBullets.slice(bulletIndex + 1)
        ];
        (newColumn[index] as experience).bullets = newBullets;
      } else {
        (newColumn[index] as experience).bullets[bulletIndex] = text;
      }
      setRightColumn(newColumn);
    }

    const onBulletKeyDown = (e : any, bulletIndex : number) => {
      if (e.keyCode == 8) {
        let bullets = (rightColumn[index] as experience).bullets;
        if (bullets[bulletIndex] == "") {
          let newColumn = rightColumn.slice(0);
          bullets = [
            ...bullets.slice(0, bulletIndex),
            ...bullets.slice(bulletIndex + 1)
          ];
          (newColumn[index] as experience).bullets = bullets;
          setRightColumn(newColumn);
        }
      }
    }

    const longDate = experience.dates.length > 20;

    return (
      <div className={`${className} leading-tight`} key={`right-col-${index}`}>
        <div className="flex flex-row justify-between items-end">
          <input
            className="flex-grow font-semibold text-sm max-w-96"
            value={experience.title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <input
            className={`text-right text-mini ${longDate ? 'w-40' : 'w-28'}`}
            value={experience.dates}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <input
          className="relative -top-[5px] w-full text-mini"
          value={experience.subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
        />
        <ul className="-mt-1.5 ml-2 text-mini list-none text-justify">
          {experience.bullets.map((bullet, j) => {
            return (
              <li className="flex flex-row gap-x-1"
              key={`bullet-${index}-${j}`}>
                <span>&#8226;</span>
                <SmartTextArea
                  className="w-full resize-none"
                  text={bullet}
                  onChange={(e) => onBulletChange(e, j)}
                  onKeyDown={(e) => onBulletKeyDown(e, j)}
                />
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

  const generateHeadingJSX =
  (heading: heading, index: number, className? : string) => {
    if (className == undefined) {
      className = "";
    }

    const onTitleChange = (value : string) => {
      let newColumn = rightColumn.slice(0);
      (newColumn[index] as heading).text = value;
      setRightColumn(newColumn);
    }

    const onTitleKeyDown = (e : any) => {
      if (e.keyCode == 8) {
        if ((rightColumn[index] as heading).text == "") {
          let newColumn = [
            ...rightColumn.slice(0, index),
            ...rightColumn.slice(index + 1)
          ];
          setRightColumn(newColumn);
        }
      }
    }

    return <input
      className={`${className} w-full font-grotesk font-medium ` +
      `uppercase tracking-widest`}
      key={`right-col-${index}`}
      value={heading.text}
      onChange={(e) => onTitleChange(e.target.value)}
      onKeyDown={onTitleKeyDown}
    />
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
              if (isHeading(item)) {
                return generateHeadingJSX(item as heading, index, "my-1.5");
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
  </>;
}

export default Home;