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
    string when;
  }

  event TaskCreated(uint id, string content, bool isDone, uint date, string when);

  mapping(uint => Task) tasks;

  function createTask (string memory _content, uint _date, string memory _when) public {
    // uint _now = block.timestamp;
    tasks[taskCount] = Task(taskCount, _content, false, _date, 0, _when);
    taskIds.push(taskCount);
    taskCount++;

    emit TaskCreated(taskCount, _content, false, _date, _when);
  }

  function getTaskIds () public view returns (uint[] memory) {
    return taskIds;
  }

  function getTasks () public view returns (Task[] memory) {
    Task[] memory _tasks = new Task[](taskCount);

    for (uint i = 1; i < taskCount; i++) {
      _tasks[i] = tasks[i];
    }

    return _tasks;
  }

}