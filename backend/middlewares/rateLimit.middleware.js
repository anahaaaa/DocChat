import { rateLimit, ipKeyGenerator } from 'express-rate-limit'
import {
    LOGIN_RATE_LIMIT_MAX,
    LOGIN_RATE_LIMIT_WINDOW_MS,
    VERIFICATION_RATE_LIMIT_MAX,
    VERIFICATION_RATE_LIMIT_WINDOW_MS,
    MESSAGE_RATE_LIMIT_MAX,
    MESSAGE_RATE_LIMIT_WINDOW_MS,
    CHAT_CREATE_RATE_LIMIT_MAX,
    CHAT_CREATE_RATE_LIMIT_WINDOW_MS
} from "../utils/constants.js"

const loginLimiter = rateLimit({
    windowMs: LOGIN_RATE_LIMIT_WINDOW_MS,
    limit: LOGIN_RATE_LIMIT_MAX,
    message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
        },
    standardHeaders:'draft-8',
    legacyHeaders:false

})

const verificationCodeLimiter = rateLimit({
    windowMs: VERIFICATION_RATE_LIMIT_WINDOW_MS,
    limit: VERIFICATION_RATE_LIMIT_MAX,
    message: {
    success: false,
    message: "Too many verification code requests. Please try again later.",
        },
    standardHeaders:'draft-8',
    legacyHeaders:false

})

const messageLimiter = rateLimit({
    windowMs: MESSAGE_RATE_LIMIT_WINDOW_MS,
    limit: MESSAGE_RATE_LIMIT_MAX,
    message: {
    success: false,
    message: "Too many messages sent. Please slow down and try again later.",
        },
    standardHeaders:'draft-8',
    legacyHeaders:false,
    keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req.ip)
    
})

const chatCreationLimiter = rateLimit({
    windowMs: CHAT_CREATE_RATE_LIMIT_WINDOW_MS,
    limit: CHAT_CREATE_RATE_LIMIT_MAX,
    message: {
    success: false,
    message: "Too many chat creation requests. Please try again later.",
        },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req.ip)
    
})

export {
    loginLimiter,
    verificationCodeLimiter,
    messageLimiter,
    chatCreationLimiter,
};