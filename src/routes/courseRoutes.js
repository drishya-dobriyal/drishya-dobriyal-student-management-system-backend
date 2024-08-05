const express = require('express');
const { getAllCourse, getCourseById, addCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getAllCourse);
router.get('/:id', getCourseById);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
