pragma solidity ^0.8.10;

contract TodoList {
  constructor () {
    createTask('Checkout the Solidity docs');
  }

  uint taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) tasks;

  function createTask (string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }
}