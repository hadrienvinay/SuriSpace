// app/posts/new/page.tsx
import CreateProjectForm from '@/components/ProjectForm';

export default function CreateProjectPage() {
  return (
    <section className="max-w-screen-xl mx-auto p-16">
        <div className="p-8">
        <CreateProjectForm />
        </div>
    </section>
  );
}