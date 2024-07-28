import axios from "axios";
import { FC, useEffect, useState } from "react";

type props = {
  onSelect: (resume : resume) => void,
  onCancel: () => void,
}

const LoadPopup : FC<props> = (props) => {
  const [resumes, setResumes] = useState<resume[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3300/resumes/").then(response => {
      setResumes(response.data.resumes);
    }).catch(err => {
      alert("There was an error loading resumes");
      console.log(err);
      props.onCancel();
    })
  }, [])

  return (
    <div className="fixed top-0 p-16 w-screen h-screen flex items-center
    justify-center bg-white bg-opacity-70">
      <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Load Resume
        </h3>
        <hr className="border-t border-stone-700"/>
        <div className="max-h-40 overflow-y-scroll flex flex-col">
          { resumes.length == 0 ?
            <div className="flex justify-center">
              <p className="py-3 text-lg">Loading...</p>
            </div>
          :
            resumes.map(resume => {
              return (
                <button
                  className="flex-grow flex justify-between px-1 py-1 text-left
                  border-b last:border-none border-stone-700 hover:bg-stone-400"
                  onClick={() => props.onSelect(resume)}
                >
                  <p>{resume.name}</p>
                  <p className="text-sm italic">
                    Saved on {new Date(resume.dateSaved).toLocaleDateString()}
                  </p>
                </button>
              )
            })
          }
        </div>
        <hr className="border-t border-stone-700"/>
        <div className="mt-2 flex justify-center">
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

export default LoadPopup;