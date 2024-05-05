export default class PostModel {
  constructor(title, body, createdBy, active, geoLocation) {
    this.title = title;
    this.body = body;
    this.createdBy = createdBy;
    this.active = active;
    this.geoLocation = geoLocation;
  }
}
