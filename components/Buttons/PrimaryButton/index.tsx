interface PrimaryButtonProps {
  text: string;
  onClick: Function;
}

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button
      style={{
        width: "100%",
        textAlign: "center",
        fontSize: "13px",
        color: "#ffffff",
        backgroundColor: "#635FC7",
        padding: "14px 0",
        borderRadius: "20px",
      }}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
