import { Router } from 'express';
import * as PropertiesController from '../controllers/properties';
import { upload } from '../config/upload';

import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', PropertiesController.getAll);
router.get('/:id', PropertiesController.getById);

const uploadFields = upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'images', maxCount: 30 },
  { name: 'video', maxCount: 1 }
]);

router.post('/', authMiddleware, uploadFields, PropertiesController.create);
router.put('/:id', authMiddleware, uploadFields, PropertiesController.update);
router.patch('/:id/delete', authMiddleware, PropertiesController.softDelete);
router.patch('/:id/restore', authMiddleware, PropertiesController.restore);

export default router;
