import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyALLm5_xhg6mXldbQtnJud2bnLM7ARCdpM',
  authDomain: "my-project-pb-challenge.firebaseapp.com",
  projectId: "my-project-pb-challenge",
  storageBucket: "my-project-pb-challenge.appspot.com",
  messagingSenderId: "664149289287",
  appId: "1:664149289287:web:6c6e2b564a153595a84462"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app