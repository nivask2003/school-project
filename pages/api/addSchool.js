import multer from 'multer';
import nextConnect from 'next-connect';
import { connectDB } from '../../lib/db';

const upload = multer({ dest: 'public/schoolImages/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  const db = await connectDB();
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file.filename;

  await db.execute(
    'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, address, city, state, contact, image, email_id]
  );

  res.status(200).json({ message: 'School added successfully' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
