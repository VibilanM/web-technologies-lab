import Student from "../models/Student.js";
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

router.get("/:dept", async (req, res) => {
    try {
        const students = await Student.find({
            department: req.params.dept
        });

        if (!students) {
            return res.status(404).json({
                success: false,
                message: "No students found in this department"
            });
        }
        
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

router.put("/", async (req, res) => {
    try {
        const studentId = req.query.studentId;

        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide student ID"
            });
        }
        
        const student = await Student.findOneAndUpdate(
            { studentId: studentId },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.delete("/", async (req, res) => {
    try {
        const studentId = req.query.studentId;

        if (!studentId) {
            return res.status(400).json({
                error: "studentId query parameter is required"
            });
        }

        const student = await Student.findOneAndDelete({
            studentId: studentId
        });

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

export default router;