import "./App.css";

const skills = [
  { name: "HTML+CSS", color: "red", level: "intermediate" },
  {
    name: "JavaScript",
    color: "lightgreen",
    level: "advanced",
  },
  {
    name: "WebDesign",
    color: "lightblue",
    level: "beginner",
  },
  {
    name: "Git & Github",
    color: "yellow",
    level: "intermediate",
  },
  { name: "React", color: "cyan", level: "intermediate" },
  { name: "Java", color: "pink", level: "advanced" },
];

const emojis = Object.freeze({
  beginner: "👶",
  intermediate: "💪",
  advanced: "💥",
});

export default function App() {
  return (
    <div className="app">
      <Avatar />
      <Intro />
      <SkillList />
    </div>
  );
}

function Avatar() {
  return (
    <div className="profile-img">
      <img
        className="main-img"
        src="https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Mountains"
      ></img>
    </div>
  );
}

function Intro() {
  return (
    <div className="profile-info">
      <h3>Steven Shankar</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
}

// function Skills() {
//   return (
//     <div className="profile-skill">
//       {skills.map((skill) => {
//         return (
//           <div className="skill-item" style={{ backgroundColor: skill.color }}>
//             {skill.name} {skill.emoji}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

function SkillList() {
  return (
    <div className="profile-skill">
      {skills.map((skill) => (
        <Skill skill={skill} />
      ))}
    </div>
  );
}

function Skill({ skill }) {
  return (
    <span className="skill-item" style={{ backgroundColor: skill.color }}>
      {skill.name} {emojis[skill.level]}
    </span>
  );
}
