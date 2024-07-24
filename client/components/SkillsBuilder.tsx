import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, useState } from "react";

type props = {}

const SkillsBuilder : FC<props> = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
    rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          Skills
        </h3>
        <button onClick={ () => setOpen(a => !a)}>
          { open ? <ChevronDown size={24}/> : <ChevronUp size={24}/> }
        </button>
      </div>
      { open ? "Open" : '' }
    </div>
  )
}

export default SkillsBuilder;