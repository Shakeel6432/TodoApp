import inquirer from 'inquirer';
;
class TodoApp {
    tasks;
    constructor() {
        this.tasks = [];
    }
    ;
    showTasks = () => {
        if (this.tasks.length === 0) {
            console.log('No tasks available.');
        }
        else {
            console.log('Tasks:');
            this.tasks.forEach((task, index) => {
                let dueDateInfo = task.dueDate ? ` (Due: ${task.dueDate})` : '';
                let priorityInfo = task.priority ? ` [Priority: ${task.priority}]` : '';
                console.log(`${index + 1}. ${task.description}${dueDateInfo}${priorityInfo}`);
            });
        }
        ;
    };
    addTask = async () => {
        let taskDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'description',
                message: 'Enter a new task:',
            },
            {
                type: 'input',
                name: 'dueDate',
                message: 'Enter due date (optional):',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter priority (optional):',
            },
        ]);
        let newTask = {
            description: taskDetails.description,
        };
        if (taskDetails.dueDate) {
            newTask.dueDate = taskDetails.dueDate;
        }
        ;
        if (taskDetails.priority) {
            newTask.priority = taskDetails.priority;
        }
        ;
        this.tasks.push(newTask);
        console.log('Task added successfully.');
    };
    deleteTask = async () => {
        let taskToDelete = await inquirer.prompt({
            type: 'number',
            name: 'index',
            message: 'Enter the task number to delete',
            validate: (input) => input > 0 && input <= this.tasks.length || 'Invalid task number',
        });
        let deletedTask = this.tasks.splice(taskToDelete.index - 1, 1);
        console.log(` Task "${deletedTask[0].description}" deleted successfully.`);
    };
    start = async () => {
        while (true) {
            let action = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'Choose an action',
                choices: ['Show Task', 'Add Task', 'Delete Task', 'Exit'],
            });
            switch (action.action) {
                case 'Show Task':
                    this.showTasks();
                    break;
                case 'Add Task':
                    await this.addTask();
                    break;
                case 'Delete Task':
                    await this.deleteTask();
                    break;
                case 'Exit':
                    console.log('Exiting Todo App.');
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
                    break;
            }
            ;
        }
        ;
    };
}
;
let todoApp = new TodoApp();
todoApp.start();
