'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useHero, useUpdateHero } from '@/lib/api/useHero';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function AdminHomePage() {
  const { data: hero, isLoading } = useHero();
  const { mutate: updateHero, isPending } = useUpdateHero();
  const [files, setFiles] = useState<FileList | null>(null);
  const [alts, setAlts] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    setFiles(selectedFiles);
    // Initialize alt array with empty strings
    setAlts(Array.from(selectedFiles).map(() => ''));
  };

  const handleAltChange = (index: number, value: string) => {
    setAlts((prev) => {
      const newAlts = [...prev];
      newAlts[index] = value;
      return newAlts;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    if (files.length !== alts.length) {
      alert('Please provide alt text for each image.');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    formData.append('alts', JSON.stringify(alts));

    updateHero(formData);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hero Management</h1>
        <p className="text-gray-600 mt-2">
          View and update the hero section of your platform.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {/* Current Hero */}
        <Card className="rounded-xl shadow">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Current Hero Images
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-40 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Loading...
              </div>
            ) : hero?.bgImages?.length ? (
              <div className="grid grid-cols-2 gap-4">
                {hero.bgImages.map(
                  (
                    img: { src: string; alt?: string; publicId?: string },
                    idx: number
                  ) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border shadow-sm"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || 'Hero Image'}
                        width={400}
                        height={128}
                        className="w-full h-32 object-cover"
                      />
                      {img.alt && (
                        <p className="text-sm text-gray-600 text-center p-1">
                          {img.alt}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500">No images available.</p>
            )}
          </CardContent>
        </Card>

        {/* Update Form */}
        <Card className="rounded-xl shadow">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Hero Images
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />

              {/* Alt inputs for each selected file */}
              {files &&
                Array.from(files).map((file, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Alt text for ${file.name}`}
                    value={alts[idx] || ''}
                    onChange={(e) => handleAltChange(idx, e.target.value)}
                    className="block w-full text-sm border rounded p-2"
                    required
                  />
                ))}

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
