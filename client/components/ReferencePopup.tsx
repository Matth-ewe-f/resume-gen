import { X } from "lucide-react";
import { FC, useState } from "react";

type props = {
  onSubmit: (newReference : reference) => void,
  onClose: () => void,
}

const ReferencePopup : FC<props> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [contact1, setContact1] = useState("");
  const [contactIcon1, setContactIcon1] = useState("x");
  const [contact2, setContact2] = useState("");
  const [contactIcon2, setContactIcon2] = useState("x");

  const formatData : () => reference = () => {
    return {
      name: name.trim(),
      subtitle: subtitle.trim(),
      contact1: { text: contact1.trim(), icon: contactIcon1},
      contact2: { text: contact2.trim(), icon: contactIcon2},
    }
  }

  const canSubmit = () => {
    return (
      name != "" && subtitle != "" && contact1 != ""
      && contactIcon1 != "x" && contact2 != "" && contactIcon2 != "x"
    );
  }

  return (
    <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          New Reference
        </h3>
        <button onClick={ onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-3 border-t border-stone-700"/>
      <div className="flex flex-col gap-y-2">
        <input
          className="py-0.5 px-1"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="py-0.5 px-1"
          placeholder="Subtitle"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
        />
        <div className="flex-grow flex flex-row gap-x-2">
          <input
            className="flex-grow py-0.5 px-1"
            placeholder="Contact Method 1"
            value={contact1}
            onChange={e => setContact1(e.target.value)}
          />
          <select
            className={`min-w-32 ${contactIcon1 == "x" ? 'text-stone-400' : ''}`}
            value={contactIcon1}
            onChange={ e => setContactIcon1(e.target.value)}
          >
            <option disabled value="x">Choose Icon </option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="website">Website</option>
            <option value="linkedin">Linkedin</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="flex-grow flex flex-row gap-x-2">
          <input
            className="flex-grow py-0.5 px-1"
            placeholder="Contact Method 2"
            value={contact2}
            onChange={e => setContact2(e.target.value)}
          />
          <select
            className={`min-w-32 ${contactIcon2 == "x" ? 'text-stone-400' : ''}`}
            value={contactIcon2}
            onChange={ e => setContactIcon2(e.target.value)}
          >
            <option disabled value="x">Choose Icon </option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="website">Website</option>
            <option value="linkedin">Linkedin</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button 
          className="px-3 py-1.5 mr-4 rounded-md text-stone-200
        bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
          onClick={() => onSubmit(formatData()) }
          disabled={!canSubmit()}
        >
          Save New Reference
        </button>
      </div>
    </div>
  );
}

export default ReferencePopup;