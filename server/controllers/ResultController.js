import express from 'express';
import ResultService from '../services/ResultService';
import { Authorize } from '../middleware/authorize.js';

let _resultService = new ResultService().repository;

export default class ResultController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id', this.getByResultId)
      .get('/poll/:id', this.getResultsByPollId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.deleteResults)
  }
  async getResultsByPollId(req, res, next) {
    try {
      let data = await _resultService.find({ poll: req.params.id })
      if (!data) {
        throw new Error("Invalid ID")
      }
      res.send(data)
    } catch (error) { next(error) }
  }
  async getByResultId(req, res, next) {
    let result = {
      pollId: "",
      pollSnapshot: {
        questions: [
          {
            id: "q1",
            body: "what is 4 - (2 + 2)?",
            options: [
              {
                body: "-2",
                points: 1,
                color: "red"
              },
              {
                body: "0",
                points: 4,
                color: "green"
              },
              {
                body: "2",
                points: 2,
                color: "yellow"
              },
              {
                body: "4",
                points: 3,
                color: "blue"
              }
            ]
          },
          {
            id: "q2",
            body: "what is the meaning of life?",
            options: [
              {
                body: "to become a void, consuming everything around you",
                points: 1,
                color: "red"
              },
              {
                body: "to find inner peace",
                points: 3,
                color: "blue"
              },
              {
                body: "42",
                points: 4,
                color: "green"
              },
              {
                body: "43",
                points: 2,
                color: "yellow"
              }
            ]
          }
        ]
      },
      responses: [
        {
          participant: "Jimmy Tester",
          questionId: "q1",
          option: {
            body: "-2",
            points: 1,
            color: "red"
          },
          time: 8
        },
        {
          participant: "Alpha",
          questionId: "q1",
          option: {
            body: "0",
            points: 4,
            color: "green"
          },
          time: 3
        },
        {
          participant: "Tracer Core",
          questionId: "q1",
          option: {
            body: "unanswered",
            points: 0,
            color: "transparent"
          },
          time: 60
        },
        {
          participant: "Your Mom",
          questionId: "q1",
          option: {
            body: "0",
            points: 4,
            color: "green"
          },
          time: 8
        },
        {
          participant: "p@p.p",
          questionId: "q1",
          option: {
            body: "-2",
            points: 1,
            color: "red"
          },
          time: 60
        },
        {
          participant: "D@D.D",
          questionId: "q1",
          option: {
            body: "2",
            points: 2,
            color: "yellow"
          },
          time: 60
        },
        {
          participant: "Jimmy Tester",
          questionId: "q2",
          option: {
            body: "to find inner peace",
            points: 3,
            color: "blue"
          },
          time: 30
        },
        {
          participant: "Alpha",
          questionId: "q2",
          option: {
            body: "42",
            points: 4,
            color: "green"
          },
          time: 30
        },
        {
          participant: "Your Mom",
          questionId: "q2",
          option: {
            body: "43",
            points: 2,
            color: "yellow"
          },
          time: 10
        },
        {
          participant: "p@p.p",
          questionId: "q2",
          option: {
            body: "unanswered",
            points: 0,
            color: "transparent"
          },
          time: 30
        },
        {
          participant: "D@D.D",
          questionId: "q2",
          option: {
            body: "unanswered",
            points: 0,
            color: "transparent"
          },
          time: 30
        },
        {
          participant: "Tracer Core",
          questionId: "q2",
          option: {
            body: "to become a void, consuming everything around you",
            points: 1,
            color: "red"
          },
          time: 10
        }
      ],
      participants: [
        {
          name: "Jimmy Tester",
          // potentailly other data here
        },
        {
          name: "Alpha",
        },
        {
          name: "Tracer Core",
        },
        {
          name: "D@D.D",
        },
        {
          name: "Your Mom",
        },
        {
          name: "p@p.p",
        }
      ]
    };
    return res.send(result);
    // try {
    //   let data = await _resultService.findById(req.params.id).populate({ path: "responses.$.option" })
    //   if (!data) {
    //     throw new Error("Invalid ID")
    //   }
    //   res.send(data)
    // } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      let data = await _resultService.create(req.body)
      res.send(data)
    } catch (error) { next(error) }
  }
  async edit(req, res, next) {
    try {
      let data = await _resultService.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
    } catch (error) { next(error) }
  }
  async deleteResults(req, res, next) {
    try {
      await _resultService.findOneAndRemove({ _id: req.params.id })
      return res.send("results successfully removed")
    } catch (error) { next(error) }
  }
}
