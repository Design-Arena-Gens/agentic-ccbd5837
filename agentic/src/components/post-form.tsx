'use client';

import { useMemo, useState } from "react";

type PlatformState = {
  youtube: boolean;
  instagram: boolean;
  tiktok: boolean;
};

type PostResult = {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
};

function initialPlatforms(): PlatformState {
  return {
    youtube: true,
    instagram: true,
    tiktok: true,
  };
}

export function PostForm() {
  const [platforms, setPlatforms] = useState<PlatformState>(initialPlatforms);
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">("now");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [results, setResults] = useState<PostResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(
    () => Object.values(platforms).some((value) => value),
    [platforms],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      setError("Select at least one platform");
      return;
    }

    setStatus("submitting");
    setError(null);
    setResults(null);

    const formData = new FormData(event.currentTarget);
    Object.entries(platforms).forEach(([platform, enabled]) => {
      if (enabled) {
        formData.append("platforms", platform);
      }
    });

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error ?? "Request failed");
      }

      setResults(json.results as PostResult[]);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setStatus("idle");
    }
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
            Video file
          </label>
          <input
            required
            name="video"
            type="file"
            accept="video/*"
            className="block w-full rounded-xl border border-dashed border-zinc-300 bg-zinc-50/60 px-4 py-3 text-sm text-zinc-700 file:mr-4 file:rounded-lg file:border-none file:bg-zinc-900 file:px-5 file:py-2 file:text-sm file:font-medium file:text-white hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:file:bg-zinc-200 dark:file:text-zinc-900"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
              Title
            </label>
            <input
              required
              name="title"
              type="text"
              placeholder="Launch recap teaser"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              type="text"
              placeholder="launch, demo, behind-the-scenes"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
            Description
          </label>
          <textarea
            required
            name="description"
            rows={6}
            placeholder="Tell your audience what this video is about and add any relevant links."
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Platforms
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.entries(platforms) as [keyof PlatformState, boolean][]).map(([platform, enabled]) => (
            <label
              key={platform}
              className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
                enabled
                  ? "border-zinc-900 bg-zinc-900/5 dark:border-zinc-200 dark:bg-zinc-100/10"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
                <span className="flex items-center justify-between gap-2 text-sm font-medium capitalize text-zinc-900 dark:text-zinc-100">
                  {platform}
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
                    checked={enabled}
                    onChange={(event) =>
                      setPlatforms((current) => ({
                        ...current,
                        [platform]: event.target.checked,
                      }))
                    }
                  />
                </span>
                <span className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {platform === "youtube" &&
                  "Upload to your connected YouTube channel."}
                {platform === "instagram" &&
                  "Publish to Instagram Reels via the Graph API."}
                {platform === "tiktok" &&
                  "Share with your TikTok audience automatically."}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Schedule
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-zinc-200">
            <input
              type="radio"
              name="scheduleMode"
              value="now"
              defaultChecked
              onChange={() => setScheduleMode("now")}
              className="h-4 w-4 border border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
            />
            Post immediately
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-zinc-200">
            <input
              type="radio"
              name="scheduleMode"
              value="schedule"
              onChange={() => setScheduleMode("schedule")}
              className="h-4 w-4 border border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
            />
            Schedule later
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="date"
            name="scheduleDate"
            disabled={scheduleMode === "now"}
            aria-disabled={scheduleMode === "now"}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <input
            type="time"
            name="scheduleTime"
            disabled={scheduleMode === "now"}
            aria-disabled={scheduleMode === "now"}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          {results.map((result) => (
            <div key={result.platform} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">
                  {result.platform}
                </span>
                <span>
                  {result.success ? "Success" : "Failed"}
                </span>
              </div>
              {result.success && result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 underline decoration-dotted dark:text-emerald-300"
                >
                  View published link
                </a>
              )}
              {!result.success && result.error && (
                <p className="text-xs text-red-600 dark:text-red-300">
                  {result.error}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {status === "submitting" ? "Posting..." : "Post to selected platforms"}
      </button>
    </form>
  );
}
