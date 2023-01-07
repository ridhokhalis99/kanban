interface SecondaryButtonProps {
  text: string;
  onClick: Function;
}

const SecondaryButton = ({ text, onClick }: SecondaryButtonProps) => {
  return (
    <button
      style={{
        width: "100%",
        textAlign: "center",
        fontSize: "13px",
        color: "#635FC7",
        backgroundColor: "#635FC71A",
        padding: "14px 0",
        borderRadius: "20px",
      }}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
