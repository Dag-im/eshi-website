// src/services/blog.service.ts
import slugify from 'slugify';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { BlogModel } from '../models/blog.model';
import * as uploadService from './upload.service';

export async function getBlogs(query: {
  page?: number;
  limit?: number;
  featured?: boolean;
  category?: string;
}) {
  const { page = 1, limit = 10, featured, category } = query;
  const filter: any = {};
  if (featured !== undefined) filter.featured = featured;
  if (category) filter.category = category;
  const blogs = await BlogModel.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 });
  const total = await BlogModel.countDocuments(filter);
  return { blogs, total, page, limit };
}

export async function getBlog(slug: string) {
  const blog = await BlogModel.findOne({ slug });
  if (!blog) throw new CustomError('Blog not found.', 404);
  return blog;
}

export async function createBlog(
  data: {
    title: string;
    excerpt: string;
    category: string;
    date?: Date;
    content: string;
    featured?: boolean;
    slug?: string;
  },
  file: Express.Multer.File,
  userId: string
) {
  if (data.featured) {
    const featuredCount = await BlogModel.countDocuments({ featured: true });
    if (featuredCount >= 3) throw new CustomError('Only 3 blogs can be featured at a time.', 400);
  }
  data.slug = slugify(data.title, { lower: true });
  const upload = await uploadService.uploadImage(file);
  const blog = new BlogModel({ ...data, imageUrl: upload.url, imagePublicId: upload.publicId });
  await blog.save();
  logger.info({ action: 'blog_created', blogId: blog._id, userId });
  return blog;
}

export async function updateBlog(
  id: string,
  data: {
    title?: string;
    excerpt?: string;
    category?: string;
    date?: Date;
    content?: string;
    featured?: boolean;
    slug?: string;
  },
  userId: string,
  file?: Express.Multer.File
) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw new CustomError('Blog not found.', 404);
  if (data.title) data.slug = slugify(data.title, { lower: true });
  if (data.featured) {
    const featuredCount = await BlogModel.countDocuments({ featured: true, _id: { $ne: id } });
    if (featuredCount >= 3) throw new CustomError('Only 3 blogs can be featured at a time.', 400);
  }
  if (file) {
    if (blog.imagePublicId) await uploadService.deleteImage(blog.imagePublicId);
    const upload = await uploadService.uploadImage(file);
    blog.imageUrl = upload.url;
    blog.imagePublicId = upload.publicId;
  }
  Object.assign(blog, data);
  await blog.save();
  logger.info({ action: 'blog_updated', blogId: id, userId });
  return blog;
}

export async function deleteBlog(id: string, userId: string) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw new CustomError('Blog not found.', 404);
  if (blog.imagePublicId) await uploadService.deleteImage(blog.imagePublicId);
  await blog.deleteOne();
  logger.info({ action: 'blog_deleted', blogId: id, userId });
}

export async function toggleFeatured(id: string, featured: boolean, userId: string) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw new CustomError('Blog not found.', 404);
  if (featured) {
    const featuredCount = await BlogModel.countDocuments({ featured: true, _id: { $ne: id } });
    if (featuredCount >= 3) throw new CustomError('Only 3 blogs can be featured at a time.', 400);
  }
  blog.featured = featured;
  await blog.save();
  logger.info({ action: 'blog_feature_toggled', blogId: id, featured, userId });
  return blog;
}
