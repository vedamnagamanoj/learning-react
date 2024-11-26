import Card from "./Card";
// import CardClass from "./CardClass";
import users from "./data.json";

function App() {
  // return <Card user={user} />;
  return (
    <>
      {users.map((user) => (
        <Card user={user} key={user.phoneNumber} />
      ))}
    </>
  );
}

export default App;
