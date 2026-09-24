import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time';
import { Session } from '../models/session.js';
import crypto from 'crypto';
export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });
  res.cookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
  res.cookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};
export const createSession = async (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();
  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date() + FIFTEEN_MINUTES,
    refreshTokenValidUntil: new Date() + ONE_DAY,
  });
};
