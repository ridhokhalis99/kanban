const EmptyColumnScreen = () => {
  return (
    <div className="text-center mb-32">
      <h2 className="heading-l text-grey-82 mb-32">
        This board is empty. Create a new column to get started.
      </h2>
      <button className="add-button">+ Add New Column</button>
    </div>
  );
};

export default EmptyColumnScreen;
