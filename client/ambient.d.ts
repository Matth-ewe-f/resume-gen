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

type contact = {
  name: string,
  value: string,
  link?: string,
  shown?: boolean,
}