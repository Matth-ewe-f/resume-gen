import { Phone, Mail, MousePointer, Music, LinkedinIcon, House, Square } from "lucide-react";
import { FC } from "react";
import { FaGithub } from "react-icons/fa";

type props = {
  // resume display data
  border: boolean,
  name: string,
  tagline: string,
  rightColumn: rightColumnItem[],
  contacts: contact[],
  education: string,
  skills: skillList[],
  references: reference[],
  // functions
  showPopup: (popupName: string) => void,
  setFocusedRightItem: (index: number) => void,
  setRightColumn: (newColumn: rightColumnItem[]) => void,
  setFocusedSkill: (index: number) => void,
};

const Resume : FC<props> = (props) => {
  const showPopup = props.showPopup;

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
    } else if (type == "address") {
      return <House className={className} size={16} strokeWidth={1}/>
    } else {
      return <Square className={className} size={16} strokeWidth={1}/>;
    }
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
      { props.contacts.map(contact => {
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
    return (
      <button onClick={() => showPopup("education")} className="text-left">
        <h5 className="mb-2 text font-grotesk font-medium uppercase
        tracking-ultra">
          Education
        </h5>
        { props.education != "" &&
          <div className="text-left text-mini leading-tight">
            { props.education.split("\n").map(line => {
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
      </button>
    );
  }

  const generateSkillsSection = () => {
    const createListString = (list : skillList) => {
      let s = list.items.filter(i => i.shown).map(i => i.text).join(', ');
      return s
    }

    const onClick = (index : number) => {
      props.setFocusedSkill(index);
      showPopup("skills");
    }

    return <>
      <h5 className="my-2 text font-grotesk font-medium uppercase
      tracking-ultra">
        Skills
      </h5>
      <div className="text-mini leading-tight">
        { props.skills.map((list, index) => {
          if (list.shown) {
            return (
              <button className="block w-full text-left"
              onClick={ () => onClick(index) }>
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
        { props.references.map(reference => {
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
      let newColumn = props.rightColumn.slice();
      (newColumn[index] as heading).text = value;
      props.setRightColumn(newColumn);
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

    const onClick = () => {
      props.setFocusedRightItem(index);
      showPopup("experience");
    }

    const processMdSubset = (text : string) => {
      const processLink = (text : string) => {
        let jsx : (JSX.Element | string)[] = [];
        const linkRegex = /\[.+?\]\(.+?\)/;
        let match = text.match(linkRegex);
        while (match) {
          const link = match[0];
          jsx.push(text.substring(0, match.index));
          jsx.push(
            <a href={link.split(/[\(\)]/)[1]} className="underline">
              {link.substring(1, link.indexOf("]"))}
            </a>
          );
          text = text.substring((match.index || 0) + link.length);
          match = text.match(linkRegex);
        }
        jsx.push(text);
        return jsx;
      }

      return text.split("**").map((piece, index) => {
        if (index % 2 == 0) {
          return processLink(piece);
        } else {
          return <span className="font-bold">{processLink(piece)}</span>
        }
      })
    }

    return (
      <button 
        key={`right-col-${index}`}
        className={`block w-full ${className}`}
        onClick={ onClick }
      >
        <div className="text-left leading-tight">
          <div className="flex flex-row justify-between items-end">
            <h3 className="flex-grow font-semibold text-sm max-w-96">
              { processMdSubset(experience.title) }
            </h3>
            <span className="text-right text-mini">
              { experience.dates }
            </span>
          </div>
          <span className="relative -top-[5px] w-full text-mini">
            { processMdSubset(experience.subtitle) }
          </span>
          <ul className="-mt-1.5 ml-4 text-mini list-disc text-justify">
            {experience.bullets.map((bullet, j) => {
              if (bullet.shown) {
                return (
                  <li key={`bullet-${index}-${j}`}>
                    {processMdSubset(bullet.text)}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className={"w-[816px] h-[1056px] border-black "
        + (props.border ? 'border' : '')}>
        <button className="w-full" onClick={() => showPopup("header")}>
          <h1 className="mt-8 text-4.5xl text-center font-medium uppercase
          font-grotesk tracking-ultra">
            { props.name ? 
              props.name 
            : 
              <span className="font-light italic text-stone-400">
                No Name
              </span>
            }
          </h1>
          <h3 className="mb-4 text-center uppercase font-light
          tracking-widest">
            { props.tagline }
          </h3>
        </button>
        <div className="bg-stone-700 h-[1px] w-auto mx-24"/>
        <div className="flex flex-row w-full">
          <div className="w-[19rem] flex-shrink-0 flex flex-col">
            <div className="pl-[4.5rem] bg-stone-100 pb-1">
              { generateContactSection() }
              <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
              { generateEducationSection() }
              <hr className="mt-4 mb-3 mr-8 border-dashed border-t border-stone-600"/>
              { generateSkillsSection() }
            </div>
            { props.references.some(r => r.shown) &&
                <div className="pl-[3.5rem] bg-stone-100">
                  <hr className="mr-8 ml-4 border-dashed border-t border-stone-600"/>
                  { generateReferencesSection() }
                </div>
            }
            <div className="flex-grow bg-stone-100 min-h-4"/>
          </div>
          <div className="flex-grow pl-6 pr-20 pt-2 pb-2">
            {props.rightColumn.map((item, index) => {
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
  );
}

export default Resume;