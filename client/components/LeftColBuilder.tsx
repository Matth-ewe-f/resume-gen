import { FC } from "react";
import ContactsBuilder from "./ContactsBuilder";
import SkillsBuilder from "./SkillsBuilder";

type props = {
  contacts : contact[],
  updateContacts : (items : contact[]) => void,
  onAddContact : () => void,
}

const LeftColBuilder : FC<props> = (props) => {
  return <div className="fixed -left-5 top-12 flex flex-col gap-y-6">
    <ContactsBuilder
      allItems={props.contacts}
      updateItems={props.updateContacts}
      onAddContact={props.onAddContact}
    />
    <SkillsBuilder/>
  </div>
}

export default LeftColBuilder;