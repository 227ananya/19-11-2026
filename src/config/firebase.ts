
import { cert, getApps, initializeApp } from "firebase-admin/app";
import {
  getFirestore,
  FieldValue,
  Timestamp
} from "firebase-admin/firestore";

import serviceAccount from "../../twistchat-5e716-firebase-adminsdk-fbsvc-d502afea5a.json";

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key.replace(/\\n/g, "\n")
        })
      });

export const firestore = getFirestore(app);

export { FieldValue, Timestamp };
