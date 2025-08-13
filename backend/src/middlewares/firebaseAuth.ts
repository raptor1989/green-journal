import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize Firebase Admin SDK (service account credentials from env or file)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

export interface AuthRequest extends Request {
    user?: any;
}

export async function authenticateFirebaseJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;

        // User sync: ensure user exists in local DB
        const { uid, email, name } = decoded;
        if (email) {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email,
                        name: name || email.split('@')[0],
                        location: ''
                    }
                });
            }
            // Attach local user id to req.user
            req.user.localId = user.id;
        }

        return next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
}
