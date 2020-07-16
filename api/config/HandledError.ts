export class HandledError extends Error {

  public name: string;
  public status: number;
  public message: string;

  constructor({ name, status, message }: { name: string, status: number, message: string }) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export interface HandledErrorList {
  errors: HandledError[];
}
