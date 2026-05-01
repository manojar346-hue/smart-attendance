import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import axios from "axios";

export const markQR = async (req, res) => {
    const { qrCode } = req.body;

    const student = await Student.findOne({ qrCode });
    if (!student) return res.json({ error: "Invalid QR" });

    const attendance = new Attendance({
        studentId: student.studentId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Present"
    });

    await attendance.save();
    res.json({ message: "QR attendance marked" });
};

export const markFace = async (req, res) => {
    const { image } = req.body;

    const faceAPI = `${process.env.AZURE_FACE_ENDPOINT}/face/v1.0/detect`;

    const azureRes = await axios.post(faceAPI, image, {
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.AZURE_FACE_KEY,
            "Content-Type": "application/octet-stream"
        }
    });

    if (!azureRes.data[0]) return res.json({ error: "No face detected" });

    const faceId = azureRes.data[0].faceId;

    const student = await Student.findOne({ faceId });
    if (!student) return res.json({ error: "Face not matched" });

    const attendance = new Attendance({
        studentId: student.studentId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Present"
    });

    await attendance.save();

    res.json({ message: "Face attendance marked" });
};
