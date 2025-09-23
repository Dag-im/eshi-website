'use client';
import { create } from 'zustand';

interface BlogState {
  selectedBlogId: string | null;
  setSelectedBlog: (id: string | null) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  selectedBlogId: null,
  setSelectedBlog: (id) => set({ selectedBlogId: id }),
}));
