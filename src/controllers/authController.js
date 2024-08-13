const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prismaClient');

const ALLOWED_ROLES = ['ADMIN', 'TEACHER', 'STUDENT'];

async function signup(req, res) {
    const { username, password, role } = req.body;
    if (!username || !password || !role || !ALLOWED_ROLES.includes(role.toUpperCase())) {
        return res.status(500).json({ error: 'Missing or Invalid fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const { id } = await prisma.user.create({
            data: { username, password: hashedPassword, role: role.toUpperCase() }
        });
        const token = jwt.sign({ id, role: role.toUpperCase() }, process.env.SECRET_KEY);
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY);
    res.json({ token });
}


module.exports = { signup, login };
