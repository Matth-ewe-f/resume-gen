import { X } from "lucide-react";
import { FC, useState } from "react";

type props = {
  oldName: string,
  oldTagline: string,
  onClose: () => void,
  onSubmit: (name : string, tagline: string) => void,
  onOverwrite: (name : string, tagline: string) => void,
};

const HeaderPopup : FC<props> = (props) => {
  const [name, setName] = useState(props.oldName);
  const [tagline, setTagline] = useState(props.oldTagline);

  return (
    <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Edit Header
        </h3>
        <button onClick={ props.onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-3 border-t border-stone-700"/>
      <div className="w-full flex flex-col gap-y-2">
        <input 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={tagline}
          onChange={e => setTagline(e.target.value)}
          placeholder="Tagline"
        />
      </div>
      <div className="mt-2 flex justify-center">
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => props.onSubmit(name, tagline) }
        >
          Save Changes
        </button>
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => props.onOverwrite(name, tagline) }
        >
          Overwrite Default
        </button>
      </div>
    </div>
  );
}

export default HeaderPopup;