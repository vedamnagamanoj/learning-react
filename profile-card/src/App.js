import "./App.css";

const skills = [
  { name: "HTML+CSS", color: "red", emoji: "💣" },
  { name: "JavaScript", color: "green", emoji: "🔥" },
  { name: "WebDesign", color: "blue", emoji: "🔮" },
  { name: "Git & Github", color: "cyan", emoji: "🧨" },
  { name: "React", color: "magenta", emoji: "🎯" },
  { name: "Java", color: "yellow", emoji: "🪅" },
];

export default function App() {
  return (
    <div className="app">
      <MainImage />
      <MainInfo />
      <Skills />
    </div>
  );
}

function MainImage() {
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

function MainInfo() {
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

function Skills() {
  return (
    <div className="profile-skill">
      {skills.map((skill) => {
        return (
          <div className="skill-item" style={{ backgroundColor: skill.color }}>
            {skill.name} {skill.emoji}
          </div>
        );
      })}
    </div>
  );
}
