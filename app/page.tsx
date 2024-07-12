"use client";
import SmartTextArea from "@/components/SmartTextArea";
import { LinkedinIcon, Mail, MousePointer, Phone, Square, SquareCheckBig } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { cv } from "@/data";

const Home : FC = () => {
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);
  const [rightColumnChecks, setRightColumnChecks] = useState<boolean[]>([]);
  const [allRightColumn, setAllRightColumn] = useState<experience[]>([]);

  const isHeading = (item: any) => { return item.text !== undefined }

  useEffect(() => {
    setAllRightColumn(cv);
    let checks : boolean[] = [];
    for (let i = 0;i < cv.length;i++) {
      checks[i] = false;
    }
    setRightColumnChecks(checks);
    setRightColumn([]);
  }, []);

  useEffect(() => {
    let newColumn : rightColumnItem[] = [];
    rightColumnChecks.forEach((value, index) => {
      if (value) {
        newColumn.push(allRightColumn[index]);
      }
    })
    setRightColumn(newColumn);
  }, [rightColumnChecks]);

  const checkRightColumnItem = (index : number) => {
    let newChecks = rightColumnChecks.slice();
    newChecks[index] = !newChecks[index];
    setRightColumnChecks(newChecks);
  }

  const generateRightColumnBuilder = () => {
    return (
      <div className="fixed -right-5 top-12 px-6 py-4 bg-stone-300 rounded-2xl">
        { allRightColumn.map((element, index) => {
          if (!isHeading(element)) {
            element = element as experience;
            return (
              <div key={`all-right-col-${index}`} className="flex gap-x-2 my-1">
                <button onClick={() => checkRightColumnItem(index)}>
                  { rightColumnChecks[index] ? 
                    <SquareCheckBig size={16}/>
                  :
                    <Square size={16}/>
                  }
                </button>
                <h5 className="max-w-48 line-clamp-1 font-semibold
                text-ellipsis">
                  {element.subtitle}
                </h5>
              </div>
            );
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