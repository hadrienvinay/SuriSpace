// app/posts/new/page.tsx
import { EditProjectForm } from '@/components/ProjectForm';
import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from "next/navigation";



export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
    });

  if (!project) {
    notFound();
  }
  

  return (
    <section className="max-w-screen-xl mx-auto p-16">
        <div className="p-8">
        <EditProjectForm
          initialData={{
            id: project.id,
            title: project.title,
            content: project.content ?? "",
            content2: project.content2 ?? "",
            resume: project.resume ?? "",
            image: project.image ?? undefined,
            image2: project.image2 ?? undefined,
            imageTitle: project.imageTitle ?? undefined,
            imageTitle2: project.image2Title ?? undefined,
            link: project.link ?? "",
          }}
        />
        </div>
    </section>
  );
}