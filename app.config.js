import "dotenv/config";

export default {
  expo: {
    slug: "sidestep",
    name: "sidestep",
    sdkVersion: "46.0.0",
    extra: {
      eas: {
        projectId: "67ebc0ee-0180-4a51-995c-9ad0398b8d3f",
      },
    },
    android: {
      package: "com.grendle.sidestep",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
  name: "sidestep",
};
