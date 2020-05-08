import express from 'express';
import QuestionService from '../services/QuestionService';
import { Authorize } from '../middleware/authorize.js';

let _questionService = new QuestionService().repository;

export default class QuestionController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id', this.getByQuestionId)
      .get('/poll/:id', this.getQuestionsByPollId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.deleteQuestion)
  }

  async getQuestionsByPollId(req, res, next) {
    try {
      let data = await _questionService.find({ poll: req.params.id })
      if (!data) {
        throw new Error("Invalid ID")
      }
      res.send(data)
    } catch (error) { next(error) }
  }
  async getByQuestionId(req, res, next) {
    try {
      let data = await _questionService.findById(req.params.id)
      if (!data) {
        throw new Error("Invalid ID")
      }
      res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      let data = await _questionService.create(req.body)
      res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _questionService.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid ID")
    } catch (error) {
      next(error)
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      await _questionService.findOneAndRemove({ _id: req.params.id })
      return res.send("question successfully removed")
    } catch (error) { next(error) }
  }
}