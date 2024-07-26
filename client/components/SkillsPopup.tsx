"use client"
import { BoxSelect, ChevronDown, ChevronUp, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { FC, useState } from "react";
const uuid = require("uuid");

type props = {
  // undefined indicates the skill list is new
  skillList : skillList | undefined,
  updateSkillList : (newSkillList : skillList) => void,
  saveSkillList: (newSkillList : skillList) => void,
  onClose: () => void,
}

const SkillsPopup : FC<props> = (props) => {
  const [skillList, onUpdate] = (props.skillList == undefined
    ?
      useState<skillList>({ name: "New Skill List", items: [], shown: true})
    : [
      props.skillList,
      (newVer : skillList) => {
        if (!skillList.oldVer) {
          newVer.oldVer = structuredClone(skillList);
        }
        props.updateSkillList(newVer);
      }
    ]
  );
  const isNewSkill = props.skillList == undefined;

  const isItemChanged = (index : number) => {
    if (skillList.oldVer) {
      const item = skillList.items[index];
      const found = skillList.oldVer.items.find(cur => cur.id == item.id);
      if (!found || found.text !== item.text) {
        return true;
      }
    } else {
      return false;
    }
  }

  const isAnythingChanged = () => {
    let old : skillItem[];
    if (skillList.oldVer) {
      old = skillList.oldVer.items as skillItem[];
    } else {
      return false;
    }
    const current = skillList.items;
    for (let i = 0;i < current.length;i++) {
      const found = old.find(cur => cur.id == current[i].id);
      if (!found || found.text !== current[i].text) {
        return true;
      }
    }
    for (let i = 0;i < old.length;i++) {
      if (!current.find(cur => cur.id == old[i].id)) {
        return true;
      }
    }
    return false;
  }

  const onRevert = () => {
    if (isNewSkill) {
      props.onClose();
    } else {
      let newVer = structuredClone(skillList.oldVer);
      if (newVer) {
        onUpdate(newVer);
      }
    }
  }

  const onSave = () => {
    let newItem = structuredClone(skillList);
    delete newItem.oldVer;
    delete newItem.shown;
    props.saveSkillList(newItem);
    if (isNewSkill) {
      props.onClose();
    }
  }

  const addItem = () => {
    let newVer = structuredClone(skillList);
    newVer.items.push({ id: uuid.v4(), text: "New Skill", shown: true });
    onUpdate(newVer);
  }

  const removeItem = (index : number) => {
    let newVer = structuredClone(skillList);
    newVer.items = [
      ...newVer.items.slice(0, index),
      ...newVer.items.slice(index + 1)
    ]
    onUpdate(newVer);
  }

  const restoreItem = (item : skillItem) => {
    let newVer = structuredClone(skillList);
    newVer.items.push(item);
    onUpdate(newVer);
  }

  const editTitle = (value : string) => {
    if (isNewSkill) {
      let newVer = structuredClone(skillList);
      newVer.name = value;
      onUpdate(newVer);
    }
  }

  const checkItem = (index : number) => {
    let newVer = structuredClone(skillList);
    newVer.items[index].shown = true;
    onUpdate(newVer);
  }

  const uncheckItem = (index : number) => {
    let newVer = structuredClone(skillList);
    newVer.items[index].shown = false;
    onUpdate(newVer);
  }

  const changeItemText = (index : number, value : string) => {
    let newVer = structuredClone(skillList);
    newVer.items[index].text = value;
    onUpdate(newVer);
  }

  const swapItems = (index1 : number, index2 : number) => {
    const bound = skillList.items.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newVer = structuredClone(skillList);
    const temp = newVer.items[index1];
    newVer.items[index1] = newVer.items[index2];
    newVer.items[index2] = temp;
    onUpdate(newVer);
  }

  return (
    <div className="w-[360px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Edit List of Skills
        </h3>
        <button onClick={ props.onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-2 border-t border-stone-700"/>
      <div className="flex flex-col px-1 my-0.5">
        { isNewSkill ?
          <input
            className="text-lg font-semibold bg-transparent"
            value={skillList.name}
            onChange={ event => editTitle(event.target.value) }
          />
        :
          <h5 className="text-lg font-semibold">{skillList.name}</h5>
        } 
        { skillList.items.map((item, index) => {
          return (
            <div className="flex-grow my-0.5 flex items-center gap-x-1
            text-sm">
              { item.shown ?
                <button onClick={ () => uncheckItem(index) }>
                  <SquareCheckBig size={20}/>
                </button>
              :
                <button onClick={ () => checkItem(index) }>
                  <Square size={20}/>
                </button>
              }
              <input
                className={"bg-transparent w-full "
                + (isItemChanged(index) ? 'italic ' : ' ')
                + (item.shown ? '' : 'text-stone-500')}
                value={item.text}
                onChange={event => changeItemText(index, event.target.value)}
              />
              <button onClick={ () => swapItems(index, index - 1) }>
                <ChevronUp size={20}/>
              </button>
              <button onClick={ () => swapItems(index, index + 1) }>
                <ChevronDown size={20}/>
              </button>
              <button onClick={ () => removeItem(index) }>
                <X size={20} className="text-red-500"/>
              </button>
            </div>
          )
        })}
        { (skillList.oldVer ? skillList.oldVer.items : []).map(item => {
          if (!skillList.items.find(cur => cur.id == item.id)) {
            return (
              <div className="flex-grow my-0.5 flex items-center gap-x-1
              text-sm">
                <BoxSelect size={20}/>
                <span className="flex-grow italic line-through">
                  {item.text}
                </span>
                <button onClick={ () => restoreItem(item) }>
                  <Plus size={20}/>
                </button>
                <div className="w-5"/>
                <div className="w-5"/>
              </div>
            )
          }
        })}
        <button 
          className="flex-grow my-0.5 flex items-center text-sm gap-x-1
          text-stone-500"
          onClick={ addItem }
        >
          <Plus size={20}/>
          <p>Add Skill</p>
        </button>
      </div>
      <hr className="my-2 border-t border-stone-700"/>
      <div className="mt-2 flex justify-center">
        { (isAnythingChanged() || isNewSkill) ?
          <>
            <button 
              className="px-3 py-1.5 mr-4 rounded-md text-stone-200
            bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
              onClick={ onSave }
            >
              { isNewSkill ? "Save New Skills" : "Save Changes" }
            </button>
            <button 
              className="px-3 py-1.5 rounded-md text-stone-200
            bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
              onClick={ onRevert }
            >
              { isNewSkill ? "Cancel" : "Revert Changes" }
            </button>
          </>
        :
          <p className="py-1.5">No changes to save</p>
        }
      </div>
    </div>
  );
}

export default SkillsPopup