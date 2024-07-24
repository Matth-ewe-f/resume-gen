import { BoxSelect, ChevronDown, ChevronUp, Plus, Square, SquareCheckBig, X } from "lucide-react";
import { FC } from "react";
import SmartTextArea from "./SmartTextArea";
const uuid = require("uuid");

type props = {
  experience: experience,
  savedVersion: experience,
  isNewItem: boolean,
  updateExperience: (e : experience) => void,
  revertChanges: () => void,
  saveChanges: (e : experience) => void,
  delete: () => void,
  onClose: () => void,
}

const ExperiencePopup : FC<props> = (props) => {
  const experience = props.experience;
  const savedVersion = props.savedVersion;
  const isNewItem = props.isNewItem;
  const updateExperience = props.updateExperience;

  const isTitleChanged = () => experience.title !== savedVersion.title;

  const areDateChanged = () => experience.dates !== savedVersion.dates;

  const isSubtitleChanged = () => {
    return experience.subtitle !== savedVersion.subtitle;
  }

  const isBulletChanged = (bulletIndex : number) => {
    const bullet = experience.bullets[bulletIndex];
    const savedBullet = savedVersion.bullets.find(b => b.id == bullet.id);
    return savedBullet == undefined || savedBullet.text !== bullet.text;
  }

  const isAnythingChanged = () => {
    if (isTitleChanged() || areDateChanged() || isSubtitleChanged()) {
      return true;
    }
    for (let i = 0;i < experience.bullets.length;i++) {
      if (isBulletChanged(i)) {
        return true;
      }
    }
    for (let i = 0;i < savedVersion.bullets.length;i++) {
      const id = savedVersion.bullets[i].id;
      if (experience.bullets.find(b => b.id == id) == undefined) {
        return true;
      }
    }
    return false;
  }

  const onClose = () => {
    props.onClose();
  }

  const onRevert = () => {
    props.revertChanges();
  }

  const onSave = () => {
    let newExperience = structuredClone(experience);
    newExperience.bullets.forEach(item => item.shown = true);
    props.saveChanges(newExperience);
    if (isNewItem) {
      onClose();
    }
  }

  const onTitleChange = (value : string) => {
    let newExperience = structuredClone(experience);
    newExperience.title = value;
    updateExperience(newExperience);
  }

  const onSubtitleChange = (value : string) => {
    let newExperience = structuredClone(experience);
    newExperience.subtitle = value;
    updateExperience(newExperience);
  }

  const onDateChange = (value : string) => {
    let newExperience = structuredClone(experience);
    newExperience.dates = value;
    updateExperience(newExperience);
  }

  const onBulletChange =
  (value: string, bulletIndex : number) => {
    let newExperience = structuredClone(experience);
    if (value[value.length - 1] == '\n') {
      let bullets = newExperience.bullets;
      const newBullet = { id : uuid.v4(), text: "" };
      bullets = [
        ...bullets.slice(0, bulletIndex + 1),
        newBullet,
        ...bullets.slice(bulletIndex + 1)
      ];
    } else {
      newExperience.bullets[bulletIndex].text = value;
    }
    updateExperience(newExperience);
  }

  const addNewBullet = () => {
    const newBullet = { id: uuid.v4(), text: "New Bullet", shown: true };
    let newExperience = structuredClone(experience);
    newExperience.bullets.push(newBullet);
    updateExperience(newExperience);
  }

  const showBullet = (index : number) => {
    let newExperience = structuredClone(experience);
    newExperience.bullets[index].shown = true;
    updateExperience(newExperience);
  }

  const hideBullet = (index : number) => {
    let newExperience = structuredClone(experience);
    newExperience.bullets[index].shown = false;
    updateExperience(newExperience);
  }

  const swapBullets = (index1 : number, index2 : number) => {
    if (index1 < 0 || index2 < 0 || index1 >= experience.bullets.length
    || index2 >= experience.bullets.length) {
      return;
    }
    let newExperience = structuredClone(experience);
    const temp = newExperience.bullets[index1];
    newExperience.bullets[index1] = newExperience.bullets[index2];
    newExperience.bullets[index2] = temp;
    updateExperience(newExperience);
  }

  const deleteBullet = (index : number) => {
    let newExperience = structuredClone(experience);
    newExperience.bullets = [
      ...newExperience.bullets.slice(0, index),
      ...newExperience.bullets.slice(index + 1)
    ];
    updateExperience(newExperience);
  }

  const restoreBullet = (bullet : bullet) => {
    let newExperience = structuredClone(experience);
    newExperience.bullets = [
      ...newExperience.bullets,
      bullet
    ];
    updateExperience(newExperience);
  }

  const longDate = experience.dates.length > 20;

  return (
    <div className="fixed top-0 p-16 w-screen h-screen flex items-center
    justify-center bg-white bg-opacity-70">
      <div className="w-[640px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-grotesk uppercase tracking-ultra">
            { isNewItem ? "Create New Item" : "Edit Item"}
          </h3>
          { isNewItem ? "" :
            <button onClick={ onClose }>
              <X size={32} className="hover:text-stone-400"/>
            </button>
          }
        </div>
        <hr className="mb-3 border-t border-stone-700"/>
        <div className="leading-tight [&_*]:bg-transparent">
          <div className="flex flex-row justify-between items-end">
            <input
              className={"flex-grow font-semibold text-lg max-w-96 " +
              `${isTitleChanged() && !isNewItem? 'italic' : ''}`}
              value={experience.title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
            <input
              className={"pb-0.5 text-right text-sm " +
              `${longDate ? 'w-52' : 'w-40'} ` +
              `${areDateChanged() && !isNewItem ? 'italic' : ''}`}
              value={experience.dates}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
          <input
            className={"relative -top-[5px] w-full text-sm " +
            `${isSubtitleChanged() && !isNewItem ? 'italic' : ''}`}
            value={experience.subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
          />
          <ul className="-mt-1 ml-2 text-sm list-none text-justify">
            { experience.bullets.map((bullet, i) => {
              return (
                <li
                  className={"my-1 flex flex-row gap-x-1 items-start " + 
                  `${isBulletChanged(i) && !isNewItem ?
                  'italic' : ''}`}
                  key={`bullet-focused-enabled-${i}`}
                >
                  <button className="h-fit w-5" 
                  onClick={ bullet.shown
                    ? () => hideBullet(i) 
                    : () => showBullet(i)}
                  >
                    { bullet.shown ?
                      <SquareCheckBig size={20} className="pt-0.25"/>
                    :
                      <Square size={20} className="pt-0.25"/>
                    }
                  </button>
                  <div className="mx-1 flex-grow min-h-5 flex items-center">
                    <SmartTextArea
                      className={"w-full resize-none font-style-inherit "
                      + "text-justify "
                      + `${bullet.shown ? '' : 'text-stone-400'}`}
                      text={bullet.text}
                      onChange={(e) => onBulletChange(e.target.value, i)}
                    />
                  </div>
                  <button className="h-fit w-5"
                  onClick={ () => swapBullets(i, i - 1) }>
                    <ChevronUp size={20}/>
                  </button>
                  <button className="h-fit w-5"
                  onClick={ () => swapBullets(i, i + 1) }>
                    <ChevronDown size={20}/>
                  </button>
                  <button className="h-fit w-5 text-red-500"
                  onClick={ () => deleteBullet(i) }>
                    <X size={20}/>
                  </button>
                </li>
              )
            })}
          </ul>
          <ul className="ml-2 text-sm list-none text-justify">
            { [...savedVersion.bullets].map((bullet, i) => {
              if (!experience.bullets.find(b => b.id == bullet.id)) {
                return (
                  <li 
                    className="my-1 flex flex-row
                    gap-x-1 min-h-5"
                    key={`bullet-focused-disabled-${i}`}
                  >
                    <BoxSelect size={20} className="pt-0.25"/>
                    <div className="mx-1 flex-grow min-h-5 flex items-center">
                      <SmartTextArea
                        className="w-full resize-none line-through italic"
                        text={bullet.text}
                        disabled={true}
                      />
                    </div>
                    <button onClick={() => restoreBullet(bullet)}>
                      <Plus size={20}/>
                    </button>
                    <div className="w-5"/>
                    <div className="w-5"/>
                  </li>
                )
              }
            })}
          </ul>
          <button className="ml-2 mt-2 flex gap-x-2 items-center"
          onClick={ addNewBullet }>
            <Plus size={20}/>
            <span className="pt-0.5 text-sm">Add Bullet Point</span>
          </button>
        </div>
        <hr className="mt-4 mb-2 border-t border-stone-600"/>
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-end
        justify-between">
          { isAnythingChanged() ? 
            <div>
              <button
                className="px-3 py-1.5 mr-4 rounded-md text-stone-200
                bg-stone-800 hover:bg-stone-600"
                onClick={onSave}
              >
                { isNewItem ? "Save New Item" : "Save Changes"}
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-stone-200
                bg-stone-800 hover:bg-stone-600"
                onClick={onRevert}
              >
                { isNewItem ? "Cancel New Item" : "Revert Changes" }
              </button>
            </div>
          :
            <p>No new changes to save</p>
          }
          { isNewItem ? '' :
            <button
              className="px-3 py-1.5 rounded-md text-stone-200
              bg-red-600 hover:bg-red-400"
              onClick={props.delete}
            >
              Delete Item
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default ExperiencePopup;