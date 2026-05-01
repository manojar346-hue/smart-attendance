import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    studentId: String,
    className: String,
    faceId: String,
    qrCode: String
});

export default mongoose.model("Student", studentSchema);
