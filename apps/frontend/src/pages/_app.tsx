import "~/styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store, { persistor } from "~/app/store";
import { PersistGate } from "redux-persist/integration/react";

import Head from "next/head";

import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "~/app/providers";
import PostHogPageView from "~/app/PostHogPageView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PHProvider>
        <ClerkProvider>
          <Head>
            <title>CMU Courses</title>
            <meta
              name="description"
              content="CMU Courses brings together course information, schedules and FCE data to help you plan your semesters."
            />
            <meta
              name="keywords"
              content="ScottyLabs, CMU, Carnegie Mellon, Courses, Course Tool, CMU Courses, FCEs, Ratings, Schedules, Scheduling"
            />
          </Head>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PostHogPageView />
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ClerkProvider>
      </PHProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
