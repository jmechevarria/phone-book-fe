export class UnauthorizedException extends Error {
  constructor(message: string | undefined, public code = 401) {
    super(message);
  }
}
