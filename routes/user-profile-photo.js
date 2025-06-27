// // // backend/routes/user-profile-photo.js
// // import express from 'express';
// // import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

// // const router = express.Router();
// // const dynamo = new DynamoDBClient({ region: 'us-east-1' });

// // router.get('/user-profile-photo/:email', async (req, res) => {
// //   const email = decodeURIComponent(req.params.email);
// //   try {
// //     const result = await dynamo.send(new GetItemCommand({
// //       TableName: 'Users',
// //       Key: { email: { S: email } },
// //       ProjectionExpression: 'profilePhotoUrl, firstName, lastName, createdAt'
// //     }));

// //     const photoUrl = result.Item?.profilePhotoUrl?.S || null;
// //     const firstName = result.Item?.firstName?.S || '';
// //     const lastName = result.Item?.lastName?.S || '';
// //     const createdAt = result.Item?.createdAt?.S || null;

// //     return res.status(200).json({ success: true, photoUrl, firstName, lastName, createdAt });
// //   } catch (err) {
// //     console.error('Error fetching profile photo:', err);
// //     return res.status(500).json({ success: false, error: err.message });
// //   }
// // });

// // export default router;

// // backend/routes/user-profile-photo.js

// import express from 'express';
// import cors from 'cors';
// import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

// const router = express.Router();
// const dynamo = new DynamoDBClient({ region: 'us-east-1' });

// // Apply CORS for this specific route (allows frontend Vercel domain)
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://frontend-zula.vercel.app'
//   ],
//   credentials: true
// };

// router.get('/user-profile-photo/:email', cors(corsOptions), async (req, res) => {
//   const email = decodeURIComponent(req.params.email);
//   try {
//     const result = await dynamo.send(new GetItemCommand({
//       TableName: 'Users',
//       Key: { email: { S: email } },
//       ProjectionExpression: 'profilePhotoUrl, firstName, lastName, createdAt'
//     }));

//     const photoUrl = result.Item?.profilePhotoUrl?.S || null;
//     const firstName = result.Item?.firstName?.S || '';
//     const lastName = result.Item?.lastName?.S || '';
//     const createdAt = result.Item?.createdAt?.S || null;

//     return res.status(200).json({
//       success: true,
//       photoUrl,
//       firstName,
//       lastName,
//       createdAt
//     });
//   } catch (err) {
//     console.error('❌ Error fetching profile photo:', err);
//     return res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// export default router;
// backend/routes/user-profile-photo.js

import express from 'express';
import cors from 'cors';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const router = express.Router();
const dynamo = new DynamoDBClient({ region: 'us-east-1' });

// ✅ Per-route CORS options for safety
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://frontend-p8yq.vercel.app/'
  ],
  credentials: true
};

router.get('/user-profile-photo/:email', cors(corsOptions), async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  try {
    const result = await dynamo.send(new GetItemCommand({
      TableName: 'Users',
      Key: { email: { S: email } },
      ProjectionExpression: 'profilePhotoUrl, firstName, lastName, createdAt'
    }));

    const photoUrl = result.Item?.profilePhotoUrl?.S || null;
    const firstName = result.Item?.firstName?.S || '';
    const lastName = result.Item?.lastName?.S || '';
    const createdAt = result.Item?.createdAt?.S || null;

    return res.status(200).json({
      success: true,
      photoUrl,
      firstName,
      lastName,
      createdAt
    });
  } catch (err) {
    console.error('❌ Error fetching profile photo:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
