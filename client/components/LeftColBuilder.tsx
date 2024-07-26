import { FC } from "react";
import ContactsBuilder from "./ContactsBuilder";
import SkillsBuilder from "./SkillsBuilder";

type props = {
  contacts : contact[],
  updateContacts : (items : contact[]) => void,
  onAddContact : () => void,
  skills : skillList[],
  updateSkills : (items : skillList[]) => void,
  onAddSkill : () => void,
}

const LeftColBuilder : FC<props> = (props) => {
  return <div className="fixed -left-5 top-12 flex flex-col gap-y-6 w-72">
    <ContactsBuilder
      allItems={props.contacts}
      updateItems={props.updateContacts}
      onAddContact={props.onAddContact}
    />
    <SkillsBuilder
      allItems={props.skills}
      updateItems={props.updateSkills}
      onAddItem={props.onAddSkill}
    />
  </div>
}

export default LeftColBuilder;