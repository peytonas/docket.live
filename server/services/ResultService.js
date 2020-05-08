import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const _schema = new Schema({
  poll: { type: ObjectId, ref: 'Poll', required: true },
  proctor: { type: ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  pollSnapshot: {
    Poll: {
      name: { type: String, required: true },
      collaborators: [{ type: ObjectId, ref: 'User', required: true }],
      owner: { type: ObjectId, ref: 'User', required: true },
      meta: {
        question: {}
      }
    },
    Questions: [{
      poll: { type: ObjectId, ref: 'Poll', required: true },
      body: { type: String, required: true },
      time: { type: Number, default: 60 },
      options: [
        {
          body: { type: String, default: "option", required: false },
          points: { type: Number, required: false },
          color: { type: String, required: false }
        },
      ]
    }]
  },
  responses: [{
    participant: { type: String, required: true },
    question: { type: ObjectId, ref: 'Question', required: true },
    option: { type: ObjectId, ref: 'Option', required: true },
    time: { type: Number, required: true }
  }],
  participants: [{ type: String }],
  // virtuals: [pAnswers, qAnswers]
}, { timestamps: true })

_schema.set('toJSON', {
  virtuals: true
});
export default class ResultService {
  get repository() {
    return mongoose.model('Result', _schema)
  }
}