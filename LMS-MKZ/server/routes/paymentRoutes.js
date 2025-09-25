import { Router } from "express";
import {
  uploadReceipt,
  updateTransactionStatus,
  expireSubscription,
  getAllTransactions,
} from "../controller/paymentController.js";
import { authorizedRole, isLoggedIn } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/upload", isLoggedIn, upload.single("receipt"), uploadReceipt);
router.get("/", isLoggedIn, authorizedRole("ADMIN"), getAllTransactions);
router.post(
  "/update/:transactionId",
  isLoggedIn,
  authorizedRole("ADMIN"),
  updateTransactionStatus
);
router.post(
  "/expire/:transactionId",
  isLoggedIn,
  authorizedRole("ADMIN"),
  expireSubscription
);

export default router;
