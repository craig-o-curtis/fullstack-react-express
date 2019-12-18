import { addNewTask, updateTask } from './server';

(async function test() {
  await addNewTask({
    name: "test",
    id: "test"
  });

  await updateTask({
    name: "test1",
    id: "test"
  });
})();
