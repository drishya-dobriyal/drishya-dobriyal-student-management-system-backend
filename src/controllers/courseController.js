const prisma = require('../lib/prismaClient');

async function getAllCourse(req, res) {
    try {
        const course = await prisma.course.findMany();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await prisma.course.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addCourse(req, res) {
    try {
        const course = await prisma.course.create({ data: req.body });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCourse(req, res) {
    try {
        const course = await prisma.course.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCourse(req, res) {
    try {
        await prisma.course.delete({ where: { id: Number(req.params.id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllCourse, getCourseById, addCourse, updateCourse, deleteCourse };
