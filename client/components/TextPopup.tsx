import { X } from "lucide-react";
import { FC, useState } from "react";
import SmartTextArea from "./SmartTextArea";

type props = {
  name: string,
  oldText: string,
  onClose: () => void,
  onSubmit: (newText : string) => void,
  onOverwrite: (newText : string) => void, 
};

const TextPopup : FC<props> = (props) => {
  const [text, setText] = useState(props.oldText);

  return (
    <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Edit {props.name}
        </h3>
        <button onClick={ props.onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-3 border-t border-stone-700"/>
      <SmartTextArea
        className="w-full px-1 py-0.5 text-sm resize-none"
        text={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="mt-2 flex justify-center">
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => props.onSubmit(text) }
        >
          Save Changes
        </button>
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => props.onOverwrite(text) }
        >
          Overwrite Default
        </button>
      </div>
    </div>
  );
}

export default TextPopup;