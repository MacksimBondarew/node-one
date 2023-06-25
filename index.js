const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action, <type>", "choose action")
    .option("-i, --id, <type>", "id user")
    .option("-n, --name, <type>", "name user")
    .option("-e, --email, <type>", "email user")
    .option("-p, --phone, <type>", "phone number user");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case "get":
            const contactsById = await contacts.getContactById(id);
            return console.log(contactsById);
        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.log(removeContact);
        case "add":
            const addContact = await contacts.addContact(
                id,
                name,
                email,
                phone
            );
            return console.log(addContact);
        default:
            console.warn("Unknown action type!");
    }
};

// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: 'qdggE76Jtbfd9eWJHrssH'});
// invokeAction({ action: "remove", id: "1DEXoP8AuCGYc1YgoQ6hw" });
// invokeAction({action: 'add', id: "1DEXoP8AuCGYc1YgoQ6hw", name: "Abbot Franks", email: "scelerisque@magnis.org", phone: "(186) 568-3720"  })
invokeAction(argv);
