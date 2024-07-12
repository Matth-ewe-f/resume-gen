import { LinkedinIcon, Mail, MousePointer, Phone } from "lucide-react";

type experience = {
  title: string,
  dates: string,
  subtitle: string,
  bullets: string[]
}

type heading = {
  text: string
}

type leftColumnItem = experience | heading;

const isHeading = (item: any) => { return item.text !== undefined }

export default function Home() {
  const leftColumnItems : leftColumnItem[] = [
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
        "Received academic credit for work; project was overseen by JHU faculty advisor",
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
        "Programmed various platforming mechanics and UI elements using Unity C# scripts",
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
      subtitle: "Sounds of Adventure (Independent VGM collection",
      bullets: [
        "Composed collection of game music with multiple sales on the Unity Asset Store",
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
  ]

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
        <p>Johns Hopkins University, Baltimore MD., USA</p>
        <p>May 2024</p>
        <p>GPA: 3.77 (Combined B.S. and B.M.)</p>
        <p className="font-bold mt-4">B.M. in Music for New Media</p>
        <p>Peabody Institute, Baltimore MD., USA</p>
        <p>May 2024</p>
        <p>Studied under Thomas Dolby</p>
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
  (experience : experience, className?: string) => {
    if (className == undefined) {
      className = "";
    }
    return <>
      <div className={`${className} leading-tight`}>
        <div className="flex flex-row justify-between items-end">
          <h5 className="font-semibold text-sm">{experience.title}</h5>
          <span className="text-mini">{experience.dates}</span>
        </div>
        <p className="text-mini">{experience.subtitle}</p>
        <ul className="ml-4 text-mini list-disc text-justify">
          {experience.bullets.map(bullet => {
            return <li>{bullet}</li>
          })}
        </ul>
      </div>
    </>;
  }

  const generateHeadingJSX = (heading: heading, className? : string) => {
    if (className == undefined) {
      className = "";
    }
    return <>
      <h5 className={`${className} font-grotesk font-medium uppercase ` +
      `tracking-widest`}>
        {heading.text}
      </h5>
    </>;
  }

  return <div className="w-[816px] h-[1056px]">
    <h1 className="mt-8 text-4.5xl text-center font-medium uppercase
    font-grotesk tracking-ultra">
      Matthew Flynn
    </h1>
    <h3 className="mb-4 text-center uppercase font-light
    tracking-widest">
      Programmer, Composer
    </h3>
    <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
    <div className="flex flex-row w-full">
      <div className="flex-grow-[8] flex flex-col">
        <div className="max-w-[19rem] pl-[5.5rem] bg-stone-100 pb-1">
          { generateContactSection() }
          <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
          { generateEducationSection() }
          <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
          { generateSkillsSection() }
          <hr className="mt-4 mr-8 border-dashed border-t border-stone-600"/>
        </div>
        <div className="max-w-[19rem] pl-[4.5rem] bg-stone-100">
          { generateReferencesSection() }
        </div>
        <div className="flex-grow bg-stone-100"/>
      </div>
      <div className="flex-grow-[13] pl-6 pr-20 pt-2 pb-2">
        {leftColumnItems.map(item => {
          if (isHeading(item)) {
            return generateHeadingJSX(item as heading, "my-2.5");
          } else {
            return generateExperienceJSX(item as experience, "my-2.5");
          }
        })}
      </div>
    </div>
    <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
  </div>;
}
