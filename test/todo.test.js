const TodoList = artifacts.require("TodoList");

/**
 * Check the docs to learn how to write tests using javascript:
 * https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('TodoList', accounts => {
  it (' should deploy successfuly', async () => {
    await TodoList.deployed()
    return assert.isTrue(true)
  })

  it ('should create a new task', async () => {
    const contract = await TodoList.deployed()
    const res = await contract.createTask("Lunch", 0)

    assert.equal("TaskCreated", res.logs[0].event)
  })

  it ('should fetch tasks', async () => {
    const contract = await TodoList.deployed()
    const tasks = await contract.getTasks()

    assert.equal("0,,false,0,0,1,Lunch,false,0,0", tasks.toString())
  })

  it (' should toggle task and vice versa', async () => {
    const contract = await TodoList.deployed()
    const taskDone = await contract.toggleTaskDone("1")

    assert.equal("TaskChanged", taskDone.logs[0].event)
  })

  it ('should delete a task', async () => {
    const contract = await TodoList.deployed()
    const taskDeleted = await contract.deleteTask("1")

    assert.equal("TaskDeleted", taskDeleted.logs[0].event)
  })
})