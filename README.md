# AutoBiz

A Node.js Express API that queries Firebase Firestore and can run locally or on Vercel.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`.

3. Choose one Firebase credential option:
   - Set `FIREBASE_SERVICE_ACCOUNT_PATH` to your local service-account JSON file.
   - Set `FIREBASE_SERVICE_ACCOUNT_JSON` to the complete JSON object. This is the recommended Vercel option.

4. Start the API:

   ```bash
   npm run dev
   ```

The local server runs on `http://localhost:3000` by default.

## API

```text
GET /api/data?collection=users&field=email&value=user@example.com
```

Optional `limit` defaults to `25` and cannot exceed `100`:

```text
GET /api/data?collection=orders&field=status&value=paid&limit=10
```

A successful response is shaped like:

```json
{
  "count": 1,
  "data": [
    { "id": "document-id", "status": "paid" }
  ]
}
```

The API returns `400` for missing or invalid query parameters, `404` when no documents match, and `500` for Firestore errors. `GET /health` is available for deployment checks.

## Deploy to Vercel from GitHub

1. Push this project to GitHub. Keep the service-account JSON file out of the repository.
2. Import the repository in Vercel.
3. Add `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel Project Settings > Environment Variables for the environments you use. Paste the entire service-account JSON as one value.
4. Deploy. Vercel uses `api/index.js` as the serverless entrypoint.

For local development with a JSON file, use `FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json`. The filename is ignored by git.
