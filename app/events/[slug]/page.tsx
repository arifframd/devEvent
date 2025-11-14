import EventDetail from "@/components/EventDetail";
import { Suspense } from "react";

const EventDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = params.then((p) => p.slug);

  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        <EventDetail params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailPage;
