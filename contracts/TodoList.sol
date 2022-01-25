pragma solidity ^0.8.10;

contract TodoList {
  uint private taskCount = 1;
  uint[] private taskIds;

  struct Task {
    uint id;
    string content;
    bool isDone;
    uint date;
    uint dateOfCompletion;
  }

  event TaskCreated(uint id, string content, bool isDone, uint date);
  event TaskChanged(uint id, bool isDone, uint dateOfCompletion);
  event TaskDeleted(uint id);

  mapping(uint => Task) tasks;

  function createTask (string memory _content, uint _date) public {
  
    tasks[taskCount] = Task(taskCount, _content, false, _date, 0);
    taskIds.push(taskCount);
    taskCount++;

    emit TaskCreated(taskCount, _content, false, _date);
  }

  function getTasks () public view returns (Task[] memory) {
    Task[] memory _tasks = new Task[](taskCount);

    for (uint i = 1; i < taskCount; i++) {
      _tasks[i] = tasks[i];
    }

    return _tasks;
  }

  function toggleTaskDone(uint _id) public doesTaskExist(_id) {
    Task storage task = tasks[_id];
    task.isDone = !task.isDone;
    task.dateOfCompletion = task.isDone ? block.timestamp : 0;

    emit TaskChanged(_id, task.isDone, task.dateOfCompletion);
  }

  function deleteTask(uint _id) public doesTaskExist(_id) {
    delete tasks[_id];

    emit TaskDeleted(_id);
  }

  modifier doesTaskExist (uint _taskId) {
    if (tasks[_taskId].id == 0) {
      revert("Revert: Task does not exist");
    }
    _;
  }

}