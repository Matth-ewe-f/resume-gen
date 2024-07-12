"use client"

import { ChangeEventHandler, FC, KeyboardEventHandler, useLayoutEffect, useRef } from "react"

type props = {
  text: string,
  className: string,
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>,
}

const SmartTextArea : FC<props> = ({text, className, onChange, onKeyDown}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef == null) {
      return;
    }
    const cur = textareaRef.current;
    // @ts-ignore
    cur.style.height = "0px";
    // @ts-ignore
    cur.style.height = `${Math.max(cur.scrollHeight, 8)}px`;
  }, [text]);

  return <>
    <textarea
      ref={textareaRef}
      className={`${className}`}
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown || undefined}
    />
  </>;
}

export default SmartTextArea;