import axios from "axios";
import { ChevronDown, ChevronUp, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { FC, useState } from "react";

type props = {
  allItems : skillList[],
  updateItems : (skills : skillList[]) => void,
  onAddItem : () => void,
}

const SkillsBuilder : FC<props> = (props) => {
  const allItems = props.allItems;
  const updateItems = props.updateItems
  const [open, setOpen] = useState(false);

  const checkSkillList = (index : number) => {
    let newItems = allItems.slice();
    newItems[index].shown = true;
    updateItems(newItems);
  }

  const uncheckSkillList = (index : number) => {
    let newItems = allItems.slice();
    newItems[index].shown = false;
    updateItems(newItems);
  }

  const swapSkillLists = (index1 : number, index2 : number) => {
    const bound = allItems.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newAllContacts = allItems.slice();
    let temp = newAllContacts[index1];
    newAllContacts[index1] = newAllContacts[index2];
    newAllContacts[index2] = temp;
    updateItems(newAllContacts);
  }

  const deleteSkillList = (skillList : skillList) => {
    const msg = "This list of skills will be permanently deleted. Are you sure?";
    if (window.confirm(msg)) {
      const url = `http://localhost:3300/skillLists/${skillList.name}`;
      axios.delete(url).then(response => {
        const deleted = response.data;
        let index = allItems.findIndex(cur => cur.name == deleted.name);
        updateItems([
          ...allItems.slice(0, index),
          ...allItems.slice(index + 1),
        ])
        alert("Skills successfully deleted");
      }).catch((err) => {
        console.error(err);
        alert("There was an error; no skills were deleted");
      })
    }
  }

  return (
    <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
    rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          Skills
        </h3>
        <button onClick={ () => { setOpen(a => !a) } }>
          { open ? <ChevronDown size={24}/> : <ChevronUp size={24}/> }
        </button>
      </div>
      { open ?
        <>
          { allItems.map((item, index) => {
            return (
              <div className="my-1 flex gap-x-2 items-center justify-between">
                <div className="flex gap-x-2">
                  { item.shown ? 
                    <button onClick={ () => uncheckSkillList(index) }>
                      <SquareCheckBig size={16}/>
                    </button>
                  :
                    <button onClick={ () => checkSkillList(index) }>
                      <Square size={16}/>
                    </button>
                  }
                  <p className={"min-w-20 max-w-32 truncate " + 
                  (item.shown ? '' : 'text-stone-500')}>
                    {item.name}
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <button onClick={ () => swapSkillLists(index, index - 1)}>
                    <ChevronUp size={16}/>
                  </button>
                  <button onClick={ () => swapSkillLists(index, index + 1)}>
                    <ChevronDown size={16}/>
                  </button>
                  <button onClick={ () => deleteSkillList(item) }>
                    <X size={16} className="text-red-600"/>
                  </button>
                </div>
              </div>
            )
          })}
          <button className="flex items-center gap-x-1"
          onClick={props.onAddItem}>
            <Plus size={16} className="text-stone-500 mr-1"/>
            <span className="text-stone-500">Add Skill Heading</span>
          </button>
        </>
      :
        ''
      }
    </div>
  )
}

export default SkillsBuilder;