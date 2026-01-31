// app/posts/new/page.tsx
import CreatePostForm from '@/components/addPost';

export default function NewPostPage() {
  return (
    <section className="max-w-screen-xl mx-auto p-16">
        <div className="p-8">
        <CreatePostForm />
        </div>
    </section>
  );
}