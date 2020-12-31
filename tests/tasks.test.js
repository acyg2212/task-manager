const request = require('supertest');
const Task = require('../src/models/task');
const { userOne, userOneId, setUpDb, userTwo, userTwoId, taskOne } = require('./fixtures/db');
const app = require('../src/app');


beforeEach(setUpDb)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', ` Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();

    expect(task.completed).toEqual(false);
})

test('Should get all tasks for a particular user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const tasks = response.body
    expect(tasks.length).toEqual(2)
})

test("User should not be able to delete a task they don't own", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(500);

    expect(taskOne).not.toBeNull()
})