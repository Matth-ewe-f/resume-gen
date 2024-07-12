"use client";
import SmartTextArea from "@/components/SmartTextArea";
import { LinkedinIcon, Mail, MousePointer, Phone } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";

type experience = {
  title: string,
  dates: string,
  subtitle: string,
  bullets: string[]
}

type heading = {
  text: string
}

type rightColumnItem = experience | heading;

const isHeading = (item: any) => { return item.text !== undefined }

const Home : FC = () => {
  const [rightColumn, setRightColumn] = useState<rightColumnItem[]>([]);

  useEffect(() => {
    setRightColumn([
      { text: "Programming & Audio Implementation" },
      {
        title: "Technical Sound Designer",
        dates: "Oct 2023 - Jan 2024",
        subtitle: "Dynamic Ambience System in Unity (School Project)",
        bullets: [
          "Created system to trigger ambient sound effects and modulate volume, spatialization, rate, etc., based on proximity, density, and relative location of tagged game objects",
          "System eliminates the need for long ambience loops, and adds realism to the game world by dynamically changing the ambience to reflect the environment",
          "Developed tooling to set how game parameters affect generated ambience without the need to modify any code",
        ]
      },
      {
        title: "Web Developer",
        dates: "May - Sep 2022",
        subtitle: "uCredit",
        bullets: [
          "Cooperated with 15 JHU students to build a degree requirement planning app",
          "Utilized the MERN stack, and related technologies such as Cypress and Next.js",
          "Received academic credit for work; project overseen by JHU faculty advisor",
          "Collaborated effectively with an existing team by studying and understanding legacy code, adapting to pre-established programming practices, etc.",
        ]
      },
      {
        title: "Audio Programmer & General Programmer",
        dates: "Mar - Aug 2021",
        subtitle: "Project Dew (Video Game)",
        bullets: [
          "Implemented music and sound effects using Wwise",
          "Integrated Wwise with Unity, handled all event and game sync programming",
          "Handled dynamic loading of Wwise Soundbanks based on gameplay scenario",
          "Programmed platforming mechanics and UI elements using Unity C# scripts",
        ]
      },
      {
        title: "Music Implentation & Composer",
        dates: "Feb - Aug 2021",
        subtitle: "Project Nono (Video Game)",
        bullets: [
          "Worked on game for physical therapy and stroke rehabilitation, developed by the Kata Design Studio of the Johns Hopkins University Medical Center",
          "Developed and implemented highly interactive music system using MIDI in Wwise",
          "Utilized Wwise RTPCs to modulate the music's tempo, instrumentation, timbre, and arrangement, exceeding the capabilities of typical adaptive music systems",
          "Encouraged patient engagement by making the music respond specifically to controller input from the player, instead of high-level game states",
        ]
      },
      {
        title: "Composer & Programmer",
        dates: "Feb - Apr 2021",
        subtitle: "Sounds of Adventure (Independent VGM collection)",
        bullets: [
          "Composed collection of game music with sales on the Unity Asset Store",
          "Programmed playback engine to handle looping, fading, track transitions, etc. in C#, on top of Unity's built in audio system",
        ]
      },
      { text: "Employment" },
      {
        title: "Composer/Sound Designer Assistant",
        dates: "Summer 2023",
        subtitle: "To Daniel Kluger, Grammy-nominated and Tony-winning composer and sound designer",
        bullets: [
          "Contributed to planning and set up of signal flow, equipment, and acoustic treatment of 5.1-capable studio outfitted with multiple synths and monitors",
          "Created DAW templates for creative projects and assisted in ideation",
          "Learned to work independently, acquiring skills and solving problems as they arose",
        ]
      },
      {
        title: "Contract Composer",
        dates: "Winter 2020-21, Summer 2019",
        subtitle: "Creative Outfit Inc., Philadelphia, PA",
        bullets: [
          "Composed and mixed music for advertisements and other media for clients such as Thomas Jefferson Health System and the Make-A-Wish Foundation",
          "Completed professional-level work and successfully managed deadlines in both an inoffice and work-from-home context",
        ]
      },
    ])
  }, []);

  const getIndexInRightColumn = (title: string) => {
    for (let i = 0;i < rightColumn.length;i++) {
      const element = rightColumn[i];
      if (isHeading(element)) {
        if ((element as heading).text == title) {
          return i;
        }
      } else {
        if ((element as experience).title == title) {
          return i;
        }
      }
    }
    return -1;
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
  </>;
}

export default Home;