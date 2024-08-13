type resume = {
  id: string,
  name: name,
  rightColumn: rightColumnItem[],
  contacts: contact[],
  education: string,
  skillLists: skillList[],
  references: reference[],
  dateSaved: string,
}

type experience = {
  id: string,
  title: string,
  dates: string,
  subtitle: string,
  bullets: bullet[],
  shown?: boolean,
  oldVer?: experience,
}

type bullet = {
  id: string,
  text: string,
  shown?: boolean,
}

type heading = {
  text: string,
  shown?: boolean,
}

type rightColumnItem = (experience | heading) & { isHeading?: boolean };

type leftColumnItem = {
  name: string,
  shown?: boolean,
}

type contact = {
  name: string,
  value: string,
  link?: string,
  shown?: boolean,
}

type skillList = {
  name: string,
  items: skillItem[],
  shown?: boolean,
  oldVer?: skillList,
}

type skillItem = {
  id: string,
  text: string,
  shown?: boolean,
}

type reference = {
  name: string,
  subtitle: string,
  contact1: referenceContact,
  contact2: referenceContact,
  shown?: boolean,
}

type referenceContact = {
  text: string,
  icon: string,
}