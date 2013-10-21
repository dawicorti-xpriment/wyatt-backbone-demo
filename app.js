var Todo = require('todos/model/todo')
  , TodoList = require('todos/collection/todolist');

var todo = new Todo();

todo.save({}, {success: function () {
    new TodoList().fetch({success: function (list) {
        list.each(function (model) {
            console.log(model.toJSON());
        });
    }});
}});


