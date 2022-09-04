import { useState } from "react";

export default function EditableText({ placeholder }) {
  const [isEditable, setEditState] = useState(false);
  const [text, setText] = useState("");

  return (
    <div>
      {isEditable ?
        <p onDoubleClick={() => setEditState(true)}>{text || placeholder}</p> :
        <textarea onMouseLeave={() => setEditState(false)} placeholder={placeholder} onChange={(e) => setText(e.target.value)}></textarea>}
    </div>
  );
}
