import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Client",
    //   required: true,
    //   unique: true
    // },
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Wallet", walletSchema);
