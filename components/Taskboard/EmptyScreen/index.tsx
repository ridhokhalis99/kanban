const EmptyScreen = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2
        className="heading-l text-grey-82"
        style={{
          marginBottom: 32,
        }}
      >
        This board is empty. Create a new column to get started.
      </h2>
      <button
        style={{
          backgroundColor: "#635FC7",
          borderRadius: 24,
          padding: "18px 24px",
          color: "white",
        }}
      >
        + Add New Column
      </button>
    </div>
  );
};

export default EmptyScreen;
