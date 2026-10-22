
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  date: {
    type: String,
    required: true
    //
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  }
});

attendanceSchema.index(
  { faculty: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);

