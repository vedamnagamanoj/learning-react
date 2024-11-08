export default function Stats({ items }) {
  const numItems = items.length;
  if (!numItems)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numPackedItems = items.reduce(
    (result, currItem) => (currItem.packed ? ++result : result),
    0
  );
  const packedPercentage = (numPackedItems / numItems) * 100;

  return (
    <footer className="stats">
      <em>
        {packedPercentage !== 100
          ? `🧳 You have ${numItems} items on your list, and you already packed ${numPackedItems} (${Math.trunc(
              packedPercentage
            )}%)`
          : `You got everything! Ready to go ✈️🌍`}
      </em>
    </footer>
  );
}
