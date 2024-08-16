import { FC, useState } from "react";
import LeftSectionBuilder from "./LeftSectionBuilder";

type props = {
  show : boolean
  sections: leftColumnSection[],
  updateSections: (items : leftColumnSection[]) => void,
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
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [referencessOpen, setReferencesOpen] = useState(false);

  const setSectionBuilderOpenWrap = (b : boolean) => {
    if (b) {
      setContactsOpen(false);
      setSkillsOpen(false);
      setReferencesOpen(false);
    }
    setSectionsOpen(b);
  }
  
  const setContactsOpenWrap = (b : boolean) => {
    if (b) {
      setSectionsOpen(false);
      setSkillsOpen(false);
      setReferencesOpen(false);
    }
    setContactsOpen(b);
  }

  const setSkillsOpenWrap = (b : boolean) => {
    if (b) {
      setSectionsOpen(false);
      setContactsOpen(false);
      setReferencesOpen(false);
    }
    setSkillsOpen(b);
  }

  const setReferencesOpenWrap = (b : boolean) => {
    if (b) {
      setSectionsOpen(false);
      setContactsOpen(false);
      setSkillsOpen(false);
    }
    setReferencesOpen(b);
  }

  return (
    <div 
      className={"fixed top-32 flex flex-col gap-y-6 w-72 transition-all "
      + `duration-500 ${props.show ? '-left-5' : '-left-72'}`}
    >
      <LeftSectionBuilder
        open={sectionsOpen}
        setOpen={setSectionBuilderOpenWrap}
        allItems={props.sections}
        updateItems={props.updateSections}
        heading="Sections"
      />
      <LeftSectionBuilder
        open={contactsOpen}
        setOpen={setContactsOpenWrap}
        allItems={props.contacts}
        updateItems={props.updateContacts}
        onAddItem={props.onAddContact}
        heading="Contact"
        addText="New Contact Info"
        deleteText="Contact"
        deleteRoute="contacts"
      />
      <LeftSectionBuilder
        open={skillsOpen}
        setOpen={setSkillsOpenWrap}
        allItems={props.skills}
        updateItems={props.updateSkills}
        onAddItem={props.onAddSkill}
        heading="Skills"
        addText="New Skill List"
        deleteText="Skill List"
        deleteRoute="skillLists"
      />
      <LeftSectionBuilder
        open={referencessOpen}
        setOpen={setReferencesOpenWrap}
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