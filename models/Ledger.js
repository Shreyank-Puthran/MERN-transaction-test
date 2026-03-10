import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Client",
    //   required: true
    // },
    clientId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Ledger", ledgerSchema);
