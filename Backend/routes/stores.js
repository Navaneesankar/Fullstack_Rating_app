const express = require('express');
const { db } = require('../firebase');
const router = express.Router();

const STORES = db.collection('stores');
const RATINGS = db.collection('ratings');

// Add a store (simple)
router.post('/', async (req, res) => {
  const { name, address } = req.body;
  const ref = STORES.doc();
  await ref.set({ name, address });
  res.json({ id: ref.id, name, address });
});

// Get all stores with average rating
router.get('/', async (req, res) => {
  const snapshot = await STORES.get();
  const stores = [];
  for (const doc of snapshot.docs) {
    const store = doc.data();
    const ratingsSnap = await RATINGS.where('storeId', '==', doc.id).get();
    let avg = 0;
    if (!ratingsSnap.empty) {
      avg = ratingsSnap.docs.reduce((sum, r) => sum + r.data().rating, 0) / ratingsSnap.size;
    }
    stores.push({ id: doc.id, ...store, avgRating: avg });
  }
  res.json(stores);
});

// Submit rating
router.post('/:storeId/rate', async (req, res) => {
  const { storeId } = req.params;
  const { email, rating } = req.body; // email of user
  await RATINGS.doc(`${email}_${storeId}`).set({ email, storeId, rating });
  res.json({ msg: 'Rating saved' });
});

module.exports = router;
