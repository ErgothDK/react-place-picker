class customError extends Error {
  constructor({ title, message }) {
    super();
    this.message = message;
    this.title = title;
  }
}

export default customError;
