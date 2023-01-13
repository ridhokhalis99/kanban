interface PrimaryButtonProps {
  text: string;
  onClick: Function;
}

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button className="button primary" onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default PrimaryButton;
