import axios from "axios";
import { ChevronDown, ChevronUp, SquareCheckBig, Square, X, Plus } from "lucide-react";
import { FC, useState } from "react";

type props = {
  allItems : contact[],
  updateItems : (items : contact[]) => void,
  onAddContact : () => void,
}

const ContactsBuilder : FC<props> = (props) => {
  const allItems = props.allItems;
  const updateItems = props.updateItems;
  const [open, setOpen] = useState(false);

  const capitalize = (s : string) => {
    return s.split(' ').map(
      word => word[0].toUpperCase() + word.slice(1)
    ).join(' ');
  }

  const addContact = () => {
    props.onAddContact();
  }

  const deleteContact = (contact : contact) => {
    const msg = "This line of contact info will be permanently deleted. Are you sure?";
    if (window.confirm(msg)) {
      const url = `http://localhost:3300/contacts/${contact.name}`;
      axios.delete(url).then(response => {
        const deleted = response.data;
        let index = allItems.findIndex(cur => cur.name == deleted.name);
        updateItems([
          ...allItems.slice(0, index),
          ...allItems.slice(index + 1),
        ])
        alert("Contact info successfully deleted");
      }).catch((err) => {
        console.error(err);
        alert("There was an error; no contact info was deleted");
      })
    }
  }

  const checkContact = (index : number) => {
    let newContacts = allItems.slice();
    newContacts[index].shown = true;
    updateItems(newContacts);
  }

  const uncheckContact = (index : number) => {
    let newContacts = allItems.slice();
    newContacts[index].shown = false;
    updateItems(newContacts);
  }

  const swapContacts = (index1 : number, index2 : number) => {
    const bound = allItems.length;
    if (index1 < 0 || index2 < 0 || index1 >= bound || index2 >= bound) {
      return;
    }
    let newAllContacts = allItems.slice();
    let temp = newAllContacts[index1];
    newAllContacts[index1] = newAllContacts[index2];
    newAllContacts[index2] = temp;
    updateItems(newAllContacts);
  }

  return (
    <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
    rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          Contact
        </h3>
        <button onClick={ () => setOpen(a => !a)}>
          { open ? <ChevronDown size={24}/> : <ChevronUp size={24}/> }
        </button>
      </div>
      { open ? 
        <>
          { allItems.map((contact, index) => {
            return (
              <div className="my-1 flex gap-x-2 items-center justify-between">
                <div className="flex gap-x-2">
                  { contact.shown ? 
                    <button onClick={ () => uncheckContact(index) }>
                      <SquareCheckBig size={16}/>
                    </button>
                  :
                    <button onClick={ () => checkContact(index) }>
                      <Square size={16}/>
                    </button>
                  }
                  <span className={"inline-block min-w-20 " + 
                  (contact.shown ? '' : 'text-stone-500')}>
                    {capitalize(contact.name)}
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <button onClick={() => swapContacts(index, index - 1)}>
                    <ChevronUp size={16}/>
                  </button>
                  <button onClick={() => swapContacts(index, index + 1)}>
                    <ChevronDown size={16}/>
                  </button>
                  <button onClick={() => deleteContact(contact)}>
                    <X size={16} className="text-red-600"/>
                  </button>
                </div>
              </div>
            )
          })}
          <button className="flex items-center gap-x-1" onClick={addContact}>
            <Plus size={16} className="text-stone-500 mr-1"/>
            <span className="text-stone-500">Add Contact Field</span>
          </button>
        </>
      :
        ''
      }
    </div>
  )
}

export default ContactsBuilder;