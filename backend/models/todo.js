import mongoose from 'mongoose';

const todosSchema = new mongoose.Schema({
  taskName: String,
  isComplete: Boolean,
});

const todosModel = mongoose.model('todo', todosSchema);

export default todosModel;
