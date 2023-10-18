export default class StatusError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "StatusError";
    this.status = status;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    };
  }
}
