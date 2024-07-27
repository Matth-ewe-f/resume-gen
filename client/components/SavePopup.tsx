import { FC, useState } from "react";

type props = {
  onSave : (name : string) => void,
  onCancel : () => void,
};

const SavePopup : FC<props> = (props) => {
  const [name, setName] = useState("");

  return (
    <div className="fixed top-0 p-16 w-screen h-screen flex items-center
    justify-center bg-white bg-opacity-70">
      <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Save New Resume
        </h3>
        <hr className="mb-3 border-t border-stone-700"/>
        <div className="flex flex-col gap-y-2 [&_*]:px-1 [&_*]:py-0.5">
          <input placeholder="Name of Resume" value={name}
          onChange={e => setName(e.target.value)}/>
        </div>
        <div className="mt-2 flex justify-center">
          <button 
            className="px-3 py-1.5 mr-4 rounded-md text-stone-200
          bg-stone-800 hover:bg-stone-600"
            onClick={() => props.onSave(name) }
          >
            Save This Resume
          </button>
          <button 
            className="px-3 py-1.5 mr-4 rounded-md text-stone-200
          bg-stone-800 hover:bg-stone-600"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavePopup;