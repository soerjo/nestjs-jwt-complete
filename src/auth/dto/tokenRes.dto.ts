export class TokentResDto {
  access_token: string;
  refresh_token: string;

  constructor(payload: TokentResDto) {
    Object.assign(this, payload);
  }
}
