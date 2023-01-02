const Taskboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#F4F7FD",
        width: "100%",
        height: "calc(100vh - 96px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2
          className="heading-l"
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
    </div>
  );
};

export default Taskboard;
