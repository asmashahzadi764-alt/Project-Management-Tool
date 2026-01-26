const express = require('express');
const router = express.Router();

// Dev-only seeding endpoint: creates a test user, project, boards and tasks
// Use only in development. Returns created objects.

const Project = require('../models/Project');
const Board = require('../models/Board');
const Task = require('../models/Task');
const User = require('../models/User');

router.post('/seed', async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ message: 'Seeding only allowed in development' });
    }

    // find or create a dev user
    let user = await User.findOne({ email: 'dev@example.com' });
    if (!user) {
      user = await User.create({ name: 'Dev User', email: 'dev@example.com', password: 'devpass' });
    }

    // create project
    const project = await Project.create({
      title: 'Dev Project',
      description: 'Seeded project for local development',
      owner: user._id,
      members: [user._id]
    });

    // create boards
    const boardTitles = ['Backlog', 'In Progress', 'Done'];
    const boards = await Promise.all(
      boardTitles.map((t, i) => Board.create({ projectId: project._id, title: t, order: i }))
    );

    // create sample tasks across boards
    const tasksData = [
      { title: 'Setup project', description: 'Initialize repo and tooling', boardId: boards[0]._id },
      { title: 'Design schema', description: 'Create DB schemas for app', boardId: boards[0]._id },
      { title: 'Implement auth', description: 'Register/login and JWT', boardId: boards[1]._id },
      { title: 'Real-time comments', description: 'Enable sockets for comments', boardId: boards[1]._id },
      { title: 'Release v1', description: 'Prepare release and changelog', boardId: boards[2]._id }
    ];

    const tasks = await Promise.all(
      tasksData.map(t => Task.create({
        projectId: project._id,
        boardId: t.boardId,
        title: t.title,
        description: t.description,
        assignedTo: user._id
      }))
    );

    res.json({ project, boards, tasks, user });
  } catch (err) {
    console.error('dev seed error:', err);
    res.status(500).json({ message: 'Seeding failed', error: err.message });
  }
});

module.exports = router;
