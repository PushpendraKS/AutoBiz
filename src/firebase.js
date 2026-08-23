const fs = require('node:fs');
const path = require('node:path');
const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  console.log(serviceAccountPath)
  if (!serviceAccountPath) {
    throw new Error(
      'Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH before starting the API.'
    );
  }

  const absolutePath = path.resolve(serviceAccountPath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function getDatabase() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(loadServiceAccount()),
    });
  }

  return getFirestore();
}

module.exports = { getDatabase };
