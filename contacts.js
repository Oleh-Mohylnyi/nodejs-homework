const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContacts = async () => {
    const content = await fs.readFile(contactsPath,'utf8',)
    const result = JSON.parse(content);
    return result;
}

async function listContacts() {
    return await readContacts();
}

async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.filter((contact) => contact.id === contactId);
    return contact;
}

async function removeContact(contactId) {
    const contacts = await readContacts();
    const contactForRemove = contacts.filter((contact) => contact.id === contactId);
    const newContacts = contacts.filter((contact) => contact.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contactForRemove;
}

async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact }
