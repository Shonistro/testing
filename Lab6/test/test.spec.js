const request = require('supertest');
const { assert } = require('chai');

describe('Todos API test', function () {
    this.timeout(10000);
    const apiUrl = 'https://gorest.co.in/public/v2';
    const TOKEN = '8363484f5ce4a7931f0e89e9232f6efa0738a3dbe76cef3106d1d0b5f4e7b4a7';
    let createdTodoId;

    const newTodo = {
        title: "Sample TODO title",
        due_on: "2024-12-03T00:00:00.000+05:30",
        status: "pending",
        user_id: 7502429
    };

    it('GET should return a list of todos', async () => {
        const response = await request(apiUrl)
            .get('/todos')
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);

        console.log('GET /todos response:', response.body);
        assert.isArray(response.body, "Response should be an array");
        assert.isNotEmpty(response.body, "Response array should not be empty");
    });

    it('POST should create a new todo', async () => {
        const response = await request(apiUrl)
            .post('/todos')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(newTodo)
            .expect(201)
            .catch((err) => {
                console.error('Error in POST /todos:', err.response ? err.response.body : err);
                throw err;
            });

        console.log('POST /todos response:', response.body);
        createdTodoId = response.body.id;
        assert.isDefined(createdTodoId, 'Todo ID should be defined');
        assert.equal(response.body.title, newTodo.title);
        assert.equal(response.body.due_on, newTodo.due_on);
        assert.equal(response.body.status, newTodo.status);
    });

    it('GET should return the created todo details', async function () {

        const response = await request(apiUrl)
            .get(`/todos/${createdTodoId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);

        console.log(`GET /todos/${createdTodoId} response:`, response.body);
        assert.equal(response.body.id, createdTodoId);
        assert.equal(response.body.title, newTodo.title);
        assert.equal(response.body.due_on, newTodo.due_on);
        assert.equal(response.body.status, newTodo.status);
    });

    it('PATCH should update the todo status', async function () {
        if (!createdTodoId) this.skip();

        const updatedStatus = 'completed';
        const response = await request(apiUrl)
            .patch(`/todos/${createdTodoId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({ status: updatedStatus })
            .expect(200);

        console.log(`PATCH /todos/${createdTodoId} response:`, response.body);
        assert.equal(response.body.status, updatedStatus);
    });

    it('DELETE should delete the todo', async function () {

        const response = await request(apiUrl)
            .delete(`/todos/${createdTodoId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(204);

        console.log(`DELETE /todos/${createdTodoId} response:`, response.body);
    });
});
