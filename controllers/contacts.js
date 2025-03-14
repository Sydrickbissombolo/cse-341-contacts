const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};


const getSingle = async (req, res) => {
    ///#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);

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


const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);

        if (response.acknowledged) {
            return res.status(201).json({ message: "Contact created successfully.", contact });
        } else {
            return res.status(500).json({ message: "Failed to create contact." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').updateOne({_id: contactId}, {$set: contact});
    if (response.modifiedCount > 0) {
        res.status(204).send().json({ message: "Contact updated successfully." });
    }
    else {
        res.status(500).json({ message: "Failed to update contact." });
    }
};


const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});
    if (response.deletedCount > 0) {
        res.status(204).send().json({ message: "Contact deleted successfully." });
    }
    else {
        res.status(500).json({ message: "Failed to delete contact." });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};