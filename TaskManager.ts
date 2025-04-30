// --- TaskManager.ts ---
// https://www.typescriptlang.org/play
// This is a simplified in-memory task manager with intentional bugs & missing logic.
// Your goal is to FIX and EXTEND it so all the tests at the bottom pass.
// You can use google and AI, but don't copy-paste ALL to AI and ask to solve it.

type TaskStatus = 'todo' | 'in-progress' | 'done';

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  dueDate: string; // ISO date string
};

let taskId = 1;
let tasks: Task[] = [
  {
    id: taskId++,
    title: 'Initial Task',
    status: 'todo',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(), // 3 days in future
  }
];

// --- Buggy and incomplete functions ---

function createTask(title: string, status: string, dueDate: string): Task {
  const task: Task = {
    id: taskId++,
    title,
    status: status as TaskStatus,
    dueDate,
  };
  tasks.push(task);
  return task;
}

function getTasks(filter?: any): Task[] {
  if (filter?.status) {
    return tasks.filter(t => t.status === filter?.status);
  }
  return tasks;
}

function updateStatus(id: number, newStatus: string): boolean {
  const task = tasks.find(t => t.id === id);
  if (!task) return false;
  task.status = newStatus as TaskStatus;
  return true;
}

// --- Your task ---
// 1. Fix bugs so filtering works.
// 2. Add validation in createTask: title must be non-empty, status must be valid, dueDate must be future.
// 3. Add validation in updateStatus.
// 4. All tests below should pass.


// --- Tests ---
function assert(cond: any, message: string) {
  if (!cond) throw new Error(`❌ ${message}`);
  console.log(`✅ ${message}`);
}

try {
  const initialCount = tasks.length;

  // Should fail with bad title
  try {
    createTask('', 'todo', new Date().toISOString());
    throw new Error('Validation failed to reject empty title');
  } catch {}

  // Should fail with invalid status
  try {
    createTask('Bad Status', 'unknown', new Date().toISOString());
    throw new Error('Validation failed to reject bad status');
  } catch {}

  // Should fail with past due date
  try {
    createTask('Past Due', 'todo', new Date(Date.now() - 86400000).toISOString());
    throw new Error('Validation failed to reject past due date');
  } catch {}

  // Should create a valid task
  const task = createTask('Do something', 'in-progress', new Date(Date.now() + 86400000).toISOString());
  assert(task.id > 0, 'Created task has valid ID');
  assert(tasks.length === initialCount + 1, 'Task list grew by 1');


  // Should return filtered tasks
  const inProgressTasks = getTasks({status: 'in-progress'});
  assert(inProgressTasks.length === 1 && inProgressTasks[0].status === 'in-progress', 'Filter by status works');

  // Should fail update with bad status
  assert(updateStatus(task.id, 'INVALID') === false, 'Rejects bad status update');

  // Should update status
  assert(updateStatus(task.id, 'done') === true, 'Updates status');
  const updated = tasks.find(t => t.id === task.id);
  assert(updated?.status === 'done', 'Status was updated correctly');

  const initialTask = getTasks({title: 'Initial Task'});
  assert(initialTask.length === 1 && initialTask[0].title === 'Initial Task', 'Filter by title works');

  console.log('\n🎉 All tests passed!');
} catch (e) {
  console.error(e.message);
}
