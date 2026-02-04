// app/posts/new/page.tsx
import CreateLinkForm from '@/components/LinkForm';

export default function NewLinkPage() {
  return (
    <section className="max-w-screen-xl mx-auto p-16">
        <div className="p-8">
        <CreateLinkForm mode='create'/>
        </div>
    </section>
  );
}