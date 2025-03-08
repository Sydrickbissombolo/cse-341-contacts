const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        // Use findOne instead of find()
        const contacts = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

        if (!contacts) {
            return res.status(404).json({ message: "Contact not found." });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or server error.", error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
};