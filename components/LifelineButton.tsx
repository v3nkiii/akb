type LifelineButtonProps = {
  icon: string;
  label: string;
  used: boolean;
  onClick: () => void;
};

export default function LifelineButton({
  icon,
  label,
  used,
  onClick,
}: LifelineButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={used}
      className={`lifeline-button ${used ? "used" : ""}`}
    >
      <span className="lifeline-icon">
        {icon}
      </span>

      <span className="lifeline-label">
        {label}
      </span>
    </button>
  );
}