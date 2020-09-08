const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
  taskDesc:{
	type:String,
  },
  creator: {
    type: String,
  },
  duration: {
    type: Number,
  },
  createdAt: {
    type: String,
  },
  expire_at: {
    type: Date,
    default: Date.now,
    expires: duration
  }
});

const Todos = mongoose.model('Todos', TodosSchema);

module.exports = Todos;