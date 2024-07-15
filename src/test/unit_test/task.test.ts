import sinon from "sinon";
import expect from "expect";
import {
  getTodosById,
  deleteTodo,
  addTodo,
  updateTodo,
} from "../../services/todo.service";
import * as TodoModel from "../../model/todos.model";
import { Todo } from "../../interfaces/todo";

describe("Todo Service Test Suite", () => {
  describe("getTodo", () => {
    let getTodoStub: sinon.SinonStub;

    beforeEach(() => {
      getTodoStub = sinon.stub(TodoModel, "getTodosById");
    });

    afterEach(() => {
      getTodoStub.restore();
    });

    it("Should return todo list of user by id", () => {
      const todo: Todo = {
        id: "1",
        title: "Learn Node",
        completed: true,
        userID: "1",
      };

      getTodoStub.returns(todo);

      const response = getTodosById("1", "1");

      expect(response).toStrictEqual(todo);
    });
  });

  describe("removeTodos", () => {
    let removeTodosStub: sinon.SinonStub;
    let todoModelgetTodosByID: sinon.SinonStub;

    beforeEach(() => {
      removeTodosStub = sinon.stub(TodoModel, "deleteTodo");
      todoModelgetTodosByID = sinon.stub(TodoModel, "getTodosById");
    });

    afterEach(() => {
      removeTodosStub.restore();
      todoModelgetTodosByID.restore();
    });

    it("Should delete todo for user by id", () => {
      removeTodosStub.returns([]);
      todoModelgetTodosByID.returns(1);

      const response = deleteTodo("1", "1");

      expect(removeTodosStub.callCount).toBe(1);
      expect(removeTodosStub.getCall(0).args).toStrictEqual(["1", "1"]);
      expect(response).toStrictEqual([]);
    });
  });

  describe("createTodos", () => {
    let createTodosStub: sinon.SinonStub;

    beforeEach(() => {
      createTodosStub = sinon.stub(TodoModel, "addTodo");
    });

    afterEach(() => {
      createTodosStub.restore();
    });

    it("Should create a new todo for the user", () => {
      const todo: Todo = {
        id: "1",
        title: "Learn Node",
        completed: true,
        userID: "1",
      };

      const userID = "1";

      const todoWithUserId = { ...todo, userID };
      createTodosStub.returns(todoWithUserId);

      const response = addTodo(todoWithUserId, userID);
      console.log(response);

      //   expect(createTodosStub.callCount).toBe(1);
      //   expect(createTodosStub.getCall(0).args).toStrictEqual([todoWithUserId]);
      expect(response).toStrictEqual(todoWithUserId);
    });
  });

  describe("updateTodosById", () => {
    let updateTodosStub: sinon.SinonStub;

    beforeEach(() => {
      updateTodosStub = sinon.stub(TodoModel, "updateTodo");
    });

    afterEach(() => {
      updateTodosStub.restore();
    });

    it("Should update todo by id for the user", () => {
      const todo: Todo = {
        id: "1",
        title: "Updated Learn Node",
        completed: true,
        userID: "1",
      };
      updateTodosStub.returns(todo);
      const userId = "1";
      const todoId = "1";

      updateTodo(todoId, todo, userId);

      expect(updateTodosStub.callCount).toBe(1);
      expect(updateTodosStub.getCall(0).args).toStrictEqual([
        todoId,
        todo,
        userId,
      ]);
    });
  });
});
