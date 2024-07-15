"use client"

import { ChangeEventHandler, FC, KeyboardEventHandler, useLayoutEffect, useRef } from "react"

type props = {
  text: string,
  className: string,
  onChange?: ChangeEventHandler<HTMLTextAreaElement>,
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>,
  disabled?: boolean,
}

const SmartTextArea : FC<props> = (props) => {
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
  }, [props.text]);

  return <>
    <textarea
      ref={textareaRef}
      className={`${props.className}`}
      value={props.text}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown || undefined}
      disabled={props.disabled}
    />
  </>;
}

export default SmartTextArea;