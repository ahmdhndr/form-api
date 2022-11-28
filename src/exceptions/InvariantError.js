import ClientError from './ClientError.js';

class InvariantError extends ClientError {
  constructor(message, part) {
    super(message);
    this.name = 'InvariantError';
    this.part = part;
  }
}

export default InvariantError;
