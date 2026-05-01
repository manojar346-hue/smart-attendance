import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: String,
    date: String,
    time: String,
    status: String
});

export default mongoose.model("Attendance", attendanceSchema);
