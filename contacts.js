const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
