const chalk = require('chalk');
const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts')
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
    case 'list':
            const contacts = await listContacts();
            console.table(contacts);
      break;

    case 'get':
            const contactById = await getContactById(id);
            console.table(contactById);
      break;

    case 'add':
            const contactForAdd = await addContact(name, email, phone);
            console.log(chalk.green('Add new contact:'), contactForAdd);
      break;

    case 'remove':
            const contactForRemove = await removeContact(id);
            console.log(chalk.red('Removed contact:'), contactForRemove);
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv)
    .then(() => console.log('Operation success'));

