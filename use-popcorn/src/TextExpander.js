import { useState } from "react";
import PropType from "prop-types";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        collapseText="Show text"
        expandText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

TextExpander.PropType = {
  expanded: PropType.bool,
  className: PropType.string,
  buttonColor: PropType.string,
  collapsedNumWords: PropType.number,
  collapseText: PropType.string,
  expandText: PropType.string,
  children: PropType.string,
};

function TextExpander({
  expanded = false,
  className = "",
  buttonColor = "blue",
  collapsedNumWords = 10,
  collapseText = "Show more",
  expandText = "Hide",
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const showMoreStyles = {
    border: "none",
    backgroundColor: "inherit",
    color: buttonColor,
    cursor: "pointer",
    padding: "0 5px",
  };

  function handleIsExpand() {
    setIsExpanded((currIsExpanded) => !currIsExpanded);
  }
  return (
    <div className={className}>
      {isExpanded
        ? children
        : `${children.split(" ").slice(0, collapsedNumWords).join(" ")}...`}

      <button style={showMoreStyles} onClick={handleIsExpand}>
        {isExpanded ? expandText : collapseText}
      </button>
    </div>
  );
}
