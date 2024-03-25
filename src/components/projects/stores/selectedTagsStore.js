import { atom } from "nanostores";

export const selectedTags = atom([]);

export function handleTagSelection(tag) {
  // access and update tags store
  const prevTags = selectedTags.get();
  const tagIndex = prevTags.indexOf(tag);

  let updatedTags = [];

  if (tagIndex === -1) {
    updatedTags = [...prevTags, tag];
  } else {
    updatedTags = prevTags.filter((t, index) => index !== tagIndex);
  }
  selectedTags.set(updatedTags);

  // update URL search params
  if (typeof window !== "undefined") {
    const currentUrl = new URL(window.location);
    const searchParams = new URLSearchParams(currentUrl.search);

    // Remove all current 'tags' entries
    searchParams.delete("tags");

    // Add each tag as a separate 'tags' parameter
    updatedTags.forEach((tag) => searchParams.append("tags", tag));

    // Use history.pushState to update the URL without reloading the page
    window.history.pushState({}, "", `${currentUrl.pathname}?${searchParams}`);
  }
}
