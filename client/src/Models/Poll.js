export default class Poll {
  constructor(data, user) {
    this.owner = data.owner
    this.name = data.name
    this.collaborators = data.collaborators || []
    this.loader = user.id
    this.id = data.id
    this.canModify = this.collaborators.find(c => c.id == this.loader)
  }

  get isOwner() {
    return this.owner == this.loader
  }
}