import mongoose, { Schema, Document ,ConnectOptions} from 'mongoose';

const ConnectDB = () => {

    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://TalalBhatti:SudoForLearning@cluster0.fhsyt7o.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }as ConnectOptions)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err:String) => {
    console.log(err);
  });
}

export default ConnectDB