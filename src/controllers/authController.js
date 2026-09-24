import createHttpError from "http-errors";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from "../services/auth";
import { Session } from "../models/session";
export const registerUser = async (req, res) => {
  const {email, password} = req.body;
  const isEmailAlreadyExist = User.findOne({
    email
  });
  if(isEmailAlreadyExist){
    throw createHttpError(400, 'Email in use');
  }
  const hashedPassword = await bcrypt(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword
  });
  const newSession = await createSession(newUser['_id']);
  setSessionCookies(res, newSession);
  res.status(201, newUser);
};
export const userLogin = async (req, res) => {
  const {email,password} = req.body;
  const user = User.findOne({
    email
  });
  if(!user || !password){
    throw createHttpError(401, 'Invalid credentials');
  }
  const isPasswordValid = bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw createHttpError(401, 'Invalid credentials');
  }
  await Session.deleteOne({
    userId: user['_id']
  });
  const newSession = await createSession(user['_id']);
  setSessionCookies(res, newSession);
  res.status(200).json(user);
};
export const refreshUserSession = async (req, res) => {
  const {sessionId, refreshToken} = req.cookies;
  if(!sessionId || !refreshToken){
    throw createHttpError(401, 'Missing session credentials');
  }
  const session = await Session.findOne({
    _id: sessionId, refreshToken
  });
  if(!session){
    throw createHttpError(401, 'Session not found.');
  }
  const isSessionTokenExpired = session.refreshTokenValidUntil < new Date();
  if(isSessionTokenExpired){
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.clearCookie('sessionId');
    createHttpError(401, 'Session Token Expired.');
  }
  await session.deleteOne();
  const newSession = createSession(session.userId);
  setSessionCookies(res, newSession);
  res.status(200).json({
    message: 'Session refreshed.'
  });
};
export const logoutUser = async (req,res )=> {
  const {sessionId} = req.cookies;
  if(sessionId){
    Session.deleteOne({
      _id: sessionId
    });
  }
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(204).send();
};
