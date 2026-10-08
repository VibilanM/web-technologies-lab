import Student from "./models/Student.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json({ 
            success: true,
            data: savedStudent
        });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({ 
                success: false,
                message: "Student already exists"
            });
        }
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ 
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
});

