export default class UserModel {
  id: string;
  userID: string;
  userPW: string;
  userNm: string;
  email: string;
  token: string

  constructor(
    id: string, 
    userID: string,
    userPW: string,
    userNm: string, 
    email: string,
    token: string
) {
    this.id = id
    this.userID = userID
    this.userPW = userPW
    this.userNm = userNm
    this.email = email
    this.token = token
  }
}



