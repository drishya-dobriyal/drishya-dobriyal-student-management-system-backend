const express = require('express');
const { addStudent, getStudent, updateStudent, deleteStudent, studentList } = require('../controllers/studentController');
const router = express.Router();

router.get('/', studentList);
router.post('/', addStudent);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
