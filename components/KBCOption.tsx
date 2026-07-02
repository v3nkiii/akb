type KBCOptionProps = {
  letter: string;
  text: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function KBCOption({
  letter,
  text,
  selected = false,
  onClick,
}: KBCOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`kbc-option ${selected ? "selected" : ""}`}
    >
      <span className="kbc-option-letter">{letter}</span>

      <span className="kbc-option-text">
        {text}
      </span>
    </button>
  );
}