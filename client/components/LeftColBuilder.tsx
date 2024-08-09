import { FC } from "react";
import LeftSectionBuilder from "./LeftSectionBuilder";

type props = {
  show : boolean
  onEditEducation : () => void,
  contacts : contact[],
  updateContacts : (items : contact[]) => void,
  onAddContact : () => void,
  skills : skillList[],
  updateSkills : (items : skillList[]) => void,
  onAddSkill : () => void,
  references : reference[],
  updateReferences : (items : reference[]) => void,
  onAddReference : () => void,
}

const LeftColBuilder : FC<props> = (props) => {
  return (
    <div 
      className={"fixed top-32 flex flex-col gap-y-6 w-72 transition-all "
      + `duration-500 ${props.show ? '-left-5' : '-left-72'}`}
    >
      <LeftSectionBuilder
        allItems={props.contacts}
        updateItems={props.updateContacts}
        onAddItem={props.onAddContact}
        heading="Contact"
        addText="New Contact Info"
        deleteText="Contact"
        deleteRoute="contacts"
      />
      <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
      rounded-2xl shadow-lg">
        <button className="text-lg font-grotesk font-semibold uppercase
        tracking-ultra underline hover:text-stone-500"
        onClick={props.onEditEducation}>
          Edit Education
        </button>
      </div>
      <LeftSectionBuilder
        allItems={props.skills}
        updateItems={props.updateSkills}
        onAddItem={props.onAddSkill}
        heading="Skills"
        addText="New Skill List"
        deleteText="Skill List"
        deleteRoute="skillLists"
      />
      <LeftSectionBuilder
        allItems={props.references}
        updateItems={props.updateReferences}
        onAddItem={props.onAddReference}
        heading="References"
        addText="New Reference"
        deleteText="Reference"
        deleteRoute="references"
      />
    </div>
  );
}

export default LeftColBuilder;