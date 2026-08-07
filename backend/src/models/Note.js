import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, default: "Untitled note" },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    color: { type: String, default: "#6366F1" },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
