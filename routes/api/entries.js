const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();
const Entry = require('../../models/Entry');

// @route POST api/entries
// @desc Post an entry
// @access Private
router.post(
    '/',
    auth,
    [
        check('title', 'Please provide a title')
            .not()
            .isEmpty(),
        check('content', 'Please provide some content')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user } = req;
        const { title, content } = req.body;

        const entry = new Entry({
            userId: user.id,
            title,
            content
        });

        try {
            await entry.save();

            res.status(200).json({ msg: 'Entry posted successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(400).json({ msg: 'Server error' });
        }
    }
);

// @route GET api/entries
// @desc Get all user entries
// @access Private
router.get('/', auth, async (req, res) => {
    const { user } = req;
    try {
        const entries = await Entry.find({ userId: user.id }).sort({
            date: -1
        });

        res.status(200).json(entries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
