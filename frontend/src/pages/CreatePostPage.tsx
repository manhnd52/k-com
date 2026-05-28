import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createPost, type PostVisibility } from "@/services/PostService";
import { getCurrentUser } from "@/services/UserService";

const categories = [
  "General",
  "Career",
  "Roadmap",
  "Project",
  "Question",
];

const visibilityOptions: { label: string; value: PostVisibility }[] = [
  { label: "Public", value: "public" },
  { label: "Connections", value: "connections" },
  { label: "Private", value: "private" },
];

export default function CreatePostPage() {
  const currentUser = getCurrentUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tagsInput, setTagsInput] = useState("");
  const [visibility, setVisibility] = useState<PostVisibility>("public");
  const [status, setStatus] = useState("");

  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 5),
    [tagsInput]
  );

  const contentLength = content.trim().length;
  const canSubmit = title.trim().length >= 4 && contentLength >= 20;
  const authorName = currentUser?.username ?? "Vo danh";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus("Title needs 4+ characters and content needs 20+ characters.");
      return;
    }

    createPost({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      visibility,
      authorName,
    });

    setTitle("");
    setContent("");
    setTagsInput("");
    setCategory(categories[0]);
    setVisibility("public");
    setStatus("Post created and saved locally.");
  };

  return (
    <div className="flex w-full flex-1 bg-[#111113] text-[#f4f4f5]">
      <section className="mx-auto grid w-full max-w-screen-xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-10">
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-brand">Create Post</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Share an update
              </h1>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#3f3f46] px-3 py-2 text-sm font-medium text-[#a1a1aa] transition hover:border-brand hover:text-brand"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-[#27272a] bg-[#18181b] p-5 sm:p-6">
            {status && (
              <div className="rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
                {status}
              </div>
            )}

            <div>
              <label htmlFor="post-title" className="mb-2 block text-sm font-medium text-[#f4f4f5]">
                Title
              </label>
              <input
                id="post-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What do you want to discuss?"
                className="w-full rounded-lg border border-[#3f3f46] bg-[#111113] px-3 py-2.5 text-sm text-[#f4f4f5] outline-none transition placeholder:text-[#71717a] focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <div>
              <label htmlFor="post-content" className="mb-2 block text-sm font-medium text-[#f4f4f5]">
                Content
              </label>
              <textarea
                id="post-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write the post content..."
                rows={9}
                className="min-h-48 w-full resize-y rounded-lg border border-[#3f3f46] bg-[#111113] px-3 py-3 text-sm leading-6 text-[#f4f4f5] outline-none transition placeholder:text-[#71717a] focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
              <p className="mt-2 text-xs text-[#71717a]">{contentLength} characters</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="post-category" className="mb-2 block text-sm font-medium text-[#f4f4f5]">
                  Category
                </label>
                <select
                  id="post-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-lg border border-[#3f3f46] bg-[#111113] px-3 py-2.5 text-sm text-[#f4f4f5] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="post-tags" className="mb-2 block text-sm font-medium text-[#f4f4f5]">
                  Tags
                </label>
                <input
                  id="post-tags"
                  value={tagsInput}
                  onChange={(event) => setTagsInput(event.target.value)}
                  placeholder="React, Career, AI"
                  className="w-full rounded-lg border border-[#3f3f46] bg-[#111113] px-3 py-2.5 text-sm text-[#f4f4f5] outline-none transition placeholder:text-[#71717a] focus:border-brand focus:ring-2 focus:ring-brand/30"
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-[#f4f4f5]">Visibility</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {visibilityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      visibility === option.value
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-[#3f3f46] bg-[#111113] text-[#a1a1aa] hover:border-brand hover:text-brand"
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={visibility === option.value}
                      onChange={() => setVisibility(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#27272a] pt-5">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                  setTagsInput("");
                  setStatus("");
                }}
                className="rounded-lg border border-[#3f3f46] px-4 py-2 text-sm font-medium text-[#a1a1aa] transition hover:border-brand hover:text-brand"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                Publish
              </button>
            </div>
          </form>
        </div>

        <aside className="rounded-xl border border-[#27272a] bg-[#18181b] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">Preview</p>
            <span className="rounded-full border border-[#3f3f46] bg-[#27272a] px-2.5 py-1 text-xs text-[#a1a1aa]">
              {visibility}
            </span>
          </div>

          <article className="rounded-lg border border-[#27272a] bg-[#111113] p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{authorName}</p>
                <p className="text-xs text-[#71717a]">{category}</p>
              </div>
            </div>

            <h2 className="text-lg font-bold leading-snug text-white">
              {title.trim() || "Post title"}
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#a1a1aa]">
              {content.trim() || "Your post content will appear here while you write."}
            </p>

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#3f3f46] px-2.5 py-1 text-xs text-[#a1a1aa]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </aside>
      </section>
    </div>
  );
}
