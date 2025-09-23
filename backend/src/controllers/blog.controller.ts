// src/controllers/blog.controller.ts
import { Request, Response } from 'express';
import { CustomError } from '../lib/jwt';
import * as blogService from '../services/blog.service';

export async function getBlogs(req: Request, res: Response) {
  const { page, limit, featured, category } = req.query;
  const blogs = await blogService.getBlogs({
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    featured: featured ? featured === 'true' : undefined,
    category: category as string,
  });
  res.json(blogs);
}

export async function getBlog(req: Request, res: Response) {
  const { slug } = req.params;
  const blog = await blogService.getBlog(slug);
  res.json(blog);
}

export async function createBlog(req: Request, res: Response) {
  const data = req.body;
  const file = req.file;
  if (!file) throw new CustomError('Image required.', 400);
  const userId = (req as any).user.id;
  const blog = await blogService.createBlog(data, file, userId);
  res.status(201).json(blog);
}

export async function updateBlog(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;
  const userId = (req as any).user.id;
  const blog = await blogService.updateBlog(id, data, userId, file);
  res.json(blog);
}

export async function deleteBlog(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await blogService.deleteBlog(id, userId);
  res.status(204).send();
}

export async function toggleFeatured(req: Request, res: Response) {
  const { id } = req.params;
  const { featured } = req.body;
  const userId = (req as any).user.id;
  const blog = await blogService.toggleFeatured(id, featured, userId);
  res.json(blog);
}
