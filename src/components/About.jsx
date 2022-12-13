export default function About({ text }) {
  return (
    <div>
      {text ? (
        <p>{text}</p>
      ) : (
        <p>Cet utilisateur n'a pas complété cette section. (le petit filou)</p>
      )}
    </div>
  );
}
