import express from 'express';
import PollService from '../services/PollService';
import { Authorize } from '../middleware/authorize.js';
import UserService from '../services/UserService';

let _us = new UserService().repository
let _pollService = new PollService()
let _pollRepo = _pollService.repository

export default class PollController {
    constructor() {
        this.router = express.Router()
            .use(Authorize.authenticated)
            .get('/', this.getPolls)
            .post('', this.create)
            .use(':/id', this.hasAccess)
            .get('/:id', this.getByPollId)
            .put('/:id/collabs', this.addCollabByEmail)
            .put('/:id/removeCollab', this.removeCollab)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }
    async getByPollId(req, res, next) {
        try {
            let poll = await _pollService.getPollById(req.params.id)
            if (!poll) {
                throw new Error("Invalid Id")
            }
            res.send(poll)
        } catch (error) { next(error) }
    }
    async getPolls(req, res, next) {
        try {
            let data = await _pollRepo.find({ collaborators: req.session.uid })
            if (!data) {
                throw new Error("Invalid ID")
            }
            res.send(data)
        } catch (error) { next(error) }
    }
    async create(req, res, next) {
        try {
            req.body.owner = req.session.uid
            req.body.collaborators = req.session.uid
            let poll = await _pollRepo.create(req.body)
            _pollService.updateCache(poll)
            res.send(poll)
        } catch (error) { next(error) }
    }
    async edit(req, res, next) {
        try {
            let poll = await _pollService.getPollById(req.params.id)
            poll = await _pollRepo.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("collaborators", "name")
            _pollService.updateCache(poll)
            return res.send(poll)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            let poll = await _pollService.getPollById(req.params.id)
            await poll.remove()
            _pollService.removeFromCache(req.params.id)
            res.send("deleted poll")
        } catch (error) { next(error) }
    }
    async addCollabByEmail(req, res, next) {
        try {
            let query = req.body.email
            let userFound = await _us.findOne({ email: query }).select('name email')
            if (!userFound) { throw new Error("No profile found") }

            let poll = await _pollService.getPollById(req.params.id)
            let exists = poll.collaborators.find(c => c._id == userFound.id)
            if (!exists) {
                poll.collaborators.addToSet(userFound)
                await poll.save()
            }
            // _pollService.updateCache(poll)
            return res.send(poll.collaborators)
        } catch (error) {
            next(error)
        }
    }
    async removeCollab(req, res, next) {
        try {
            let poll = await _pollService.getPollById(req.params.id)
            poll.collaborators.pull(req.body.collabId);
            await poll.save();
            // _pollService.updateCache(poll)
            res.send("removed collaborator")
        } catch (error) {
            next(error)
        }
    }
    async hasAccess(req, res, next) {
        try {
            await _pollService.hasAccess(req.session.uid, req.params.id)
            next()
        } catch (error) {
            next(error)
        }
    }
}