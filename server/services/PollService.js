import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
let cache = {}


const _schema = new Schema({
    name: { type: String, required: true },
    collaborators: [{ type: ObjectId, ref: 'User', required: true }],
    owner: { type: ObjectId, ref: 'User', required: true },
    meta: {
        question: {}
    }
}, { timestamps: true })

_schema.set('toJSON', {
    virtuals: true
});
_schema.virtual("id").get(function () {
    return this._id.toHexString()
})

export default class PollService {

    get repository() {
        return mongoose.model('Poll', _schema)
    }

    async getPollById(pollId) {
        let poll = cache[pollId]
        if (!poll) {
            poll = await this.repository.findById(pollId).populate("collaborators", "name")
            if (!poll) {
                throw new Error("Bad Id")
            }
            cache[poll.id] = poll
        }
        return poll
    }

    async hasAccess(userId, pollId) {
        let poll = this.getPollById(pollId)
        // @ts-ignore
        if (!poll.collaborators.find(u => userId == user.id)) {
            throw new Error("Invalid user access")
        }
        return poll
    }
    updateCache(poll) {
        cache[poll.id] = poll
    }
    removeFromCache(id) {
        cache[id] = null
        delete cache[id]
    }
}