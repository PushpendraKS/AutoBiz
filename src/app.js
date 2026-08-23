require('dotenv').config();
const express = require('express');
const { getDatabase } = require('./firebase');
const { isPastOrToday } = require('./utility/dateUtils');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

async function findFirestoreData(req, res, next) {
    const { userID } = req.query;

    if (typeof userID !== 'string' || !userID.trim()) {
        return res.status(400).json({
            error: 'userID query parameter is required.',
        });
    }

    try {
        const snapshot = await getDatabase()
            .collection('subscriber')
            .where('UserID', '==', userID.trim())
            .get();

        const data = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));

        if (!data.length) {
            return res.status(404).json({
                message: 'No matching documents found.',
                data: [],
            });
        }

        const isActive = isPastOrToday(data[0].EndDate);

        return res.json({ subscriptionStatus: isActive });
    } catch (error) {
        return next(error);
    }
}

app.get(['/api/subscription', '/subscription'], findFirestoreData);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Unable to query Firestore.' });
});

module.exports = app;
