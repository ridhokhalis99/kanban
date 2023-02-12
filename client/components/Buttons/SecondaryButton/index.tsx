interface SecondaryButtonProps {
  text: string;
  onClick: Function;
}

const SecondaryButton = ({ text, onClick }: SecondaryButtonProps) => {
  return (
    <button className="button secondary" onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default SecondaryButton;
