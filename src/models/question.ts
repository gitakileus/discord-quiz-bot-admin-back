const question = (mongoose: any) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      embededImage: {
        type: String,
      },
      answers: {
        type: Array,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  const collection = mongoose.model("questions", schema);
  return collection;
};

export default question;
