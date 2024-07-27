import { ChevronDown, ChevronUp, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { FC } from "react";
const uuid = require("uuid");

type props = {
  allItems : rightColumnItem[],
  updateItems : (newItems : rightColumnItem[]) => void,
  onAddExperience : () => void,
}

const RightColBuilder : FC<props> = (props) => {
  const allItems = props.allItems;
  const updateItems = props.updateItems;

  const getNumShownRightItems = () => {
    let count = 0;
    let condition = true;
    while (condition) {
      const cur = allItems[count];
      condition = allItems.length > count;
      condition = condition && (cur.shown == true || cur.isHeading == true);
      count++;
    }
    return count - 1;
  }

  const checkRightColumnItem = (index : number) => {
    let newColumn = allItems.slice();
    let newIndex = getNumShownRightItems();
    newColumn[index].shown = true;
    newColumn = [
      ...newColumn.slice(0, newIndex),
      newColumn[index],
      ...newColumn.slice(newIndex, index),
      ...newColumn.slice(index + 1)
    ]
    updateItems(newColumn);
  }

  const uncheckRightColumnItem = (index : number) => {
    let newColumn = allItems.slice();
    let newIndex = getNumShownRightItems();
    newColumn[index].shown = false;
    newColumn = [
      ...newColumn.slice(0, index),
      ...newColumn.slice(index + 1, newIndex),
      newColumn[index],
      ...newColumn.slice(newIndex)
    ]
    updateItems(newColumn);
  }

  const removeRightColumnItem = (index : number) => {
    let newColumn = allItems.slice();
    newColumn = [
      ...newColumn.slice(0, index),
      ...newColumn.slice(index + 1)
    ];
    updateItems(newColumn);
  }

  const switchRightColumnItems =
  (index1 : number, index2 : number) => {
    const bound = allItems.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newColumn = allItems.slice();
    const temp = newColumn[index1];
    newColumn[index1] = newColumn[index2];
    newColumn[index2] = temp;
    updateItems(newColumn);
  }

  const generateVisibleRightBuilderItem =
  (item : rightColumnItem, indexInVisible : number) => {

    const onHeadingChange = (value : string) => {
      let newColumn = allItems.slice();
      (newColumn[indexInVisible] as heading).text = value;
      updateItems(newColumn);
    }

    const ChevronUpClick = () => { 
      switchRightColumnItems(indexInVisible, indexInVisible - 1)
    };

    const ChevronDownClick = () => {
      switchRightColumnItems(indexInVisible, indexInVisible + 1)
    };
    
    if (item.isHeading) {
      return (
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button onClick={() => removeRightColumnItem(indexInVisible)}>
              <X size={16}/>
            </button>
            <input 
              className="max-w-40 bg-transparent font-grotesk uppercase
              tracking-widest line-clamp-1 text-ellipsis"
              value={ (item as heading).text }
              onChange={(e) => onHeadingChange(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button onClick={ ChevronUpClick }>
              <ChevronUp size={20}/>
            </button>
            <button onClick={ ChevronDownClick }>
              <ChevronDown size={20}/>
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button onClick={() => uncheckRightColumnItem(indexInVisible)}>
              <SquareCheckBig size={16}/>
            </button>
            <h5 className="max-w-48 truncate">
              { (item as experience).subtitle }
            </h5>
          </div>
          <div className="flex items-center">
            <button onClick={ ChevronUpClick }>
              <ChevronUp size={20}/>
            </button>
            <button onClick={ ChevronDownClick }>
              <ChevronDown size={20}/>
            </button>
          </div>
        </div>
      );
    }
  }

  const generateUncheckedRightBuilderItem = 
  (item : experience, index : number) => {
    return (
      <div key={`right-col-builder-unchecked-${index}`}
      className="flex my-1 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <button onClick={() => checkRightColumnItem(index)}>
            <Square size={16}/>
          </button>
          <h5 className="max-w-48 truncate">
            {item.subtitle}
          </h5>
        </div>
        <div className="min-w-10"/>
      </div>
    );
  }

  const addHeading = () => {
    const index = getNumShownRightItems();
    updateItems([
      ...allItems.slice(0, index),
      { text: "New Heading", isHeading: true },
      ...allItems.slice(index)
    ]);
  }

  const addExperience = () => {
    let newExperience : experience = {
      id: uuid.v4(),
      title: "New Item",
      dates: "XXX - Present",
      subtitle: "Job Title",
      bullets: [],
      shown: true,
    }
    let newColumn = [newExperience, ...allItems];
    updateItems(newColumn);
    props.onAddExperience();
  }

  return (
    <div className="fixed -right-5 top-12 px-6 py-4 bg-stone-300 rounded-2xl
    shadow-lg">
      <h3 className="mb-2 text-lg font-grotesk font-semibold uppercase
      tracking-ultra">
        Shown
      </h3>
      { allItems.map((element, index) => {
        if (element.shown || element.isHeading) {
          return <div key={`right-col-builder-checked-${index}`}>
            { generateVisibleRightBuilderItem(element, index) }
          </div>
        }
      })}
      <button className="my-1.5 flex items-center gap-x-1 text-stone-500"
      onClick={addHeading}>
        <Plus size={16} className="mr-1"/>Add Heading
      </button>
      <button className="my-1.5 flex items-center gap-x-1 text-stone-500"
      onClick={addExperience}>
        <Plus size={16} className="mr-1"/>Create New Item
      </button>
      <h3 className="my-2 text-lg font-grotesk font-semibold uppercase
      tracking-ultra">
        Hidden
      </h3>
      { allItems.map((element, index) => {
        if (!element.shown && !element.isHeading) {
          let exp = element as experience;
          return generateUncheckedRightBuilderItem(exp, index);
        }
      })}
    </div>
  )
}

export default RightColBuilder;