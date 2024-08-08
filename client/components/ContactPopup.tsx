"use client"

import { X } from "lucide-react";
import { FC, useState } from "react";

type props = {
  onSubmit : (contact : contact) => void,
  onClose : () => void
}

const ContactPopup : FC<props> = ({onSubmit, onClose}) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [link, setLink] = useState("");

  const formatData = () => {
    let result : contact = {
      name: name.trim(),
      value: value,
    }
    if (link.length > 0) {
      result.link = link;
    }
    return result;
  }

  return (
    <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          New Contact Field
        </h3>
        <button onClick={ onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-3 border-t border-stone-700"/>
      <div className="flex flex-col gap-y-2 [&_*]:px-1 [&_*]:py-0.5">
        <input placeholder="Type of contact" value={name}
        onChange={e => setName(e.target.value)}/>
        <input placeholder="Text shown on resume" value={value}
        onChange={e => setValue(e.target.value)}/>
        <input placeholder="Link (if there is one)" value={link}
        onChange={e => setLink(e.target.value)}/>
      </div>
      <div className="mt-2 flex justify-center">
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => onSubmit(formatData()) }
          disabled={name.length == 0 || value.length == 0}
        >
          Save New Contact
        </button>
      </div>
    </div>
  );
}

export default ContactPopup