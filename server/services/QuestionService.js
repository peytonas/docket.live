import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _optionSchema = new Schema({
  body: { type: String, default: "option", required: false },
  points: { type: Number, required: false },
  color: { type: String, required: false }
})

const _schema = new Schema({
  poll: { type: ObjectId, ref: 'Poll', required: true },
  body: { type: String, required: true },
  time: { type: Number, default: 60 },
  options: [
    _optionSchema
  ]
}, { timestamps: true })

_schema.set('toJSON', {
  virtuals: true
})

export default class QuestionService {
  get repository() {
    return mongoose.model('Question', _schema)
  }
}