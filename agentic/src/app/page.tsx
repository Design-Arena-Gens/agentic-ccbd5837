import Link from "next/link";
import { PostForm } from "@/components/post-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 font-sans text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <div className="relative isolate px-6 py-24 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 lg:flex-row">
          <aside className="w-full max-w-xl space-y-10 lg:sticky lg:top-24 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:bg-zinc-100/5 dark:text-zinc-400">
              Social autopilot
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Ship one video, reach every audience.
              </h1>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                Upload your video once and our agent distributes it to YouTube, Instagram,
                and TikTok with consistent metadata, scheduling, and publishing feedback.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Connected APIs
                </h2>
                <p className="mt-2 text-sm leading-6">
                  Configure OAuth credentials via environment variables for each platform.
                  The agent handles uploads, status checks, and publication.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Scheduling awareness
                </h2>
                <p className="mt-2 text-sm leading-6">
                  Choose to publish instantly or provide a future timestamp. Platforms
                  that support scheduling will defer publication accordingly.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              <Link
                href="https://developers.google.com/youtube/v3/guides/uploading_a_video"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-200 px-4 py-2 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                YouTube docs
              </Link>
              <Link
                href="https://developers.facebook.com/docs/instagram-api/guides/content-publishing"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-200 px-4 py-2 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                Instagram docs
              </Link>
              <Link
                href="https://developers.tiktok.com/doc/content-posting-api-overview/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-200 px-4 py-2 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                TikTok docs
              </Link>
            </div>
          </aside>
          <main className="flex-1">
            <PostForm />
          </main>
        </div>
      </div>
    </div>
  );
}
