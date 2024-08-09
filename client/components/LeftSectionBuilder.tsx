import axios from "axios";
import { ChevronDown, ChevronUp, SquareCheckBig, Square, X, Plus } from "lucide-react";
import { useState } from "react";

type props<T extends leftColumnItem> = {
  allItems : T[],
  updateItems : (items : T[]) => void,
  onAddItem : () => void,
  heading: string,
  addText: string,
  deleteText: string,
  deleteRoute: string,
}

const LeftSectionBuilder = <T extends leftColumnItem,>(props : props<T>) => {
  const allItems = props.allItems;
  const updateItems = props.updateItems;
  const [open, setOpen] = useState(false);

  const capitalize = (s : string) => {
    return s.split(' ').map(
      word => word != "" ? word[0].toUpperCase() + word.slice(1) : ""
    ).join(' ');
  }

  const addItem = () => {
    props.onAddItem();
  }

  const deleteItem = (item : T) => {
    const msg = `This ${props.deleteText} info will be permanently deleted. Are you sure?`;
    if (window.confirm(msg)) {
      const url = `http://localhost:3300/${props.deleteRoute}/${item.name}`;
      axios.delete(url).then(response => {
        const deleted = response.data;
        let index = allItems.findIndex(cur => cur.name == deleted.name);
        updateItems([
          ...allItems.slice(0, index),
          ...allItems.slice(index + 1),
        ])
        alert(`${props.deleteText} successfully deleted`);
      }).catch((err) => {
        console.error(err);
        alert("There was an error; nothing was deleted");
      })
    }
  }

  const checkItem = (index : number) => {
    let newItems = allItems.slice();
    newItems[index].shown = true;
    updateItems(newItems);
  }

  const uncheckItem = (index : number) => {
    let newItems = allItems.slice();
    newItems[index].shown = false;
    updateItems(newItems);
  }

  const swapItems = (index1 : number, index2 : number) => {
    const bound = allItems.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newItems = allItems.slice();
    let temp = newItems[index1];
    newItems[index1] = newItems[index2];
    newItems[index2] = temp;
    updateItems(newItems);
  }

  return (
    <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
    rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          { props.heading }
        </h3>
        <button onClick={ () => setOpen(a => !a)}>
          { open ? <ChevronDown size={24}/> : <ChevronUp size={24}/> }
        </button>
      </div>
      <div className={"overflow-y-scroll transition-all duration-300 " +
      (open ? 'max-h-48' : 'max-h-0')}>
        { allItems.map((item, index) => {
          return (
            <div className="my-1 flex gap-x-2 items-center justify-between">
              <div className="flex gap-x-2">
                { item.shown ? 
                  <button onClick={ () => uncheckItem(index) }>
                    <SquareCheckBig size={16}/>
                  </button>
                :
                  <button onClick={ () => checkItem(index) }>
                    <Square size={16}/>
                  </button>
                }
                <span className={"min-w-20 max-w-32 truncate " + 
                (item.shown ? '' : 'text-stone-500')}>
                  {capitalize(item.name)}
                </span>
              </div>
              <div className="flex gap-x-2">
                <button onClick={() => swapItems(index, index - 1)}>
                  <ChevronUp size={16}/>
                </button>
                <button onClick={() => swapItems(index, index + 1)}>
                  <ChevronDown size={16}/>
                </button>
                <button onClick={() => deleteItem(item)}>
                  <X size={16} className="text-red-600"/>
                </button>
              </div>
            </div>
          )
        })}
        <button className="flex items-center gap-x-1" onClick={addItem}>
          <Plus size={16} className="text-stone-500 mr-1"/>
          <span className="text-stone-500">{props.addText}</span>
        </button>
      </div>
    </div>
  )
}

export default LeftSectionBuilder;