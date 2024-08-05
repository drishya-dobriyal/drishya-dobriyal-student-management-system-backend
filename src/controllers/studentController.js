const prisma = require('../lib/prismaClient');

async function studentList(req, res) {
    try {
        const students = await prisma.student.findMany({
            include: {
                courses: true, // Include courses associated with each student
            },
        });
        res.status(201).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getStudent(req, res) {
    try {
        const student = await prisma.student.findFirst({
            where: {
                id: Number(req.params.id)
            },
            include: {
                courses: true, // Include courses associated with each student
            },
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addStudent(req, res) {
    const { name, attendance, performance, courseIds } = req.body;
    try {
        const student = await prisma.student.create({
            data: {
                name,
                attendance,
                performance,
                courses: {
                    connect: courseIds ? courseIds.map(id => ({ id })) : []
                }
            }
        });
        res.status(201).json(student);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'An error occurred while adding the student.' });
    }
}

async function updateStudent(req, res) {
    try {
        const studentId = Number(req.params.id);
        const { name, attendance, performance, courseIds } = req.body;

        // Fetch the student to get current courses
        const existingStudent = await prisma.student.findUnique({
            where: { id: studentId },
            include: { courses: true } // Include current courses
        });

        if (!existingStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Determine which courses to disconnect
        const existingCourseIds = existingStudent.courses.map(course => course.id);
        const courseIdsToDisconnect = existingCourseIds.filter(id => !courseIds.includes(id));
        const courseIdsToConnect = courseIds || [];

        // Update the student
        const student = await prisma.student.update({
            where: { id: studentId },
            data: {
                name,
                attendance,
                performance,
                courses: {
                    disconnect: courseIdsToDisconnect.map(id => ({ id })),
                    connect: courseIdsToConnect.map(id => ({ id }))
                }
            }
        });

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function deleteStudent(req, res) {
    try {
        await prisma.student.delete({ where: { id: Number(req.params.id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { studentList, getStudent, addStudent, updateStudent, deleteStudent };
