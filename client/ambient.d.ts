type experience = {
  id: number,
  title: string,
  dates: string,
  subtitle: string,
  bullets: string[],
}

type heading = {
  text: string,
}

type rightColumnItem = (experience | heading) & { isHeading?: boolean };
