import axios from "axios";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";

type props = {
  onSelect: (resume : resume) => void,
  onCancel: () => void,
}

const LoadPopup : FC<props> = (props) => {
  const [resumes, setResumes] = useState<resume[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3300/resumes/").then(response => {
      const sorted = response.data.resumes.sort((a : resume, b : resume) => {
        return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
      })
      setResumes(sorted);
    }).catch(err => {
      alert("There was an error loading resumes");
      console.log(err);
      props.onCancel();
    })
  }, [])

  const deleteResume = (id : string) => {
    const msg = "This resume will be permanently deleted. Are you sure?";
    if (window.confirm(msg)) {
      const url = `http://localhost:3300/resumes/${id}`;
      axios.delete(url).then(response => {
        const deleted = response.data;
        setResumes(resumes.filter(cur => cur.id != deleted.id));
        alert("The resume was deleted");
      }).catch((err) => {
        console.error(err);
        alert("There was an error; nothing was deleted");
      })
    }
  }

  return (
    <div className="fixed top-0 p-16 w-screen h-screen flex items-center
    justify-center bg-white bg-opacity-70">
      <div className="w-[560px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
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
                <div
                  className="flex-grow flex px-1 py-1 text-left border-b
                  last:border-none border-stone-700 hover:bg-stone-400"
                >
                  <button className="flex-grow flex flex-row gap-x-1"
                  onClick={() => props.onSelect(resume)}>
                    <p>{resume.name}</p>
                    <p className="text-ssm italic">
                      ({new Date(resume.dateSaved).toLocaleDateString()})
                    </p>
                  </button>
                  <button className="group"
                  onClick={() => deleteResume(resume.id)}>
                    <X className="text-red-600 group-hover:text-red-300"
                    size={24}/>
                  </button>
                </div>
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